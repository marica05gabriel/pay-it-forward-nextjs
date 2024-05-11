import { chatMessagesList } from '@/utils/chat-contact-list-test-data';
import { Header } from './components/Header';
import { IncomingMessage } from './components/IncomingMessage';
import { OutgoingMessage } from './components/OutgoingMessage';
import { MainChatContainer } from './container/MainChatContainer';
import { ChatMessagesContainer } from './container/ChatMessagesContainer';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from '@/app/_utils/types';

export const MainChatArea = () => {
  const userAvatar =
    'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato';
  const myAvatar =
    'https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato';

  const renderMessages = (chatMessagesList: ChatMessage[]) => {
    return chatMessagesList.map((chatMessage) => {
      if (chatMessage.type === 'incoming') {
        return (
          <IncomingMessage message={chatMessage.message} avatar={userAvatar} />
        );
      } else {
        return (
          <OutgoingMessage message={chatMessage.message} avatar={myAvatar} />
        );
      }
    });
  };

  return (
    <MainChatContainer>
      <Header title={'Alice'} />
      <ChatMessagesContainer>
        {renderMessages(chatMessagesList)}
      </ChatMessagesContainer>
      <ChatInput />
    </MainChatContainer>
  );
};
