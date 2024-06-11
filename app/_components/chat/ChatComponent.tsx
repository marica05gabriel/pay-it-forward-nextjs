'use client';

import { ReactNode, useEffect } from 'react';
import { MainChatArea } from './main-chat-area/MainChatArea';
import { ChatSidebar } from './sidebar/ChatSidebar';
import { useContacts } from './context-providers/ContactsProvider';
import { Chat, ChatContact } from '@/app/_utils/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useChat } from './context-providers/ChatProvider';
import { createAvatar } from '@dicebear/core';
import { adventurerNeutral } from '@dicebear/collection';

interface Props {
  contactList: Map<string, ChatContact>;
  chats: Map<number, Chat>;
}
export const ChatComponent = ({ contactList, chats }: Props) => {
  const { setContacts } = useContacts();
  const { setChats } = useChat();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }
    console.log(contactList);
    setContacts(contactList);
    setChats(chats);
  }, [contactList, session]);
  return (
    <ChatContainer>
      <ChatSidebar />
      <MainChatArea />
    </ChatContainer>
  );
};

interface ContainerProps {
  children: ReactNode;
}
const ChatContainer = ({ children }: ContainerProps) => (
  <div className='flex h-[calc(100vh-192px)] overflow-hidden'>{children}</div>
);
