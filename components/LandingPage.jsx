"use client"

import { useState } from 'react';
import { Lock, Shield, Key, Users, CheckCircle, ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Button from '@/ui/Button';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-gray-100"
      style={{ backgroundImage: "url('/HomePageWallPaper.png')" }}
    >

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-12 md:py-24 px-6 md:px-16 lg:px-24">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Privacy-First <span className="text-green-400">P2P Messaging</span> Platform
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl">
            Communication without compromise. End-to-end encryption, signature verification, and zero trust by default.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Button
              text="Get Started"
              href="/signup"
            />
          </div>
        </div>
        
        {/* Hero Image/Encryption Flow Diagram */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <div className="bg-gray-800/70 backdrop-blur-md p-6 border border-white/10 max-w-md">
            <div className="flex flex-col">
              {[
                {
                  icon: <Key size={24} className="text-green-400" />,
                  title: "Key Generation",
                  desc: "Public-private key pair + recovery mnemonic"
                },
                {
                  icon: <Lock size={24} className="text-green-400" />,
                  title: "Message Encryption",
                  desc: "AES encryption + per-recipient key encryption"
                },
                {
                  icon: <Shield size={24} className="text-green-400" />,
                  title: "Signature Verification",
                  desc: "Digital signature ensures sender authenticity"
                }
              ].map(({icon, title, desc}, i) => (
                <div key={i} className="flex items-center mb-6">
                  <div className="bg-green-900/60 p-3 rounded-lg min-w-[48px] flex justify-center items-center mr-4">
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{title}</h4>
                    <p className="text-sm text-gray-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-900/20 px-6 md:px-16 lg:px-24">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-lg border border-white/10 hover:border-blue-500/40 transition-colors">
            <div className="bg-green-900/60 p-3 rounded-lg inline-block mb-4">
              <Lock size={24} className="text-green-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">End-to-End Encryption</h3>
            <p className="text-gray-400">Messages are encrypted from sender to recipient, unreadable to anyone else.</p>
          </div>
          
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-lg border border-white/10 hover:border-blue-500/40 transition-colors">
            <div className="bg-green-900/60 p-3 rounded-lg inline-block mb-4">
              <CheckCircle size={24} className="text-green-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Signature Verification</h3>
            <p className="text-gray-400">Every message is digitally signed to guarantee sender authenticity.</p>
          </div>
          
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-lg border border-white/10 hover:border-blue-500/40 transition-colors">
            <div className="bg-green-900/60 p-3 rounded-lg inline-block mb-4">
              <Shield size={24} className="text-green-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Zero Trust by Default</h3>
            <p className="text-gray-400">Unverified messages are hidden or marked suspicious automatically.</p>
          </div>
          
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-lg border border-white/10 hover:border-blue-500/40 transition-colors">
            <div className="bg-green-900/60 p-3 rounded-lg inline-block mb-4">
              <Key size={24} className="text-green-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Mnemonic Recovery</h3>
            <p className="text-gray-400">12-word phrase for secure account recovery and key restoration.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-6 md:px-16 lg:px-24">
        <h2 className="text-3xl font-bold text-center mb-12">How PeerSend Works</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-lg border border-white/10">
            <div className="flex items-center mb-4">
              <div className="bg-green-900/60 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <span className="font-semibold">1</span>
              </div>
              <h3 className="text-xl font-medium">User Identity</h3>
            </div>
            <p className="text-gray-300 mb-4">Each user is assigned a public-private key pair during registration. A secure 12-word mnemonic phrase is generated for recovery.</p>
            <div className="bg-green-900/50 p-4 rounded-md border border-green-900/20">
              <code className="text-sm text-green-300">
                // User key generation<br />
                const keyPair = await crypto.generateKeyPair();<br />
                const mnemonic = generateMnemonic(keyPair);
              </code>
            </div>
          </div>
          
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-lg border border-white/10">
            <div className="flex items-center mb-4">
              <div className="bg-green-900/60 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <span className="font-semibold">2</span>
              </div>
              <h3 className="text-xl font-medium">Sending Messages</h3>
            </div>
            <p className="text-gray-300 mb-4">Messages are encrypted with a new AES key, which is then encrypted for each recipient using their public key. The message is digitally signed with the sender's private key.</p>
            <div className="bg-green-900/50 p-4 rounded-md border border-green-900/20">
              <code className="text-sm text-green-300">
                // Message encryption<br />
                const aesKey = crypto.randomBytes(32);<br />
                const encrypted = encrypt(message, aesKey);<br />
                const signature = sign(encrypted, privateKey);
              </code>
            </div>
          </div>
          
          <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-lg border border-white/10">
            <div className="flex items-center mb-4">
              <div className="bg-green-900/60 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <span className="font-semibold">3</span>
              </div>
              <h3 className="text-xl font-medium">Receiving Messages</h3>
            </div>
            <p className="text-gray-300 mb-4">Recipients decrypt the AES key with their private key, decrypt the message, and verify the signature using the sender's public key.</p>
            <div className="bg-green-900/50 p-4 rounded-md border border-green-900/20">
              <code className="text-sm text-green-300">
                // Message verification<br />
                const verified = verify(encrypted, signature, senderPublicKey);<br />
                if (!verified) return markAsSuspicious(message);
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-16 lg:px-24 bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Secure Communication?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers and security-conscious users who trust PeerSend for their private communications.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              text="Create Account"
              href="/signup"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 py-8 px-4 md:px-12 lg:px-24 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Lock className="text-green-400" size={20} />
            <span className="font-bold text-lg">PeerSend</span>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-green-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-green-300 transition-colors">Documentation</a>
            <a href="#" className="hover:text-green-300 transition-colors">GitHub</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PeerSend. All rights reserved.
        </div>
        <div className="max-w-7xl mx-auto mt-2 text-center text-sm text-gray-400">
          Developed by: Ayush Bansal, Suvinay Bhat and Yatharth Kapoor
        </div>
      </footer>
    </div>
  );
}