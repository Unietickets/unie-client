import bcrypt from 'bcryptjs';

import prisma from '@/app/lib/prisma';

export async function POST(req) {
    const body = await req.json()

    const { email, password, name } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            }
        });

        const { password, ...userWithoutPassword } = user;

      return new Response(JSON.stringify({ user: userWithoutPassword }), {
        status: 201, 
        headers: { 
            'Content-Type': 'application/json',
        }
    });
    } catch (error) {
      return new Response(JSON.stringify('User already exists'), {
        status: 500
    });
    }
}