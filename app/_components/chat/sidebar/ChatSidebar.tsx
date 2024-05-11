import { ChatContactList } from './components/ChatContactList';
import { SidebarContainer } from './container/SidebarContainer';
import { Header } from './components/Header';
import { Chat, ChatContact } from '@/app/_utils/types';

interface Props {
  contacts: Map<string, ChatContact>;
  chats: Map<string, Chat>;
  activeChatId: string | undefined;
  setActiveChat: (chatId: string) => void;
}
export const ChatSidebar = ({
  contacts,
  chats,
  activeChatId,
  setActiveChat,
}: Props) => {
  return (
    <SidebarContainer>
      <Header title='Chat Web' />
      <ChatContactList
        contacts={contacts}
        chats={chats}
        activeChatId={activeChatId}
        setActiveChat={setActiveChat}
      />
    </SidebarContainer>
  );
};
