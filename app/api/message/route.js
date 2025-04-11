import { db } from "@/lib/db";
import crypto from "crypto";
import { NextResponse } from "next/server";

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

function decryptMessage(encryptedMessage, combinedKeyAndIV) {
    const [base64Key, base64IV] = combinedKeyAndIV.split(":");

    const key = Buffer.from(base64Key, "base64");
    const iv = Buffer.from(base64IV, "base64");
    const encryptedBuffer = Buffer.from(encryptedMessage, "base64");

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedBuffer, undefined, "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

export async function POST(req){
    try{
        const body = await req.json();
        console.log(body);
        const {sender, receiver, message, subject} = body.messageData;
        const senderExists = await db.user.findUnique({where: {username: sender}});
        const receiverExists = await db.user.findUnique({where: {username: receiver}});
        if(!senderExists){
            return NextResponse.json({message: "Sender username doesn't exists"}, {status: 406})
        }

        const {encryptedMessage, combinedKeyAndIV} = encryptMessage(message);

        console.log("combined 2 :", combinedKeyAndIV);
        

        const data = await db.message.create({data:{message: encryptedMessage, aeskey: combinedKeyAndIV, subject, receiver ,sender}})
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

        const decryptedMessages = messages.map(msg => ({
            id: msg.id,
            subject: msg.subject,
            sender: msg.sender,
            receiver: msg.receiver,
            message: decryptMessage(msg.message, msg.aeskey),
            encryptedMessage: msg.message
        }));
        console.log("running");
        console.log(decryptedMessages);
        
        return NextResponse.json({ messages: decryptedMessages }, { status: 200 });

    } catch (error) {
        console.error("Error while fetching/decrypting messages: ", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}