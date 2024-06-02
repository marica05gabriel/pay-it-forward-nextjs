'use client';

import { ChatContact } from '@/utils/types';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getContacts } from '../services/contactsService';

interface ContactsContextProps {
  contacts: Map<number, ChatContact>;
}
const contactsContextInitialValues: ContactsContextProps = {
  contacts: new Map(),
};
const ContactsContext = createContext<ContactsContextProps>(
  contactsContextInitialValues
);

interface Props {
  me: ChatContact;
  children: ReactNode;
}
export const ContactsProvider = ({ me, children }: Props) => {
  const [contacts, setContacts] = useState<Map<number, ChatContact>>(
    contactsContextInitialValues.contacts
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContacts(me.id);
      const newContacts = new Map();
      data.map((contact) => newContacts.set(contact.id, contact));
      setContacts(newContacts);
    };
    fetchData().catch((error) => {
      console.error(error);
    });
  }, []);

  const value = { contacts };
  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  return useContext(ContactsContext);
};
