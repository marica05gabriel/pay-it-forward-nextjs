'use client';

import { useRef } from 'react';
import { NavBar } from './navbar/NavBar';
import { SideBar } from './sidebar/SideBar';
import {
  NAVBAR_ROUTE_ITEMS,
  ROUTES,
  RoutesEnum,
} from '@/app/_utils/routes-util';

export const Navigation = () => {
  const sideBar = useRef<HTMLDivElement>(null);
  const cross = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLButtonElement>(null);

  const items = NAVBAR_ROUTE_ITEMS.map((route) => {
    if (
      ROUTES[RoutesEnum.TRANSFER_REQUESTS] === route.route ||
      ROUTES[RoutesEnum.BOOK_TRANSFERS] === route.route
    ) {
      route.route += '/transferee';
    }
    return route;
  });

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
