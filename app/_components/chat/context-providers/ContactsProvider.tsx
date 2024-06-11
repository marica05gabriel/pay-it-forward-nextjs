'use client';

import { ChatContact } from '@/utils/types';
import { ReactNode, createContext, useContext, useState } from 'react';

interface ContactsContextProps {
  contacts: Map<string, ChatContact>;
  setContacts: (contacts: Map<string, ChatContact>) => void;
}
const contactsContextInitialValues: ContactsContextProps = {
  contacts: new Map(),
  setContacts: () => {},
};
const ContactsContext = createContext<ContactsContextProps>(
  contactsContextInitialValues
);

interface Props {
  me: ChatContact;
  children: ReactNode;
}
export const ContactsProvider = ({ me, children }: Props) => {
  const [contacts, setContacts] = useState<Map<string, ChatContact>>(
    contactsContextInitialValues.contacts
  );

  const value = { contacts, setContacts };
  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  return useContext(ContactsContext);
};
