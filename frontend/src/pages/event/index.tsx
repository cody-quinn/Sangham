import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import api, { Event as EventDTO } from "../../lib/api";
import PageContainer from "../../components/page/PageContainer";
import EventPreview from "../../components/EventPreview";
import { InlineLink } from "../../components/InlineLink";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { useIntersection } from "react-use";

const Browse: NextPage = () => {
  const PER_PAGE = 8;

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [eof, setEof] = useState<boolean>(false);

  const [events, setEvents] = useState<EventDTO[]>([]);

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  useEffect(() => {
    setError(false);
    setEof(false);
    setEvents([]);

    // Loading the next page after reseting state
    setLoading(true);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (eof) return;
    intersection && intersection.intersectionRatio === 1 && setLoading(true);
  }, [intersection]);

  useEffect(() => {
    if (!loading) return;

    api.events
      .getEvents(undefined, undefined, PER_PAGE, Math.ceil(events.length / PER_PAGE) * PER_PAGE)
      .then((res) => {
        const nextEvents = res.data;

        // Setting end of file to true if we reached the end
        if (nextEvents.length < PER_PAGE) setEof(true);

        setEvents((events) => [...events, ...nextEvents]);
      })
      .catch((_) => setError(true))
      .finally(() => setLoading(false));
  }, [loading]);

  return (
    <PageContainer>
      <div className='flex flex-col gap-8 mx-auto max-w-screen-xl px-4 py-12 pb-64'>
        <div>
          <h1 className='text-5xl font-rubik font-black'>Browse</h1>
          <InlineLink href='/event/create'>Add your event</InlineLink>
        </div>
        <TextInput placeholder='Filter your results' />
        <div className='flex flex-col gap-8 '>
          {events.map((event) => (
            <EventPreview event={event} key={event._id} />
          ))}

          {!eof && (
            <>
              <span ref={intersectionRef}></span>
              <Button
                color='primary'
                size='large'
                disabled={loading}
                onClick={() => setLoading(true)}
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Browse;
