'use server';

import { serializeTickets } from "../helpers";
import * as ticketRepository from "../repositories"

export const getEventTickets = async ({ eventId }) => {
  return ticketRepository.getTicketsByEventId(eventId);
}

export const getUserTickets = async ({ userId }) => {
  const available = await ticketRepository.getTicketByUserIdAndStatus({ userId, status: 'available' });
  const reserved = await ticketRepository.getTicketByUserIdAndStatus({ userId, status: 'reserved' });
  const sold = await ticketRepository.getTicketByUserIdAndStatus({ userId, status: 'sold' });

  return {
    available: serializeTickets(available),
    reserved: serializeTickets(reserved),
    sold: serializeTickets(sold)
  };
}

export const createTicket = async ({
  userId,
  eventId,
  photos,
  description,
  price
}) => {
  const numberPrice = Number(price);
  const isPriceNotNumber = Number.isNaN(numberPrice);

  if (isPriceNotNumber) {
    throw new Error("Price must be number");
  }

  return ticketRepository.createTicket({
    userId,
    eventId,
    photos,
    description,
    price: numberPrice
  });
}
