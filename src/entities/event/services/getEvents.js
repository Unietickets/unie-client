import { eventRepository } from "../repositories/event";

export async function getEvents() {
    return eventRepository.getEvents();
}