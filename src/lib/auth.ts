/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token-website", // 🔹 unique cookie name
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const response = await res.json();
          if (!res.ok || !response?.success) {
            throw new Error(response?.message || "Login failed");
          }

          const user = response.data.user;
          const accessToken = response.data.accessToken;

          return {
            id: user._id,
            name: user.firstName,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            location: user.location,
            verified: user.verified,
            accessToken,
          };
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Authentication failed. Please try again.";
          throw new Error(errorMessage);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.profileImage = user.profileImage;
        token.location = user.location;
        token.verified = user.verified;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id as string,
        name: token.name as string | null,
        email: token.email as string | null,
        role: token.role as string,
        accessToken: token.accessToken as string,
        profileImage: (token.profileImage as string) || null,
        location: (token.location as string) || null,
        verified: token.verified as boolean | undefined,
      };
      return session;
    },
  },
};
