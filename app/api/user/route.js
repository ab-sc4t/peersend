import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";


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
        
        const mnemonic = generateMnemonic();
        const seed = mnemonicToSeedSync(mnemonic);
        console.log("Mnemonic: ", mnemonic);
        const path = `m/44'/501'/0'/0'`;
        
        ed.etc.sha512Sync = sha512;

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

        const { key: privateKey } = derivePath(path, seed.toString("hex"));
        const publicKey = await ed.getPublicKey(privateKey);
        const privateKeyBaseHex = Buffer.from(privateKey).toString("hex")
        const publicKeyBaseHex = Buffer.from(publicKey).toString("hex")
        console.log("Private Key (hex):", Buffer.from(privateKey).toString("hex"));
        console.log("Public Key  (hex):", Buffer.from(publicKey).toString("hex"));
        const newUser = await db.user.create({data:{email, firstname, lastname, username, publicKey: publicKeyBaseHex, password: hashedPassword}});
        const { password: _, ...safeUserData } = newUser;
        return NextResponse.json({ ...safeUserData, privateKey: privateKeyBaseHex, mnemonic: mnemonic }, { status: 201 }); 
        
    } catch(error){
        console.error("Signup error:", error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}
