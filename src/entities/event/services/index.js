'use server'

import * as eventRepository from "../repositories";

export async function getEventById(id) {
  return eventRepository.getEventById(id);
}

export async function getRecommendedEvents(userId = null) {
  const generalRecommendedEvents = await eventRepository.getRecommendedEvents();
  let usersRecommendedEvents = [];

  if (userId) {
    usersRecommendedEvents = await eventRepository.getRecommendedEvents(userId);
  }

  return [...generalRecommendedEvents, ...usersRecommendedEvents];
}

export async function getAllEvents() {
  return eventRepository.getAllEvents();
}

export async function getEventsByGenre(genre = null, limit = 10) {
  return eventRepository.getEventsByGenre(genre, limit);
}

export async function getArtEvents(limit) {
  return getEventsByGenre('Art', limit);
}

export async function getMusicEvents(limit) {
  return getEventsByGenre('Music', limit);
}

export async function getSportEvents(limit) {
  return getEventsByGenre('Sports', limit);
}
