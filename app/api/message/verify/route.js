import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as ed from '@noble/ed25519';
import { edwardsToMontgomeryPub } from '@noble/curves/ed25519';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body);
        
        const { id: rawId, senPubKey } = body.data;
        const id = rawId ? Number(rawId) : null;

        console.log("id: ", id);
        console.log("senPubKey: ", senPubKey);
        
        const senderXPub = edwardsToMontgomeryPub(Buffer.from(senPubKey, 'hex'));
        const senderOrgPub = Buffer.from(senPubKey, "hex");

        if (!id) {
            return NextResponse.json({ message: "Mail doesn't exists" }, { status: 400 });
        }

        const message = await db.message.findUnique({
            where: { id: id }
        });

        //message for sign verification
        const signedMessage = `${message.message}::${message.encryptedAesKey}`;
        const encoder = new TextEncoder();
        const signedMessageUint8Array = encoder.encode(signedMessage);
        console.log("signedMessageUint8Array: ", signedMessageUint8Array);

        const signatureUint8Array = new Uint8Array(Buffer.from(message.signature, 'base64'));
        console.log("signatureUint8Array: ", signatureUint8Array);

        const isValid = await ed.verifyAsync(signatureUint8Array, signedMessageUint8Array, senderOrgPub);
        console.log("isValid: ", isValid);
        
        if(!isValid){
            return NextResponse.json({message: "Not verified, tampered"},{status : 202})
        }
        return NextResponse.json({ message: "Verified, not tampered" }, { status: 200 });

    } catch (error) {
        console.error("Error while decrypting messages: ", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}