import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const body = await req.json();
        console.log(body);
        const {sender, receiver, message, subject} = body.messageData;
        const senderExists = await db.user.findUnique({where: {username: sender}});
        const receiverExists = await db.user.findUnique({where: {username: receiver}});
        //although the following case cannot take place
        if(!senderExists){
            return NextResponse.json({message: "Sender username doesn't exists"}, {status: 406})
        }
        // if(!receiverExists){
        //     return NextResponse.json({message: "Receiver username doesn't exists"}, {status: 408})
        // }
        const data = await db.message.create({data:{message, subject, receiver ,sender}})
    } catch (error){
        console.error("Error in saving the message: ", error);
    }
}