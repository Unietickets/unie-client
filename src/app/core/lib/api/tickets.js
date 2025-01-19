import { prisma } from "../prisma";

export async function fetchEventTickets({ eventId }) {
    return await prisma.ticket.findMany({
        where: {
            event_id: eventId
        }
    }); 
}