'use server';

import { prisma } from "@/shared/lib/db";
import { Decimal } from "@prisma/client/runtime/library";

export const getTicketsByEventId = async (eventId) => {
  return await prisma.ticket.findMany({
    where: {
      event_id: eventId,
    },
  });
};

export const createTicket = async ({
  userId,
  eventId,
  photos,
  description,
  price
}) => {
  // Преобразуем ID в целые числа
  const userIdInt = parseInt(userId, 10);
  const eventIdInt = parseInt(eventId, 10);

  // Преобразуем цену в Decimal
  const decimalPrice = price ? new Decimal(price) : null;

  // Преобразуем описание в строку и обрезаем если нужно
  const textDescription = description ? String(description).slice(0, 1000) : null;

  // Преобразуем image в строку и обрезаем до 255 символов
  const imageStr = photos?.[0]?.id ? String(photos[0].id).slice(0, 255) : 'mock';

  return await prisma.ticket.create({
    data: {
      user_id: userIdInt,
      event_id: eventIdInt,
      image: imageStr,
      description: textDescription,
      price: decimalPrice,
    }
  });
}

export const getUserTicketsById = async (userId) => {
  return await prisma.ticket.findMany({
    where: {
      user_id: {
        equals: userId
      }
    }
  });
}
