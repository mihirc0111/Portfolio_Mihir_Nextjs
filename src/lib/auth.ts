import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

type UserRole = "admin" | "guest";
type DbUser = { id: string; email: string; name?: string; password_hash: string; role: UserRole; company?: string };
type AppUser = { id: string; email: string; name?: string; role: UserRole; company?: string };

declare module "next-auth" {
  interface User {
    role: UserRole;
    company?: string;
  }
  interface Session {
    user: User;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email;
        const password = String(credentials.password);

        const { data: users, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .limit(1);

        if (error || !users || users.length === 0) {
          return null;
        }

        const dbUser = users[0] as DbUser;

        // Verify password hash with bcrypt
        const passwordHash = dbUser.password_hash ? String(dbUser.password_hash) : "";
        const isPasswordValid = await bcrypt.compare(password, passwordHash);
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role,
          company: dbUser.company,
        } as AppUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as AppUser).role;
        token.company = (user as AppUser).company;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as UserRole;
        session.user.company = token.company as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});