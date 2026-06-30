/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : lib/auth.ts
 * Purpose : Configures NextAuth credentials login and JWT sessions.
 *
 * This file authenticates users against Prisma, stores user id
 * and role in the JWT, and exposes them on the session object.
 * ============================================================
 */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import { db } from "@/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      email?: string | null;
      name?: string | null;
    };
  }

  interface User {
    role: UserRole;
  }
}

type AuthTokenFields = {
  id?: string;
  role?: UserRole;
  lastActive?: number;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const email = String(credentials?.email ?? "").toLowerCase().trim();
        const password = String(credentials?.password ?? "");

        if (!email || !password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        if (!user.emailVerified) {
          throw new Error("EmailNotVerified");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      const authToken = token as typeof token & AuthTokenFields;

      if (user) {
        authToken.id = user.id;
        authToken.role = user.role;
        authToken.lastActive = Date.now();
      }

      if (authToken.role === UserRole.ADMIN) {
        const now = Date.now();
        const lastActive = authToken.lastActive ?? now;
        const thirtyMinutes = 30 * 60 * 1000;

        if (now - lastActive > thirtyMinutes) {
          authToken.id = undefined;
          authToken.role = undefined;
          authToken.lastActive = undefined;
          return authToken;
        }

        authToken.lastActive = now;
      }

      return authToken;
    },

    async session({ session, token }) {
      const authToken = token as typeof token & AuthTokenFields;

      if (authToken.id && authToken.role) {
        session.user.id = authToken.id;
        session.user.role = authToken.role;
      }

      return session;
    },
  },
});