'use server';

import { serializeTickets } from "../helpers";
import * as ticketRepository from "../repositories"
import * as userService from "@/entities/user/services";

export const getEventTickets = async ({ eventId }) => {
  const tickets = await ticketRepository.getTicketsByEventId(eventId) ?? [];

  const userIds = [...new Set(tickets.map(ticket => ticket.user_id))];

  const sellerPromises = userIds.map(userId => userService.getUserById(userId));
  const sellers = await Promise.all(sellerPromises);

  const sellerMap = {};
  userIds.forEach((userId, index) => {
    sellerMap[userId] = sellers[index];
  });

  const ticketsWithSellers = tickets.map(ticket => ({
    ...ticket,
    seller: sellerMap[ticket.user_id]
  }));

  return serializeTickets(ticketsWithSellers);
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

export const getTicketById = async ({ ticketId }) => {
  return ticketRepository.getTicketById(ticketId);
};

export const updateTicket = async (ticketId, data) => {
  return ticketRepository.updateTicket(ticketId, data);
};
