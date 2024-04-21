'use client';

import { useRef } from 'react';
import { NavBar } from './navbar/NavBar';
import { SideBar } from './sidebar/SideBar';
import { ROUTE_ITEMS } from '@/app/_utils/routes-util';

export const Navigation = () => {
  const sideBar = useRef<HTMLDivElement>(null);
  const cross = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLButtonElement>(null);

  const items = ROUTE_ITEMS;

  const sidebarHandler = (display: any) => {
    if (
      !(
        sideBar &&
        sideBar.current &&
        cross &&
        cross.current &&
        menu &&
        menu.current
      )
    ) {
      return;
    }
    if (display) {
      sideBar.current.style.transform = 'translateX(0px)';
      menu.current.classList.add('hidden');
      cross.current.classList.remove('hidden');
    } else {
      sideBar.current.style.transform = 'translateX(-100%)';
      menu.current.classList.remove('hidden');
      cross.current.classList.add('hidden');
    }
  };
  return (
    <>
      <SideBar
        items={items}
        sideBar={sideBar}
        cross={cross}
        sidebarHandler={sidebarHandler}
      />
      <NavBar items={items} menu={menu} sidebarHandler={sidebarHandler} />
    </>
  );
};
