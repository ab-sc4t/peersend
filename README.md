# 🛡️ PeerSend

**PeerSend** is a full-stack encrypted messaging platform built entirely with **Next.js** — combining frontend and backend in one unified app. It ensures end-to-end privacy, cryptographic authenticity, and per-user decryption security.

> 🔐 Every message is encrypted.  
> ✍️ Every message is signed and verified.  
> 🧠 Every user has a mnemonic-based key recovery system.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js
- **Encryption**: RSA (asymmetric), AES (symmetric), Digital Signatures (Node.js `crypto` module)

---

## Key Features

- **End-to-End Encrypted Messaging**  
  Messages are encrypted using a fresh AES key for every send.

- **Per-Recipient AES Key Encryption**  
  Each recipient gets their own encrypted copy of the AES key (via their public RSA key).

- **Digital Signature Verification**  
  Only messages verified by the sender’s signature are displayed.

- **Zero Trust Rendering**  
  Unverified messages are hidden until successfully validated.

- **Mnemonic-Based Key Recovery**  
  Each user gets a 12-word recovery phrase to regenerate their RSA key pair.

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/peersend.git
cd peersend
```

## .env file
```
DATABASE_URL=your_postgresql_database_url
NEXTAUTH_SECRET=your_next_auth_secret
```

## Run the development server 
```
npm run dev
```
