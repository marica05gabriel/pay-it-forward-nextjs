import { ReactNode, RefObject, useRef } from 'react';
import { SideBarContainer } from './SideBarContainer';
import { Header } from './header/Header';
import { MenuList } from './menu/MenuList';
import { Footer } from './footer/Footer';

interface Props {
  items: { label: string; route: string }[];
  sideBar: RefObject<HTMLDivElement>;
  cross: RefObject<HTMLButtonElement>;
  sidebarHandler: (display: boolean) => void;
}

export const SideBar = ({ items, sideBar, cross, sidebarHandler }: Props) => (
  <SideBarContainer sideBar={sideBar} sidebarHandler={sidebarHandler}>
    <div className='absolute left-0 top-0 z-40 h-full w-64 flex-col justify-between bg-white shadow transition duration-150 ease-in-out'>
      <div className='flex h-full flex-col justify-between'>
        <div className='overflow-y-auto px-6 pt-4'>
          <Header cross={cross} sidebarHandler={sidebarHandler} />
          <MenuList items={items} />
        </div>
        <Footer />
      </div>
    </div>
  </SideBarContainer>
);
