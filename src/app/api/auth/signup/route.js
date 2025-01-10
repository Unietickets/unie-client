import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prismaOptions = process.env.MODE === 'development' ? {
    log: ['query', 'info', 'warn', 'error'],
} : null;

const prisma = new PrismaClient(prismaOptions);

export async function POST(req) {
    const body = await req.json()

    const { email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        });

        const { password, ...userWithoutPassword } = user;

      return new Response(JSON.stringify({ user: userWithoutPassword }), {
        headers: { 
            'Content-Type': 'application/json',
            status: 201 
        }
    });
    } catch (error) {
      return new Response('User  already exists', {
        headers: { status: 500 }
    });
    }
}