'use client'

import React from 'react';

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
                    <tr key={event.event_id}>
                        <td>
                            {event.name}
                        </td>
                        <td>
                            {event.genre}
                        </td>
                        <td>
                            {event.location}
                        </td>
                        <td>
                            {event.tickets_available}
                        </td>
                        <td>
                            {event.tickets_sold}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};