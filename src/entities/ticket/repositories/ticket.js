export async function getTickets({ eventId }) {
    return await prisma.ticket.findMany({
        where: {
            id: eventId
        }
    }); 
}

export const ticketRepository = { getTickets };