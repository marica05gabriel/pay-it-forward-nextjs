import { RefObject, useRef } from "react";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { MenuList } from "./menu/MenuList";

interface Props {
  menu: RefObject<HTMLButtonElement>;
  sidebarHandler: (display: boolean) => void;
}
export const NavBar = ({ menu, sidebarHandler }: Props) => {
 

  function dropdownHandler(ref: RefObject<HTMLUListElement>) {
    if (ref && ref.current) {
      ref.current.classList.toggle("hidden");
    }
  }
  return (
    <>
      <nav className="w-full mx-auto bg-white shadow relative z-20">
        <div className="justify-between container px-6 h-16 flex items-center lg:items-stretch mx-auto">
          <div className="flex items-center">
            <Header />
            <MenuList/>
          </div>

          <Footer />

          <div className="visible xl:hidden flex items-center">
            <div>
              <button
                ref={menu}
                id="menu"
                className="text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                onClick={() => sidebarHandler(true)}
              >
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_dark_page_title_and_white_box-svg7.svg"
                  alt="toggler"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
