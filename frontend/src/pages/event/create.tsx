import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { Button } from "../../components/Button";
import { ButtonLink } from "../../components/ButtonLink";
import { InlineLink } from "../../components/InlineLink";
import { MultiLineTextInput } from "../../components/MultiLineTextInput";
import PageContainer from "../../components/page/PageContainer";
import { TextInput } from "../../components/TextInput";

const Create: NextPage = () => {
  const router = useRouter();

  const [name, setName] = useState<string>();
  const [organization, setOrganization] = useState<string>();
  const [description, setDescription] = useState<string>();

  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();

  const post = () => {
    // TODO
  };

  return (
    <PageContainer>
      <div className='flex flex-col gap-8 mx-auto max-w-screen-xl px-4 py-12'>
        <div>
          <h1 className='text-5xl font-rubik font-black'>Create</h1>
          <InlineLink href='/event'>Back</InlineLink>
        </div>
        <div className='flex flex-col gap-2'>
          <TextInput placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
          <TextInput
            placeholder='Organization'
            onChange={(e) => setOrganization(e.target.value)}
            value={organization}
          />
          <MultiLineTextInput
            placeholder='Description'
            rows={8}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <TextInput
            placeholder='Contact Email (Optional)'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextInput
            placeholder='Contact Phone Number (Optional)'
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <TextInput placeholder='Event Time' type='datetime-local' />
          <div className='flex flex-row gap-2'>
            <Button size='large' color='primary'>
              Create
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

export default Create;
