import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "./db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    console.error("❌ Missing username or password");
                    throw new Error("Missing username or password");
                }

                const user = await db.user.findUnique({
                    where: { username: credentials.username },
                });

                if (!user) {
                    console.error("❌ User not found:", credentials.username);
                    throw new Error("User not found");
                }

                if (!user.password) {
                    console.error("❌ User account is missing a password");
                    throw new Error("User account is missing a password");
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);
                if (!passwordMatch) {
                    console.error("❌ Invalid password for:", credentials.username);
                    throw new Error("Invalid password");
                }

                console.log("✅ User login successful:", user.username);
                return { 
                    id: user.id, 
                    email: user.email, 
                    firstname: user.firstname, 
                    lastname: user.lastname, 
                    username: user.username 
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.firstname = user.firstname;
                token.lastname = user.lastname;
                token.username = user.username;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                id: token.id,
                email: token.email,
                firstname: token.firstname,
                lastname: token.lastname,
                username: token.username,
            };
            return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
    },
};