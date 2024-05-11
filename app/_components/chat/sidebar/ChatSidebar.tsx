import { ChatContactList } from './components/ChatContactList';
import { SidebarContainer } from './container/SidebarContainer';
import { Header } from './components/Header';

export const ChatSidebar = () => {
  return (
    <SidebarContainer>
      <Header title='Chat Web' />
      <ChatContactList />
    </SidebarContainer>
  );
};
