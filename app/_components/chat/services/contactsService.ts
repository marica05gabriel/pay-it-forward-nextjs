'use client';
import { BookTransfer, ChatContact } from '@/app/_utils/types';

export const getContacts = async (username: string) => {
  const response = await fetch(`/transfer/byUser/${username}`);
  console.log('CHAT TRANSFERS123');
  console.log(response);
  if (response.status !== 200) {
    console.error('NOT OK');
    console.error('Response');
    return [];
  }
  let transfersData: BookTransfer[] = await response.json();
  console.log('TRANSFER_DATA123');
  console.log(transfersData);
  const chatContacts = transfersData.map((t) => {
    const contactId = t.from === username ? t.to : t.from;
    const contact: ChatContact = {
      id: contactId,
      nickname: contactId,
      avatar: '',
    };
    return contact;
  });

  console.log('CHAT CONTACTS');
  console.log(chatContacts);
  return chatContacts;
};
