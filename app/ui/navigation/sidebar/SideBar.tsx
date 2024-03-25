import { ReactNode, RefObject, useRef } from "react";
import { SideBarContainer } from "./SideBarContainer";
import { Header } from "./header/Header";
import { MenuList } from "./menu/MenuList";
import { Footer } from "./footer/Footer";

interface Props {
  sideBar: RefObject<HTMLDivElement>;
  cross: RefObject<HTMLButtonElement>;
  sidebarHandler: (display: boolean) => void;
}

export const SideBar = ({ sideBar, cross, sidebarHandler }: Props) => (
  <SideBarContainer sideBar={sideBar} sidebarHandler={sidebarHandler}>
    <div className="w-64 z-40 absolute left-0 top-0 bg-white shadow flex-col justify-between transition duration-150 ease-in-out h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="px-6 pt-4 overflow-y-auto">
          <Header cross={cross} sidebarHandler={sidebarHandler} />
          <MenuList />
        </div>
        <Footer />
      </div>
    </div>
  </SideBarContainer>
);
