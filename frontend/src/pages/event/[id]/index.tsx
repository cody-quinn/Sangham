import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { ButtonLink } from "../../../components/ButtonLink";
import { InlineLink } from "../../../components/InlineLink";
import PageContainer from "../../../components/page/PageContainer";
import api, { Event } from "../../../lib/api";
import { BASE_URL } from "../../../lib/http";

const EventPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [error, setError] = useState<string | undefined>();
  const [result, setResult] = useState<Event | undefined>();

  useEffect(() => {
    api.events
      .getEvent(id as string)
      .then((res) => setResult(res.data))
      .catch((err) => setError(err));
  }, [id]);

  return (
    <PageContainer>
      <div className='flex flex-col gap-8 mx-auto max-w-screen-xl px-4 py-12'>
        {result ? (
          <>
            <div>
              <h1 className='text-5xl font-rubik font-black'>{result.title}</h1>
              <sub className='text-sm font-rubik'>🗄️{result.organization}</sub>
              <div className='pt-2'>
                {result.website && <p>🌐 {result.website}</p>}
                {result.phone_number && <p>📞 {result.phone_number}</p>}
                {result.email && <p>📧 {result.email}</p>}
                {result.datetime && (
                  <p>📅 {dayjs(result.datetime).format("DD/MM/YYYY HH:mm:ss")}</p>
                )}
                {result.location && <p>📍 {result.location}</p>}
                {result.rsvps.length+" RSVPS" && <p>✋{result.rsvps.length+" RSVPS"}</p>}
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {result.count > 0 && <img src={`${BASE_URL}/events/${result._id}/images/0`} alt='' />}
              <p>{result.description}</p>
              <div className='flex flex-row gap-2'>
                <ButtonLink color='primary' size='large' href={`/event/${result._id}/rsvp`}>
                  RSVP
                </ButtonLink>
                <ButtonLink color='secondary' size='large' href={`/event/`}>
                  Back
                </ButtonLink>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </PageContainer>
  );
};

export default EventPage;
