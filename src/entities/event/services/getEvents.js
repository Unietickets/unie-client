import { eventRepository } from "../repositories/event";

class EventService {
  async getRecommendedEvents(userId = null) {
    const generalRecommendedEvents = await eventRepository.getRecommendedEvents();
    let usersRecommendedEvents = [];

    if (userId) {
      usersRecommendedEvents = await eventRepository.getRecommendedEvents(userId);
    }

    return [...generalRecommendedEvents, ...usersRecommendedEvents];
  }

  async getAllEvents() {
    return eventRepository.getAllEvents();
  }

  async getEventsByGenre(genre = null, limit = 10) {
    return eventRepository.getEventsByGenre(genre, limit);
  }

  async getArtEvents(limit) {
    return this.getEventsByGenre('Art', limit);
  }

  async getMusicEvents(limit) {
    return this.getEventsByGenre('Music', limit);
  }

  async getSportEvents(limit) {
    return this.getEventsByGenre('Sports', limit);
  }

  async getEventById(id) {
    return eventRepository.getEventById(id);
  }
}

export const eventService = new EventService();
