import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

import prisma from "@/app/lib/prisma";

export const authOptions = {
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                    required: true,
                },
                password: {
                    label: 'password',
                    type: 'password',
                    required: true,
                }
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                if (!email || !password) {
                    console.log('1')
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                console.log(user)
                
                if (user && (await bcrypt.compare(password, user.password))) {
                    const { password, ...userWithoutPass } = user;

                    return userWithoutPass;
                } 
                
                return null;
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST } 