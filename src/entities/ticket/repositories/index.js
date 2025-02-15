import { prisma } from "@/shared/lib/db";

export class TicketRepository {
    async getTicketsByEventId(eventId) {
        return await prisma.ticket.findMany({
            where: {
                id: eventId
            }
        });
    }
}

export const ticketRepository = new TicketRepository();
