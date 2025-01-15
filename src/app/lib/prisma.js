import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.MODE === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ['query', 'info', 'warn', 'error'],
        });
    }
    prisma = global.prisma;
}

export default prisma;