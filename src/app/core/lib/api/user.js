import { prisma } from "../prisma";

export async function fetchUserData({ id }) {
    return await prisma.user.findUnique({
        where: {
            user_id: id,
        }
    }); 
}