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
  <div className='flex h-screen overflow-hidden'>{children}</div>
);
