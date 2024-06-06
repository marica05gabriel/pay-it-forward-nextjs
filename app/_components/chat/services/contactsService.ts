'use client';
import { me } from '@/app/_utils/chat-contact-list-test-data';
import { ChatContact } from '@/app/_utils/types';

export const getContacts = async (userId: number) => {
  const response = await fetch(
    'http://localhost:8050/contacts?' +
      new URLSearchParams({
        userId: me.id.toString(),
      }),
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = (await response.json()) as { contacts: ChatContact[] };
  return data.contacts;
};
