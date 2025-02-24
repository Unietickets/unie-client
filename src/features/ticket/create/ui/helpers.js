'use server'

// import { ROUTES } from "@/core/routes";

// import { authService } from "../../services";
import * as ticketService from '@entities/ticket/services'

export async function createTicket(data) {
  const { event, description, price, files, user } = data;

  const ticket = await ticketService.createTicket({
    userId: user.id,
    eventId: event.id,
    photos: files,
    description,
    price
  });
  console.log('ticket', ticket);

  // const res = await authService.register({ email, password, name });

  // if (!res.ok) {
  //   return { message: 'Please enter a valid email' }
  // }

  // redirect(ROUTES.signIn.href);
}
