'use client';

import {
  ActiveChat,
  Chat,
  ChatContact,
  ChatMessage,
  ChatMessageType,
} from '@/utils/types';
import React, { useEffect } from 'react';
import { ReactNode, useContext, useState } from 'react';
import { getChats, getContacts, getMeAsContact } from '../services/chatService';

interface ChatContextProps {
  me: ChatContact;
  contacts: Map<string, ChatContact>;
  chats: Map<string, Chat>;
  activeChat: ActiveChat | undefined;
  changeActiveChat: (chatId: string) => void;
  sendMessage: (
    fromId: string,
    toId: string,
    chatId: string,
    message: string
  ) => void;
}
const contextInitialValues: ChatContextProps = {
  me: { id: '-1', nickname: 'No nickname', avatar: 'No avatar' },
  contacts: new Map(),
  chats: new Map(),
  activeChat: undefined,
  changeActiveChat: (chatId) =>
    console.log(`Initial value for #setActiveChat ${chatId}`),
  sendMessage: (
    fromId: string,
    toId: string,
    chatId: string,
    message: string
  ) => console.log(`Send message not initialized!`),
};
const ChatContext = React.createContext<ChatContextProps>(contextInitialValues);

export const useChat = () => {
  return useContext(ChatContext);
};

interface Props {
  children: ReactNode;
}

export const ChatProvider = ({ children }: Props) => {
  const [contacts, setContacts] = useState<Map<string, ChatContact>>(
    contextInitialValues.contacts
  );
  const [chats, setChats] = useState<Map<string, Chat>>(
    contextInitialValues.chats
  );
  const [me, setMe] = useState<ChatContact>(contextInitialValues.me);
  const [activeChat, setActiveChat] = useState<ActiveChat | undefined>(
    contextInitialValues.activeChat
  );

  /**
   * Initialize contacts
   */
  useEffect(() => {
    const contacts = getContacts();
    setContacts(contacts);
  }, []);

  /**
   * Initialize chats
   */
  useEffect(() => {
    const chats = getChats();
    setChats(chats);
  }, []);

  /**
   * Initialize me
   */
  useEffect(() => {
    const me = getMeAsContact();
    setMe(me);
  }, []);

  /**
   * Initialize active chat as first in the chat list
   */
  useEffect(() => {
    if (activeChat) {
      return;
    }
    if (!chats || !contacts || chats.size <= 0) {
      return;
    }
    const chat = chats.values().next().value;
    const contact = contacts.get(chat.contactId);
    if (!contact) {
      console.error(
        `Found chat with id: ${chat.id}, but no contact with id: ${chat.contactId}`
      );
      return;
    }
    const initialActiveChat: ActiveChat = { chat, contact };
    setActiveChat(initialActiveChat);
  }, [chats, contacts]);

  const changeActiveChat = (chatId: string) => {
    const chat = chats.get(chatId);
    if (!chat) {
      return;
    }
    const contact = contacts.get(chat.contactId);
    if (!contact) {
      return;
    }

    setActiveChat({ chat, contact });
  };

  const sendMessage = (
    fromId: string,
    toId: string,
    chatId: string,
    message: string
  ) => {
    const chat = chats.get(chatId);
    if (!chat) {
      console.error(`Cannot send message. Chat with id: ${chatId} not found!`);
      return;
    }
    const from = fromId === me.id ? me : contacts.get(fromId);
    const to = toId === me.id ? me : contacts.get(toId);
    if (!from || !to) {
      console.error(
        `Cannot send message. Sender with id: ${fromId} or receiver with id ${toId} not found!`
      );
      return;
    }
    if (from === to) {
      console.error(`You cannot send message to yourself!`);
      return;
    }
    const messages = chat.messages;
    const type: ChatMessageType = fromId === me.id ? 'outgoing' : 'incoming';
    const contactId = type === 'incoming' ? fromId : toId;
    const updatedMessages: ChatMessage[] = [
      ...messages,
      { id: String(messages.length), message: message, type: type },
    ];
    const newChat: Chat = {
      id: chatId,
      contactId: contactId,
      messages: updatedMessages,
    };
    setChats((previousChats) => {
      const newChats = new Map(previousChats);
      newChats.set(newChat.id, newChat);
      return newChats;
    });
    setActiveChat((previousActiveChat) => {
      return { chat: newChat, contact: type === 'incoming' ? from : to };
    });
  };

  const value = {
    me,
    contacts,
    chats,
    activeChat,
    changeActiveChat,
    sendMessage,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
