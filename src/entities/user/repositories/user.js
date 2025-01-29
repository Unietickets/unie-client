import { prisma } from "@/shared/lib/db";

async function getUser({ id }) {
    return await prisma.user.findUnique({
        where: {
            id,
        }
    }); 
}

async function createUser({ email, hashedPassword, name }) {
    return await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        }
    });
}

export const userRepository = { getUser, createUser };