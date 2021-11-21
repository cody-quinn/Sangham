import Image from "next/image";
import React from "react";
import { Event as EventDTO } from "../lib/api";
import { ButtonLink } from "./ButtonLink";

export type EventPreviewProps = {
  event: EventDTO;
};

const EventPreview: React.FC<EventPreviewProps> = ({ event }) => (
  <div className='flex flex-row gap-8 bg-gray-100 px-10 py-6 rounded-lg'>
    <div className='flex flex-col w-2/3 gap-8'>
      <div>
        <h1 className='text-xl font-black font-rubik'>{event.title}</h1>
        <p className='text-md font-rubik'>{event.description}</p>
        <sub className='text-sm font-rubik'>{event.organization}</sub>
        <div className='pt-2'>
          {event.phone_number && <p>📞 {event.phone_number}</p>}
          {event.email && <p>📧 {event.email}</p>}
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
    <div className='w-1/3'>
      <Image width={640} height={426} src='/testing.jpg' alt='' />
    </div>
  </div>
);

export default EventPreview;
