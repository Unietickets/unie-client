'use server';

import { prisma } from "@/shared/lib/db";

export async function getTicketsByEventId(eventId) {
  return await prisma.ticket.findMany({
    where: {
      id: eventId
    }
  });
}
