import { ContactListContainer } from '../container/ContactListContainer';
import { ChatContactComponent } from './ChatContactComponent';
import { useChat } from '../../context-providers/ChatProvider';
import { useContacts } from '../../context-providers/ContactsProvider';

interface Data {
  chatId: number;
  isActive: boolean;
  nickname: string;
  avatar: string;
  lastMessage: string;
}
export const ChatContactList = () => {
  const { chats, activeChat, setActiveChat } = useChat();
  const { contacts } = useContacts();
  const activeChatId = activeChat?.chat?.id;

  const prepareData = () => {
    console.log(chats);
    const data: Data[] = Array.from(chats.values())
      .filter((chat) => {
        return contacts.get(chat.contactId) !== undefined;
      })
      .map((chat) => {
        let lastMessage = '';
        if (chat.messages.length > 0) {
          lastMessage = chat.messages[chat.messages.length - 1].message;
        }
        const contact = contacts.get(chat.contactId);
        return {
          chatId: chat.id,
          isActive: activeChatId === chat.id,
          nickname: contact!.nickname,
          lastMessage,
          avatar: contact!.avatar,
        };
      });

    return data;
  };

  const handleToggleChat = (chatId: number) => {
    setActiveChat(chatId);
  };

  return (
    <ContactListContainer>
      {!(chats && contacts) ? (
        <div>Loading</div>
      ) : (
        prepareData().map((data) => (
          <ChatContactComponent
            key={data.chatId}
            id={data.chatId}
            isActive={activeChatId === data.chatId}
            nickname={data.nickname}
            avatar={data.avatar}
            lastMessage={data.lastMessage}
            setActiveChat={handleToggleChat}
          />
        ))
      )}
    </ContactListContainer>
  );
};
