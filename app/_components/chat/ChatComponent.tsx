'use client';

import { ReactNode, useEffect } from 'react';
import { MainChatArea } from './main-chat-area/MainChatArea';
import { ChatSidebar } from './sidebar/ChatSidebar';
import { useChat } from './context/ChatContext';

export const ChatComponent = () => {
  const { contacts, chats, me, activeChat, changeActiveChat, sendMessage } =
    useChat();

  return (
    <ChatContainer>
      <ChatSidebar
        contacts={contacts}
        chats={chats}
        activeChatId={activeChat ? activeChat.chat?.id : '-1'}
        setActiveChat={changeActiveChat}
      />
      {activeChat && (
        <MainChatArea
          activeChat={activeChat}
          me={me}
          sendMessage={sendMessage}
        />
      )}
    </ChatContainer>
  );
};

interface ContainerProps {
  children: ReactNode;
}
const ChatContainer = ({ children }: ContainerProps) => (
  <div className='flex h-[calc(100vh-192px)] overflow-hidden'>{children}</div>
);
