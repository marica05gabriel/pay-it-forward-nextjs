import { Chat, ChatContact } from '@/utils/types';
import { ContactListContainer } from '../container/ContactListContainer';
import { ChatContactComponent } from './ChatContactComponent';

interface Props {
  chats: Map<string, Chat>;
  contacts: Map<string, ChatContact>;
  activeChatId: string | undefined;
  setActiveChat: (chatId: string) => void;
}
export const ChatContactList = ({
  chats,
  contacts,
  activeChatId,
  setActiveChat,
}: Props) => {
  const prepareData = (contact: ChatContact, chat: Chat) => {
    const chatId = chat.id;
    const nickname = contact.nickname;
    const avatar = contact.avatar;

    let lastMessage = '';
    if (chat.messages.length > 0) {
      lastMessage = chat.messages[chat.messages.length - 1].message;
    }

    return {
      chatId,
      nickname,
      avatar,
      lastMessage,
    };
  };
  return (
    <ContactListContainer>
      {Array.from(chats.values()).map((chat) => {
        const contact = contacts.get(chat.contactId);
        if (!contact) {
          return <></>;
        }

        const data = prepareData(contact, chat);
        return (
          <ChatContactComponent
            key={data.chatId}
            id={data.chatId}
            isActive={activeChatId === data.chatId}
            nickname={data.nickname}
            avatar={data.avatar}
            lastMessage={data.lastMessage}
            setActiveChat={setActiveChat}
          />
        );
      })}
    </ContactListContainer>
  );
};
