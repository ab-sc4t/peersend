import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import * as ed from "@noble/ed25519";

export async function POST(req){
    try{
        const body = await req.json();
        console.log(body);
        
        const { email, password, firstname, lastname, username } = body.formData;
        console.log(email);
        console.log(password);
        console.log(firstname);
        console.log(lastname);
        console.log(username);
        

        if (!email || !firstname || !lastname || !username) {
            return NextResponse.json({ message: "All fields are required" }, { status: 455 });
        }

        if (!password) {
            return NextResponse.json({ message: "Password is required for signup" }, { status: 400 });
        }

        const existingUser = await db.user.findUnique({where: {username}});
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const privKey = ed.utils.randomPrivateKey();
        const pubKey = await ed.getPublicKeyAsync(privKey);
        const privKeyBase64 = Buffer.from(privKey).toString("base64");
        const pubKeyBase64 = Buffer.from(pubKey).toString("base64");
        console.log("Public Key: ", pubKeyBase64);
        console.log("Private Key: ", privKeyBase64);

        const newUser = await db.user.create({data:{email, firstname, lastname, username, publicKey: pubKeyBase64, password: hashedPassword}});
        const { password: _, ...safeUserData } = newUser;
        return NextResponse.json({ ...safeUserData, privateKey: privKeyBase64 }, { status: 201 }); 
        
    } catch(error){
        console.error("Signup error:", error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}
