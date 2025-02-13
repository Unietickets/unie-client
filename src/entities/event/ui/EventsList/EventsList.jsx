import Link from "next/link";
import React from "react";

import { ROUTES } from "@/core/routes";

import { eventService } from "../../services";

export const EventsList = async () => {
  const events = await eventService.getAllEvents();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>genre</th>
          <th>location</th>
          <th>tickets_available</th>
          <th>tickets_sold</th>
        </tr>
      </thead>
      <tbody>
        {events?.map?.((event) => (
          <tr key={event.id}>
            <td>
              <Link href={{
                pathname: `${ROUTES.events.href}/[id]`,
                query: { id: event.id }
              }}>{event.name}</Link>
            </td>
            <td>{event.genre}</td>
            <td>{event.location}</td>
            <td>{event.tickets_available}</td>
            <td>{event.tickets_sold}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
