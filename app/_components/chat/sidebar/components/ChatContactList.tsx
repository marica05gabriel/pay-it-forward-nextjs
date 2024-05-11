import { contactDataList } from '@/utils/chat-contact-list-test-data';
import { ChatContact } from './ChatContact';
import { ContactListContainer } from '../container/ContactListContainer';

export const ChatContactList = () => {
  return (
    <ContactListContainer>
      {contactDataList.map((contact) => (
        <ChatContact {...contact} />
      ))}
    </ContactListContainer>
  );
};
