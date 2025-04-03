"use client"

import { useState } from "react";

export default function Sent(){
    const [receiver, setReceiver] = useState("");
    
    const handleChangeReceiver = (e) => {
        setReceiver(e.target.value);
        console.log(receiver);
    }

    return(
        <div className="flex p-20 h-screen bg-center bg-cover"
            style={{ backgroundImage: "url('/HomePageWallPaper.png')" }}
        >
            <div className="flex text-2xl">
                <div>To: </div>
                <div className="m-8">
                    <input
                        type="receiver"
                        id="receiver"
                        name="receiver"
                        required
                        placeholder="abayush"
                        className="bg-white/10 rounded-xl ronuded-br-xl w-36"
                        onChange = {handleChangeReceiver}
                    />
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}