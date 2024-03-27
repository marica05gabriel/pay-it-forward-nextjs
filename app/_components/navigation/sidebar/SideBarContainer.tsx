import { ReactNode, RefObject } from "react";

interface PropsTest {
  children: ReactNode;
  sideBar: RefObject<HTMLDivElement>;
  sidebarHandler: (display: boolean) => void;
}
export const SideBarContainer = ({
  children,
  sideBar,
  sidebarHandler,
}: PropsTest) => {
  return (
    <div
      ref={sideBar}
      id="mobile-nav"
      className="w-full xl:hidden h-full absolute z-40"
      style={{ transform: "translateX(-100%)" }}
    >
      <div
        className="bg-gray-800 opacity-50 inset-0 fixed w-full h-full"
        onClick={() => sidebarHandler(false)}
      />
      {children}
    </div>
  );
};
