import { eventRepository } from "../repositories";

class EventService {
  async getEventById(id) {
    return eventRepository.getEventById(id);
  }

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
}

export const eventService = new EventService();
