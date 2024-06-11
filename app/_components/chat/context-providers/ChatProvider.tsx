'use client';

import {
  ActiveChat,
  Chat,
  ChatContact,
  ChatMessage,
  ChatMessageType,
  NO_ID,
  ValidationResultEnum,
} from '@/utils/types';
import React, { createContext, useCallback, useEffect } from 'react';
import { ReactNode, useContext, useState } from 'react';
import { useSocket } from './SocketProvider';
import _ from 'lodash';
import {
  DETACH_CHATS_EVENT,
  GET_CHATS,
  JOIN_CHATS_EVENT,
  PRIVATE_MESSAGE_EVENT,
} from './constants';
import { validateMessage } from './utils';
import { useContacts } from './ContactsProvider';
import { PrivateMessageDTO } from './types';
import { useSession } from 'next-auth/react';

interface ChatContextProps {
  me: ChatContact;
  chats: Map<number, Chat>;
  setChats: (chats: Map<number, Chat>) => void;
  activeChat: ActiveChat | undefined;
  setActiveChat: (chatId: number) => void;
  sendMessage: (chatId: number, toId: string, message: string) => void;
}
export const contextInitialValues: ChatContextProps = {
  me: { id: '-1', nickname: 'No nickname', avatar: 'No avatar' },
  chats: new Map(),
  setChats: () => {},
  activeChat: undefined,
  setActiveChat: (chatId) =>
    console.log(`Initial value for #setActiveChat ${chatId}`),
  sendMessage: (chatId: number, toId: string, message: string) =>
    console.log(`Send message not initialized!`),
};
const ChatContext = createContext<ChatContextProps>(contextInitialValues);

export const useChat = () => {
  return useContext(ChatContext);
};

interface Props {
  children: ReactNode;
  me: ChatContact;
}
export const ChatProvider = ({ me, children }: Props) => {
  const { socket, addEventListener, removeEventListener } = useSocket();
  const { contacts } = useContacts();

  const [chats, setChats] = useState<Map<number, Chat>>(
    contextInitialValues.chats
  );
  const [activeChat, setActiveChat] = useState<ActiveChat | undefined>(
    contextInitialValues.activeChat
  );

  /**
   * Initialize chats
   */
  // useEffect(() => {
  //   const chats = getChats();
  //   setChats(chats);
  // }, []);

  /**
   * Initialize active chat as first in the chat list
   */

  useEffect(() => {
    if (activeChat) {
      return;
    }
    if (!chats || chats.size <= 0 || !contacts || contacts.size <= 0) {
      return;
    }
    const chat: Chat = chats.values().next().value;
    const contact = contacts.get(chat.contactId);
    if (!contact) {
      return;
    }
    setActiveChat({ chat, contact });
  }, [chats, contacts]);

  /**
   * Add socket listener for private_message event
   */

  useEffect(() => {
    if (!socket) {
      return;
    }

    addEventListener(PRIVATE_MESSAGE_EVENT, handleReceivePrivateMessage);
    socket.emit(
      JOIN_CHATS_EVENT,
      {
        userId: me.id,
      },
      (ack: any) => {
        console.log(ack);
      }
    );
    // socket.emit(
    //   GET_CHATS,
    //   {
    //     userId: me.id,
    //   },
    //   (ack: { chats: PrivateMessageDTO[] }) => {
    //     // handleReceiveChats(ack.chats);
    //   }
    // );

    return () => {
      socket.emit(DETACH_CHATS_EVENT, {
        userId: me.id,
      });
      removeEventListener(PRIVATE_MESSAGE_EVENT);
    };
  }, [socket]);

  // const handleReceiveChats = useCallback((receivedChats: Map<number, Chat>) => {
  //   console.log('receivedChats');
  //   console.log(receivedChats);

  //   setChats(receivedChats);
  // }, []);

  const handleReceivePrivateMessage = useCallback((payload: ChatMessage) => {
    addMessageToChat(
      payload.id,
      payload.chatId,
      payload.fromId,
      payload.toId,
      payload.message
    );
  }, []);

  const handleSetActiveChat = (chatId: number) => {
    setActiveChat((prevActiveChat) => {
      const chat = chats.get(chatId);
      if (!chat) {
        return prevActiveChat;
      }
      const contact = contacts.get(chat.contactId);
      if (!contact) {
        return prevActiveChat;
      }
      return { chat, contact };
    });
  };

  const addMessageToChat = useCallback(
    (
      id: string,
      chatId: number,
      fromId: string,
      toId: string,
      message: string
    ) => {
      console.log(chats);
      const messageType = me.id === fromId ? 'outgoing' : 'incoming';
      const newMessage: ChatMessage = {
        id,
        chatId,
        fromId,
        toId,
        message,
        type: messageType,
      };

      setChats((prevChats) => {
        const newChats = new Map(prevChats);
        const chatToUpdate = prevChats.get(chatId);
        if (!chatToUpdate) {
          newChats.set(chatId, {
            id: chatId,
            contactId: me.id === fromId ? toId : fromId,
            messages: [newMessage],
          });
          return newChats;
        }

        const prevMessages = chatToUpdate.messages;
        const updatedChat = {
          ...chatToUpdate,
          messages: [...prevMessages, newMessage],
        };
        newChats.set(updatedChat.id, updatedChat);
        return newChats;
      });

      setActiveChat((prevActiveChat) => {
        if (!prevActiveChat || prevActiveChat.chat.id !== chatId) {
          return prevActiveChat;
        }
        const prevChat = prevActiveChat.chat;
        const updatedChat: Chat = {
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        };
        return { ...prevActiveChat, chat: updatedChat };
      });
    },
    [me, chats, contacts, activeChat]
  );

  const sendMessage = (chatId: number, toId: string, messageText: string) => {
    if (!socket) {
      console.error('Socket connection lost...');
      return;
    }
    const messageToSend: ChatMessage = {
      id: NO_ID,
      chatId,
      fromId: me.id,
      toId,
      message: messageText,
      type: 'outgoing',
    };
    const { status, failures } = validateMessage(
      messageToSend,
      chats,
      contacts,
      me
    );
    if (status === ValidationResultEnum.FAILURE) {
      failures?.forEach((failure) => {
        console.error(failure);
      });
      return;
    }
    socket.emit(
      PRIVATE_MESSAGE_EVENT,
      {
        chatId: messageToSend.chatId,
        fromId: messageToSend.fromId,
        toId: messageToSend.toId,
        message: messageToSend.message,
      },
      () => {
        addMessageToChat(
          messageToSend.id,
          messageToSend.chatId,
          messageToSend.fromId,
          messageToSend.toId,
          messageToSend.message
        );
      }
    );
  };

  const value = {
    me,
    chats,
    setChats,
    activeChat,
    setActiveChat: handleSetActiveChat,
    sendMessage,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
