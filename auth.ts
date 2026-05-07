import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { z } from "zod";
import type { Role } from "@/lib/content";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "missing",
      clientSecret: process.env.GITHUB_SECRET ?? "missing",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "missing",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "missing",
    }),
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !adminHash || parsed.data.email !== adminEmail) return null;
        const valid = await compare(parsed.data.password, adminHash);
        if (!valid) return null;
        return {
          id: "admin",
          email: adminEmail,
          name: "clarift Admin",
          role: "Admin" satisfies Role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "Reader";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.role = token.role ?? "Reader";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
