'use server';

// import { ROUTES } from "@/core/routes";

// import { authService } from "../../services";
import * as ticketService from '@entities/ticket/services'
import { sendTicketToQueue } from '@entities/ticket/services/ticketQueue'

export async function createTicket(data) {
  const { event, description, price, files, user } = data;

  try {
    // Сначала создаем билет с помощью основного сервиса
    const tickets = await ticketService.getUserTickets({
      userId: user.id
    });

    console.log('Created ticket:', tickets.available);

    // Затем отправляем созданный билет в очередь RabbitMQ
    await sendTicketToQueue(tickets.available[0], 'create');

    return tickets.available[0];
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }

  // const res = await authService.register({ email, password, name });

  // if (!res.success) {
  //   return { message: 'Please enter a valid email' }
  // }

  // redirect(ROUTES.signIn.href);
}
