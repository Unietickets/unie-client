'use server';

import * as ticketService from '@/entities/ticket/services';
import * as eventService from '@/entities/event/services';

/**
 * Имитация API для верификации билетов через внешнего партнера
 * @param {Object} ticketData - Данные билета для верификации
 * @returns {Promise<Object>} - Результат верификации
 */
const ticketVerificationAPICall = async (ticketData) => {
  // Имитируем задержку сетевого запроса
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Имитируем случайный результат верификации с вероятностью успеха 80%
  const isSuccess = Math.random() < 0.8;

  if (isSuccess) {
    return {
      status: 'success',
      verified: true,
      verificationId: `VRF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      provider: 'EventGuard',
      metadata: {
        securityLevel: 'high',
        verificationMethod: 'digital_signature',
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 дней
        verificationSignature: `${Buffer.from(JSON.stringify(ticketData)).toString('base64').substring(0, 20)}...`,
      }
    };
  } else {
    // Генерируем случайную ошибку
    const errorCodes = [
      { code: 'TICKET_NOT_FOUND', message: 'Билет не найден в системе партнера' },
      { code: 'TICKET_EXPIRED', message: 'Срок действия билета истек' },
      { code: 'EVENT_CANCELLED', message: 'Мероприятие отменено' },
      { code: 'DUPLICATE_TICKET', message: 'Обнаружен дубликат билета' },
      { code: 'INVALID_SIGNATURE', message: 'Недействительная цифровая подпись' }
    ];

    const randomError = errorCodes[Math.floor(Math.random() * errorCodes.length)];

    return {
      status: 'error',
      verified: false,
      errorCode: randomError.code,
      errorMessage: randomError.message,
      provider: 'EventGuard',
      metadata: {
        requestId: `REQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        suggestedAction: 'retry_later'
      }
    };
  }
};

/**
 * Верификация билета через внешний API партнера
 * @param {Object} params - Параметры запроса
 * @param {number} params.ticketId - ID билета для верификации
 * @returns {Promise<Object>} - Результат верификации
 */
export const verifyTicket = async ({ ticketId }) => {
  try {
    const ticket = await ticketService.getTicketById(ticketId);

    if (!ticket) {
      throw new Error('Билет не найден');
    }

    const event = await eventService.getEventById(ticket.event_id);

    if (!event) {
      throw new Error('Событие не найдено');
    }

    const ticketData = {
      id: ticket.id,
      eventId: ticket.event_id,
      eventName: event.name,
      eventDate: event.event_date,
      userId: ticket.user_id,
      price: ticket.price.toString(),
      issueDate: ticket.upload_date,
      ticketHash: `TICKET-${ticket.id}-${ticket.event_id}-${ticket.user_id}`,
    };

    const verificationResult = await ticketVerificationAPICall(ticketData);

    if (verificationResult.status === 'success') {
      await ticketService.updateTicket(ticketId, {
        is_verified: true,
      });
    }

    return {
      ticket,
      event,
      verification: verificationResult,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Ошибка при верификации билета:', error);
    return {
      status: 'error',
      errorMessage: error.message || 'Произошла ошибка при верификации билета',
      timestamp: new Date().toISOString()
    };
  }
};