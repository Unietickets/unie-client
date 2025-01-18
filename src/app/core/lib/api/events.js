import { prisma } from "../prisma";

export async function fetchEvents() {
    return await prisma.event.findMany(); 
}