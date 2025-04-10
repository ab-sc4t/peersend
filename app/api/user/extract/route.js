import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";

export async function POST(req){
    try{
        const body = await req.json();
        console.log(body);
        const {username, mnemonic, password} = body;
        const user = await db.user.findUnique({where: {username}})
        if (!user){
            return NextResponse.json({message:"User does't exists"},{status: 515});
        }
        const path = `m/44'/501'/0'/0'`;
        const seed = mnemonicToSeedSync(mnemonic);
        ed.etc.sha512Sync = sha512;
        const { key: privateKey } = derivePath(path, seed.toString("hex"));
        const publicKey = await ed.getPublicKey(privateKey);
        const privateKeyBaseHex = Buffer.from(privateKey).toString("hex")
        const publicKeyBaseHex = Buffer.from(publicKey).toString("hex")
        console.log("Mnemonic:", mnemonic);
        console.log("Private Key (hex):", privateKeyBaseHex);
        console.log("Public Key  (hex):", publicKeyBaseHex);
        return NextResponse.json({publicKey: publicKeyBaseHex, privateKey: privateKeyBaseHex, username: username}, {status: 200})
    } catch(error){
        console.error("Error extracting private key using mnemonic: ", error);
        return NextResponse.json({message: "Error extracting private key using mnemonic."}, {status: 510});
    }
}