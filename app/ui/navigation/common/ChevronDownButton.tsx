import { RefObject } from "react";

interface ChevronProps {
  chevronRef: RefObject<HTMLButtonElement>;
  onClick: (open: boolean) => void;
}
export const ChevronDownButton = ({ chevronRef, onClick }: ChevronProps) => {
  return (
    <button
      ref={chevronRef}
      id="chevrondown"
      onClick={() => onClick(false)}
      className="hidden ml-4 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
    >
      <img
        className="transform rotate-180"
        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_dark_page_title_and_white_box-svg3.svg"
        alt="down"
      />
    </button>
  );
};
