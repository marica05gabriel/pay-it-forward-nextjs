import { RefObject } from "react";

interface MobileNavBarHeaderProps {
    cross: RefObject<HTMLButtonElement>;
    sidebarHandler: (display: boolean) => void;
  }
export const Header = ({
    cross,
    sidebarHandler,
  }: MobileNavBarHeaderProps) => {
    return (
      <div className="flex items-center justify-between">
        <div aria-label="Home" role="img" className="flex items-center">
          <img
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_dark_page_title_and_white_box-svg6.svg"
            alt="logo"
          />
          <p className="text-bold md:text2xlf text-base pl-3 text-gray-800">
            The North
          </p>
        </div>
        <button
          ref={cross}
          id="cross"
          className="hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded"
          onClick={() => sidebarHandler(false)}
        >
          <img
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_dark_page_title_and_white_box-svg1.svg"
            alt="cross"
          />
        </button>
      </div>
    );
  };