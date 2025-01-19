"use client";

import Link from "next/link";
import React from "react";

export const EventsList = ({ events }) => {
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
          <Link href={`events/${event.event_id}`} key={event.event_id}>
            <tr>
              <td>{event.name}</td>
              <td>{event.genre}</td>
              <td>{event.location}</td>
              <td>{event.tickets_available}</td>
              <td>{event.tickets_sold}</td>
              <td>
                {event.tickets?.map((t) => (
                  <li>{t}</li>
                ))}
              </td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
};
