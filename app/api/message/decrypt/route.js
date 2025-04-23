import { db } from "@/lib/db";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { createDecipheriv, createHash } from 'crypto';
import { ed25519, x25519 } from '@noble/curves/ed25519';
import { edwardsToMontgomeryPub, edwardsToMontgomeryPriv } from '@noble/curves/ed25519';

function decryptMessage(encryptedMessage, combinedKeyAndIV) {
    console.log("Heavy TESTING: ", combinedKeyAndIV);
    
    const [base64Key, base64IV] = combinedKeyAndIV.split(":");

    const key = Buffer.from(base64Key, "base64");
    const iv = Buffer.from(base64IV, "base64");
    const encryptedBuffer = Buffer.from(encryptedMessage, "base64");

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedBuffer, undefined, "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body);
        
        const { id: rawId, senPubKey, recPrivKey } = body.data;
        const id = rawId ? Number(rawId) : null;

        console.log("id: ", id);
        console.log("senPubKey: ", senPubKey);
        console.log("recPrivKey: ", recPrivKey);
        
        if (!id) {
            return NextResponse.json({ message: "Mail doesn't exists" }, { status: 400 });
        }

        const message = await db.message.findUnique({
            where: { id: id }
        });


        const recipientXPriv = edwardsToMontgomeryPriv(Buffer.from(recPrivKey, 'hex'));
        const senderXPub = edwardsToMontgomeryPub(Buffer.from(senPubKey, 'hex'));

        const sharedSecret2 = x25519.getSharedSecret(recipientXPriv, senderXPub);
        const key2 = createHash('sha256').update(sharedSecret2).digest();

        const encrypted = Buffer.from(message.encryptedAesKey, 'base64');
        const nonce = Buffer.from(message.nonce, 'base64');
        const authTag = Buffer.from(message.authTag, 'base64');

        console.log("encrypted: ", encrypted);
        


        const decipher = createDecipheriv('aes-256-gcm', key2, nonce);
        decipher.setAuthTag(authTag);
        const decrypted = Buffer.concat([
            decipher.update(encrypted),
            decipher.final()
        ]).toString('utf-8');
        console.log("decrypted: ", decrypted);
        

        const decryptedMessage = {
            id: message.id,
            message: decryptMessage(message.message, decrypted)
        }
        console.log("running2");
        console.log(decryptedMessage);
        
        return NextResponse.json({ decryptedMessage: decryptedMessage }, { status: 200 });

    } catch (error) {
        console.error("Error while decrypting messages: ", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}