import { TitlePanel } from '@/components/panels/title-panel';
import { TUKPage } from '@/ui/TUKPage';
import { RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { ChatComponent } from '@/components/chat/ChatComponent';
import { ChatProvider } from '../_components/chat/context-providers/ChatProvider';
import { SocketProvider } from '../_components/chat/context-providers/SocketProvider';
import { getMeAsContact } from '../_components/chat/services/chatService';
import { ContactsProvider } from '../_components/chat/context-providers/ContactsProvider';

export default async function OngoingTransfersPage() {
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
          <TUKPage>
            <ChatComponent />
          </TUKPage>
        </ChatProvider>
      </SocketProvider>
    </ContactsProvider>
  );
}
