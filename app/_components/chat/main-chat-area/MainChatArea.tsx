import { Header } from './components/Header';
import { IncomingMessage } from './components/IncomingMessage';
import { OutgoingMessage } from './components/OutgoingMessage';
import { MainChatContainer } from './container/MainChatContainer';
import { ChatMessagesContainer } from './container/ChatMessagesContainer';
import { ChatInput } from './components/ChatInput';
import {
  ActiveChat,
  Chat,
  ChatContact,
  ChatMessage,
  ChatMessageType,
} from '@/app/_utils/types';
import { useEffect, useState } from 'react';
import { useChat } from '../context-providers/ChatProvider';

type Message = {
  id: string;
  isLastMessage: boolean;
  message: string;
  avatar: string;
  type: ChatMessageType;
};
export const MainChatArea = () => {
  const { me, activeChat, sendMessage } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const result: Message[] = [];
    if (!activeChat || activeChat.chat.messages.length <= 0) {
      return;
    }

    const contact = activeChat.contact;
    const messages = activeChat.chat.messages;
    const lastMessageId = messages[messages.length - 1]?.id;
    messages.forEach((message) => {
      const isLastMessage = lastMessageId === message.id;
      const avatar = message.type === 'incoming' ? contact.avatar : me.avatar;
      result.push({
        id: message.id,
        message: message.message,
        isLastMessage: isLastMessage,
        avatar: avatar,
        type: message.type,
      });
    });
    setMessages(result);
  }, [activeChat]);

  return (
    <MainChatContainer>
      {!(me && activeChat) ? (
        <div className='flex h-[calc(100vh-172px)]'>
          <div id='no_chat_selected' className='m-auto'>
            No chat selected
          </div>
        </div>
      ) : (
        <>
          <Header title={activeChat.contact.nickname} />
          <ChatMessagesContainer>
            {messages.map((message, index) => {
              if (message.type === 'incoming') {
                return (
                  <IncomingMessage
                    key={index}
                    id={message.id}
                    isLastMessage={message.isLastMessage}
                    message={message.message}
                    avatar={message.avatar}
                  />
                );
              } else {
                return (
                  <OutgoingMessage
                    key={index}
                    id={message.id}
                    isLastMessage={message.isLastMessage}
                    message={message.message}
                    avatar={message.avatar}
                  />
                );
              }
            })}
          </ChatMessagesContainer>
          <ChatInput
            chatId={activeChat.chat.id}
            myId={me.id}
            contactId={activeChat.contact.id}
            sendMessage={sendMessage}
          />
        </>
      )}
    </MainChatContainer>
  );
};
