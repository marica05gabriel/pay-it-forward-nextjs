import { TitlePanel } from '@/components/panels/title-panel';
import { MainContainer } from '@/ui/MainContainer';
import { RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { ChatComponent } from '@/components/chat/ChatComponent';
import { ChatProvider } from '../_components/chat/context-providers/ChatProvider';
import { SocketProvider } from '../_components/chat/context-providers/SocketProvider';
import { getMeAsContact } from '../_components/chat/services/chatService';
import { ContactsProvider } from '../_components/chat/context-providers/ContactsProvider';

export default async function ChatPage() {
  const currentRoute = RoutesEnum.BOOK_TRANSFERS;
  const routeSettings = getRouteSettings(currentRoute);
  const me = getMeAsContact();
  console.log(RoutesEnum[currentRoute]);

  return (
    <ContactsProvider me={me}>
      <SocketProvider me={me}>
        <ChatProvider me={me}>
          <TitlePanel
            title={routeSettings.label}
            routeSegments={routeSettings.segments}
          />
          <MainContainer>
            <ChatComponent />
          </MainContainer>
        </ChatProvider>
      </SocketProvider>
    </ContactsProvider>
  );
}
