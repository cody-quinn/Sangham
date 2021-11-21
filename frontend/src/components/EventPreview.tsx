/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Event as EventDTO } from "../lib/api";
import { BASE_URL } from "../lib/http";
import { ButtonLink } from "./ButtonLink";
import dayjs from "dayjs";

export type EventPreviewProps = {
  event: EventDTO;
};

const EventPreview: React.FC<EventPreviewProps> = ({ event }) => (
  <div className='flex flex-row gap-8 bg-gray-100 px-10 py-6 rounded-lg'>
    <div className={`flex flex-col gap-8 ${event.count > 0 && "w-2/3"}`}>
      <div>
        <h1 className='text-xl font-black font-rubik'>{event.title}</h1>
        <p className='text-md font-rubik'>{event.description}</p>
        <sub className='text-sm font-rubik'>{event.organization}</sub>
        <div className='pt-2'>
          {event.phone_number && <p>📞 {event.phone_number}</p>}
          {event.email && <p>📧 {event.email}</p>}
          {event.datetime && <p>📅 {dayjs(event.datetime).format("DD/MM/YYYY HH:mm:ss")}</p>}
          {event.location && <p>📍 {event.location}</p>}
        </div>
      </div>
      <div className='flex gap-2'>
        <ButtonLink size='large' color='primary' href={`/event/${event._id}`}>
          More details
        </ButtonLink>
        <ButtonLink size='large' href={`/event/${event._id}/rsvp`}>
          RSVP
        </ButtonLink>
      </div>
    </div>
    {event.count > 0 && (
      <div className='w-1/3'>
        <img src={`${BASE_URL}/events/${event._id}/images/0`} alt='' />
      </div>
    )}
  </div>
);

export default EventPreview;
