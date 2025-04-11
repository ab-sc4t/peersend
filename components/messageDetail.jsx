export default function MessageDetail({ message, onClose }) {

    let decrypted = "";

    const handleDecrypt = async () =>{
        try{
            const res = await axios.get(`/api/message/encrypt?id=${id}`);
            if (res.status == 200){
                decrypted = res.data.decryptedMessage;
            }
        } catch(error){
            console.error("Error decryption the message: ", error);
        }
    }

    return (
        <div className="mt-2 p-4 bg-gray-800 text-white rounded shadow border border-white/10 relative">
            <button
                onClick={(e) => {
                    e.stopPropagation(); 
                    onClose();
                }}
                className="absolute top-2 right-2 text-sm bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
            >
                Close
            </button>

            <div><strong>From:</strong> {message.sender}</div>
            <div><strong>Subject:</strong> {message.subject}</div>
            <div className="mt-2">
                <strong>Encrypted:</strong>
                <pre className="text-pink-400 text-xs break-words">{message.encryptedMessage}</pre>
            </div>
            <div className="mt-2">
                <strong>Decrypted:</strong>
                <pre className="text-green-400 text-sm break-words">{decrypted == "" ? "Click on the Decrypt message." : decrypted}</pre>
            </div>
            <div className="flex justify-end gap-4 mt-4">
                <button className="block rounded-3xl bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-10 flex items-center justify-center">
                    Verify
                </button>
                <button className="block rounded-3xl bg-green-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-10 flex items-center justify-center" onClick={()=>{handleDecrypt(message.id)}}>
                    Decrypt
                </button>
            </div>
        </div>
    );
}
