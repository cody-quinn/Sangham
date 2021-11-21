import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Event as EventDTO } from "../../lib/api";
import PageContainer from "../../components/page/PageContainer";
import EventPreview from "../../components/EventPreview";
import { InlineLink } from "../../components/InlineLink";
import { TextInput } from "../../components/TextInput";

const EVENTS = [
  {
    _id: "pogchamp",
    title: "Tyler Texas Food Drive",
    description:
      "Food drive hosted in Tyler Texas Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aut cupiditate quo est consectetur accusantium voluptate eum illo, eveniet id voluptas suscipit eaque mollitia totam, adipisci eius vero assumenda doloremque molestiae! Ipsa nemo dolorum saepe accusantium error odit similique voluptate repudiandae, praesentium corporis cum pariatur modi quidem vitae voluptatibus autem.",
    organization: "Tyler ISD",
    images: [],
    tags: ["School", "Food"],
  },
  {
    _id: "pogchamp",
    title: "Tyler Legacy Food Drive",
    description:
      "Food drive hosted in Tyler Texas Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aut cupiditate quo est consectetur accusantium voluptate eum illo, eveniet id voluptas suscipit eaque mollitia totam, adipisci eius vero assumenda doloremque molestiae! Ipsa nemo dolorum saepe accusantium error odit similique voluptate repudiandae, praesentium corporis cum pariatur modi quidem vitae voluptatibus autem.",
    organization: "Tyler ISD",
    email: "codyquinn1122@gmail.com",
    images: [],
    tags: ["School", "Food"],
  },
  {
    _id: "pogchamp",
    title: "Flint Food Drive",
    description:
      "Food drive hosted in Tyler Texas Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aut cupiditate quo est consectetur accusantium voluptate eum illo, eveniet id voluptas suscipit eaque mollitia totam, adipisci eius vero assumenda doloremque molestiae! Ipsa nemo dolorum saepe accusantium error odit similique voluptate repudiandae, praesentium corporis cum pariatur modi quidem vitae voluptatibus autem.",
    organization: "Tyler ISD",
    phone_number: "(903) 530-2162",
    images: [],
    tags: ["School", "Food"],
  },
];

const Browse: NextPage = () => {
  const [events, setEvents] = useState<EventDTO[]>([]);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setEvents(EVENTS.filter((e) => e.title.toLowerCase().includes(search.toLowerCase())));
  }, [search]);

  return (
    <PageContainer>
      <div className='flex flex-col gap-8 mx-auto max-w-screen-xl px-4 py-12'>
        <div>
          <h1 className='text-5xl font-rubik font-black'>Browse</h1>
          <InlineLink href='/event/create'>Add your event</InlineLink>
        </div>
        <TextInput
          placeholder='Filter your results'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div className='flex flex-col gap-8'>
          {events.map((event) => (
            <EventPreview event={event} key={event._id} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Browse;
