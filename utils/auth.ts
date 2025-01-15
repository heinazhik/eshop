import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      accessToken: string;
    } & DefaultSession["user"];
  }
  
  interface User {
    accessToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your authentication logic here
        const user = await db.user.findUnique({
          where: { email: credentials?.email }
        });
        
        if (user && credentials?.password === user.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            accessToken: "your-access-token" // Replace with actual token generation
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || '';
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);

export const isAuthenticated = async () => {
  const session = await getSession();
  return !!session?.user;
};

export const getToken = async () => {
  const session = await getSession();
  return session?.user?.accessToken || null;
};

export const getSession = async () => {
  return await NextAuth(authOptions).getSession();
};
