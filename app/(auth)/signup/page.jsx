"use client"
import MnemonicModal from "@/components/MnemonicModal";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Signup() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [publicKey, setPublicKey] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = {
            username: e.target.username.value,
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }
    
        // Password validation
        const password = formData.password;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
        if (!passwordPattern.test(password)) {
            setError("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one digit.");
            return; // Don't proceed if password is invalid
        }
    
        try {
            const res = await axios.post("/api/user",
                { formData },
                { headers: { "Content-Type": "application/json" } }
            );
            const data = await res.data;
            if (res.status === 201) {
                localStorage.setItem(`privKey-${data.username}`, data.privateKey);
                setMnemonic(data.mnemonic); // show mnemonic
                setPublicKey(data.publicKey);
                setShowModal(true);
                router.push('/signin');
            } else {
                throw new Error("Signup failed");
            }
        } catch (error) {
            console.error("Error during signup: ", error);
            setError("Signup failed. Please check your details and try again.");
        }
    }
    

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gray-100 h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/HomePageWallPaper.png')" }}
        >
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-2 text-black">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                            User Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            placeholder="abayush"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            required
                            placeholder="Ayush"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            required
                            placeholder="Bansal"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="admin@example.com"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="Enter a strong password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already a registered user?{" "}
                    <a
                        href="/signin"
                        className="text-blue-500 hover:underline focus:ring focus:ring-blue-500"
                    >
                        Sign in
                    </a>
                </p>
            </div>
            <MnemonicModal
                mnemonic={mnemonic}
                publicKey={publicKey}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}
