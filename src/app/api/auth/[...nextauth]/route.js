import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@shared/lib/db";

export const authOptions = {
  callbacks: {
    async session({ session, user }) {
      // console.log(s)
      // session.accessToken = token.accessToken
    //   session.user.id = user.id;
    // console.log(session)
    // console.log(user)

      return session;
    },
  },
  // ломает приложение
  // pages: {
  //   signIn: '/auth/sign-in',
  //   error: '/auth/error',
  //   signUp: '/auth/sign-up'
  // },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "email",
          type: "email",
          required: true,
        },
        password: {
          label: "password",
          type: "password",
          required: true,
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          if (!email || !password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...userWithoutPass } = user;

            return userWithoutPass;
          }

          return null;
        } catch (e) {
          return e;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
