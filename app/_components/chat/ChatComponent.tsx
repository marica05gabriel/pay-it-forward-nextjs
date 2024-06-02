'use client';

import { ReactNode } from 'react';
import { MainChatArea } from './main-chat-area/MainChatArea';
import { ChatSidebar } from './sidebar/ChatSidebar';

export const ChatComponent = () => {
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
