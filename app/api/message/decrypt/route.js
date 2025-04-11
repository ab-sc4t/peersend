import { db } from "@/lib/db";
import crypto from "crypto";
import { NextResponse } from "next/server";

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

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Mail doesn't exists" }, { status: 400 });
        }

        const messages = await db.message.findMany({
            where: { id: id }
        });

        const decryptedMessage = messages.map(msg => ({
            id: msg.id,
            message: decryptMessage(msg.message, msg.aeskey),
        }));
        console.log("running");
        console.log(decryptedMessage);
        
        return NextResponse.json({ decryptedMessage: decryptedMessage }, { status: 200 });

    } catch (error) {
        console.error("Error while decrypting messages: ", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}