import React from 'react';

import * as eventService from "@entities/event/services";
import * as ticketService from "@entities/ticket/services";
import * as fileService from "@entities/file/services";

import EventPage from "@/views/events/event";

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const mapMockImages = (event) => ({
  id: event.id,
  image: "/images/events.jpg",
  title: event.name,
  venue: event.location,
  link: `/events/${event.id}`,
  metadata: [
    {
      name: "time",
      value: new Date(event.event_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    },
    {
      name: "date",
      value: new Date(event.event_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
    },
    {
      accent: true,
      name: "location",
      value: event.location?.split(',')[0] || 'Unknown'
    }
  ],
  description: event.description
});

export default async function Event({
  params,
}) {
  const slug = (await params).slug;
  const event = await eventService.getEventById(Number(slug));
  const mockImageEvent = mapMockImages(event);
  const tickets = await ticketService.getEventTickets(Number(slug));

  const ticketsWithPhotos = await Promise.all(
    tickets?.map(async (t) => ({
      ...t,
      ...(t?.image && { photoUrl: await fileService.getFileLinkById(t.image) })
    }))
  );

  return (
    <EventPage
      event={mockImageEvent}
      tickets={ticketsWithPhotos}
    />
  );
}
