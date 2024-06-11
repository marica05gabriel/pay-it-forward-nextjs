import { TitlePanel } from '@/components/panels/title-panel';
import { MainContainer } from '@/ui/MainContainer';
import { ROUTES, RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { ChatComponent } from '@/components/chat/ChatComponent';
import { ChatProvider } from '../_components/chat/context-providers/ChatProvider';
import { SocketProvider } from '../_components/chat/context-providers/SocketProvider';
import { getMeAsContact } from '../_components/chat/services/chatService';
import { ContactsProvider } from '../_components/chat/context-providers/ContactsProvider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../_utils/auth-utils';
import { redirect } from 'next/navigation';
import _ from 'lodash';
import {
  BookTransfer,
  Chat,
  ChatContact,
  ChatMessage,
  Message,
} from '../_utils/types';
import { REST_SERVER_URL } from '../_components/chat/context-providers/constants';
import { createAvatar } from '@dicebear/core';
import { adventurerNeutral, funEmoji, initials } from '@dicebear/collection';

const TRANSFERS_URL = `${process.env.RESOURCE_SERVER_URL_TRANSFER}`;
const CHAT_SERVER_URL = REST_SERVER_URL;

export default async function ChatPage() {
  const currentRoute = RoutesEnum.BOOK_TRANSFERS;
  const routeSettings = getRouteSettings(currentRoute);

  const session = await getServerSession(authOptions);
  const username = session?.user?.name ?? '';
  if (!session || _.isEmpty(username)) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }

  let response = await fetch(`${TRANSFERS_URL}/byUser/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) {
    console.error('NOT OK');
    console.error('Response');
  }
  let transfersData: BookTransfer[] = await response.json();

  const chatContacts = new Map<string, ChatContact>();
  const withUsers = new Set<string>();

  transfersData.forEach((t) => {
    const contactId = t.from === username ? t.to : t.from;
    const contact: ChatContact = {
      id: contactId,
      nickname: contactId,
      avatar: createAvatar(funEmoji, {
        seed: contactId,
      }).toDataUriSync(),
    };
    chatContacts.set(contactId, contact);
    withUsers.add(contactId);
  });
  const body = JSON.stringify({ ids: Array.from(withUsers) });

  response = await fetch(`${CHAT_SERVER_URL}/chatWith/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  const chatResponseData: {
    chats: {
      id: number;
      userId1: string;
      userId2: string;
      messages: ChatMessage[];
    }[];
  } = await response.json();
  console.log(chatResponseData);
  const chatList = new Map<number, Chat>();
  chatResponseData.chats.forEach((chat) => {
    chatList.set(chat.id, {
      id: chat.id,
      contactId: username === chat.userId1 ? chat.userId2 : chat.userId1,
      messages: chat.messages,
    });
  });

  const me: ChatContact = {
    id: username,
    nickname: username,
    avatar: createAvatar(funEmoji, {
      seed: username,
    }).toDataUriSync(),
  };
  return (
    <ContactsProvider me={me}>
      <SocketProvider me={me}>
        <ChatProvider me={me}>
          <TitlePanel
            title={routeSettings.label}
            routeSegments={routeSettings.segments}
          />
          <MainContainer>
            <ChatComponent chats={chatList} contactList={chatContacts} />
          </MainContainer>
        </ChatProvider>
      </SocketProvider>
    </ContactsProvider>
  );
}
