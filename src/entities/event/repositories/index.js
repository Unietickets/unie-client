import { prisma } from "@/shared/lib/db";

export class EventRepository {
  async getEventById(id) {
    return prisma.event.findUnique({
      where: {
        id: id
      }
    });
  }

  async getAllEvents() {
    return await prisma.event.findMany();
  }

  async getRecommendedEvents(userId = null) {
    return await prisma.event.findMany({
      where: {
        status: 'coming',
        recommendations: {
          some: {
            user_id: userId
          }
        }
      },
      include: {
        recommendations: true
      },
      orderBy: {
        event_date: 'asc'
      },
      take: 10,
    });
  }

  async getEventsByGenre(genre = null, limit = 10) {
    return prisma.event.findMany({
      where: {
        status: 'coming',
        genre: genre
      },
      orderBy: {
        tickets_sold: 'desc',
      },
      take: limit,
    });
  }

  async addToRecommended(eventId, userId = null, weight = 1.0) {
    return prisma.recommendedEvent.create({
      data: {
        event_id: eventId,
        user_id: userId,
        weight: weight
      }
    });
  }

  async removeFromRecommended(eventId, userId = null) {
    return prisma.recommendedEvent.deleteMany({
      where: {
        event_id: eventId,
        user_id: userId
      }
    });
  }
}

export const eventRepository = new EventRepository();
