import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
    const body = await req.json()

    const { email, password } = body;
    
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: '1h',
        });
        return new Response(JSON.stringify({ token }), {
            headers: { 
                'Content-Type': 'application/json',
                status: 200 
            }
        });
    } else {
        return new Response('Invalid credentials', {
            headers: { status: 401 }
        });
    }
}