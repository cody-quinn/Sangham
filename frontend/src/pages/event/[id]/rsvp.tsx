import { NextPage } from "next";
import { useState } from "react";
import PageContainer from "../../../components/page/PageContainer";
import { Button } from "../../../components/Button";
import { ButtonLink } from "../../../components/ButtonLink";
import { InlineLink } from "../../../components/InlineLink";
import { MultiLineTextInput } from "../../../components/MultiLineTextInput";
import { TextInput } from "../../../components/TextInput";
import api from "../../../lib/api";
import { useRouter } from "next/dist/client/router";

const RSVPPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [result, setResult] = useState<false | string>(false);

  const rsvp = () => {
    api.events
      .rsvp(String(id), { name, phone })
      .then((_) => setResult("Successfully RSVP'd"))
      .catch((_) => setResult("There was an error RSVPing for the event"))
      .finally(() => setTimeout(() => router.push("/event"), 1500));
  };

  if (result !== false) {
    <PageContainer>
      <div className='flex justify-center items-center'>{result}</div>
    </PageContainer>;
  }

  return (
    <PageContainer>
      <div className='flex flex-col gap-8 mx-auto max-w-screen-xl px-4 py-12'>
        <div>
          <h1 className='text-5xl font-rubik font-black'>Create</h1>
          <InlineLink href='/event'>Back</InlineLink>
        </div>
        <div className='flex flex-col gap-2'>
          <TextInput placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          <TextInput
            placeholder='Phone #'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className='flex flex-row gap-2'>
            <Button size='large' color='primary' onClick={() => rsvp()}>
              RSVP
            </Button>
            <ButtonLink href='/event' size='large'>
              Cancel
            </ButtonLink>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default RSVPPage;
