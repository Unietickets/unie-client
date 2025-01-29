import { prisma } from "@/shared/lib/db";

export async function getEvents() {
    return await prisma.event.findMany(); 
}

export const eventRepository = { getEvents };