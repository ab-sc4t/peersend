import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] overflow-hidden">

      <main className="max-w-7xl mx-auto px-4 py-16 my-48 ">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Secure Peer-to-Peer File Sharing
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Share files directly with your peers. Fast, secure, and decentralized.
          </p>
          
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Security', 'Speed', 'Privacy'].map((feature) => (
            <div key={feature} className="bg-[#1e1e1e] p-6 rounded-lg border border-[#2d2d2d]">
              <h3 className="text-white text-xl font-semibold mb-3">{feature}</h3>
              <p className="text-gray-400">
                Experience top-tier {feature.toLowerCase()} with our peer-to-peer technology.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
