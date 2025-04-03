import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("user");
        console.log("USER: ", username);
        const messages = await db.message.findMany({where:{sender: username}});
        console.log("messages: ", messages);
        return NextResponse.json({messages}, {status: 201});
    } catch(error){
        console.error("Error while fetching the messages of a user: ", error);
    }
}