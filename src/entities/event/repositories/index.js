'use server'

import { prisma } from "@/shared/lib/db";

export async function getEventById(id) {
  return prisma.event.findUnique({
    where: {
      id: id
    }
  });
}

export async function getAllEvents() {
    return await prisma.event.findMany();
  }

export async function getRecommendedEvents(userId = null) {
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

export async function getEventsByGenre(genre = null, limit = 10) {
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

export async function addToRecommended(eventId, userId = null, weight = 1.0) {
  return prisma.recommendedEvent.create({
    data: {
      event_id: eventId,
      user_id: userId,
      weight: weight
    }
  });
}

export async function removeFromRecommended(eventId, userId = null) {
  return prisma.recommendedEvent.deleteMany({
    where: {
      event_id: eventId,
      user_id: userId
    }
  });
}
