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

interface Props {
  activeChat: ActiveChat;
  me: ChatContact;
  sendMessage: (
    fromId: string,
    toId: string,
    chatId: string,
    message: string
  ) => void;
}
type Message = {
  id: string;
  isLastMessage: boolean;
  message: string;
  avatar: string;
  type: ChatMessageType;
};
export const MainChatArea = ({ activeChat, me, sendMessage }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messages: Message[] = [];
    if (activeChat.chat.messages.length <= 0) {
      return;
    }

    const contact = activeChat.contact;
    const lastMessageId =
      activeChat.chat.messages[activeChat.chat.messages.length - 1]?.id;
    activeChat.chat.messages.forEach((message) => {
      const isLastMessage = lastMessageId === message.id;
      const avatar = message.type === 'incoming' ? contact.avatar : me.avatar;
      messages.push({
        id: message.id,
        message: message.message,
        isLastMessage: isLastMessage,
        avatar: avatar,
        type: message.type,
      });
    });
    setMessages(messages);
  }, [activeChat]);

  return (
    <MainChatContainer>
      <Header title={activeChat.contact.nickname} />
      <ChatMessagesContainer>
        {messages.map((message, index) => {
          if (message.type === 'incoming') {
            return (
              <IncomingMessage
                key={message.id}
                id={message.id}
                isLastMessage={message.isLastMessage}
                message={message.message}
                avatar={message.avatar}
              />
            );
          } else {
            return (
              <OutgoingMessage
                key={message.id}
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
    </MainChatContainer>
  );
};
