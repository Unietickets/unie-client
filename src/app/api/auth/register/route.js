import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
const JWT_SECRET = process.env.JWT_SECRET;

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

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
        });

      return new Response(JSON.stringify({ token }), {
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