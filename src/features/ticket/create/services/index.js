import * as ticketRepository from "@/entities/ticket/repositories";

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