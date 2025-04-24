import { db } from "@/lib/db";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { randomBytes, createCipheriv, createHash } from 'crypto';
import { ed25519, x25519 } from '@noble/curves/ed25519';
import * as ed from '@noble/ed25519';
import { edwardsToMontgomeryPub, edwardsToMontgomeryPriv } from '@noble/curves/ed25519';

function encryptMessage(message) {
    const key = crypto.randomBytes(32); 
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(message, "utf8", "base64");
    encrypted += cipher.final("base64");

    const base64Key = key.toString("base64");
    const base64IV = iv.toString("base64");
    const combinedKeyAndIV = `${base64Key}:${base64IV}`;

    console.log("base64Key: ", base64Key);
    console.log("base64IV: ", base64IV);
    console.log("combined: " , combinedKeyAndIV);
    
    return {
        encryptedMessage: encrypted,
        combinedKeyAndIV
    };
}

export async function POST(req){
    try{
        const body = await req.json();
        console.log(body);
        const {sender, receiver, message, subject, senPrivKey, recPubKey} = body.messageData;
        console.log("Sender Private Key: ", senPrivKey);
        console.log("Recipient Public Key: ", recPubKey);

        //yahan pr humne senPrivKey and recPubKey (ed25519) ko x25519 mai convert krdiya
        const senderXPriv = edwardsToMontgomeryPriv(Buffer.from(senPrivKey, 'hex'));
        const senderOrgPriv = Buffer.from(senPrivKey, "hex");
        const recipientXPub = edwardsToMontgomeryPub(Buffer.from(recPubKey, 'hex'));        
        console.log(senderXPriv);
        console.log(recipientXPub);


        //TESTING
        const sharedSecret = x25519.getSharedSecret(senderXPriv, recipientXPub);
        const key = createHash('sha256').update(sharedSecret).digest();
        console.log(key);
        
        
        const senderExists = await db.user.findUnique({where: {username: sender}});
        const receiverExists = await db.user.findUnique({where: {username: receiver}});
        if(!senderExists){
            return NextResponse.json({message: "Sender username doesn't exists"}, {status: 406})
        }

        const {encryptedMessage, combinedKeyAndIV} = encryptMessage(message);

        console.log("combined 2 :", combinedKeyAndIV);

        // Encrypt CombinedKey
        const nonce = randomBytes(16);
        const cipher = createCipheriv('aes-256-gcm', key, nonce);
        const encrypted = Buffer.concat([cipher.update(combinedKeyAndIV, 'utf8'), cipher.final()]);
        const authTag = cipher.getAuthTag();
        console.log("nonce: ", nonce);
        console.log("cipher: ", cipher);
        console.log("encrypted: ", encrypted);
        console.log("authTag", authTag);
        
        const encryptedAesKey = encrypted.toString('base64');
        const nonceBase64 = nonce.toString('base64');  
        const authTagBase64 = authTag.toString('base64');

        const signedMessage = `${encryptedMessage}::${encryptedAesKey}`;
        const encoder = new TextEncoder();
        const signedMessageUint8Array = encoder.encode(signedMessage);
        console.log("signedMessageUint8Array: ", signedMessageUint8Array);
        

        const signature = await ed.signAsync(signedMessageUint8Array, senderOrgPriv);
        console.log("signature: ", signature);

        const signatureBase64 = Buffer.from(signature).toString('base64');
        console.log("signatureBase64: ", signatureBase64);
        const signatureUint8Array = new Uint8Array(Buffer.from(signatureBase64, 'base64'));
        console.log("signatureUint8Array: ", signatureUint8Array);
        

        const data = await db.message.create({data:{message: encryptedMessage, encryptedAesKey, subject, receiver ,sender, nonce: nonceBase64, authTag: authTagBase64, signature: signatureBase64}})
        return NextResponse.json({message: "Mail sent"}, {status: 201})
    } catch (error){
        console.error("Error in saving the message: ", error);
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("user");

        if (!username) {
            return NextResponse.json({ message: "Username is required" }, { status: 400 });
        }

        const messages = await db.message.findMany({
            where: { receiver: username }
        });

        const Messages = messages.map(msg => ({
            id: msg.id,
            subject: msg.subject,
            sender: msg.sender,
            receiver: msg.receiver,
            encryptedMessage: msg.message,
            encryptedAesKey: msg.encryptedAesKey,
            nonceBase64: msg.nonce,
            authTagBase64: msg.authTag
        }));
        console.log("running");
        console.log(Messages);
        
        return NextResponse.json({ messages: Messages }, { status: 200 });

    } catch (error) {
        console.error("Error while fetching/decrypting messages: ", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}