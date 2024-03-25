import { RefObject } from "react";

interface ChevronProps {
  chevronRef: RefObject<HTMLButtonElement>;
  onClick: (open: boolean) => void;
}
export const ChevronUpButton = ({ chevronRef, onClick }: ChevronProps) => {
  return (
    <button
      ref={chevronRef}
      id="chevronup"
      onClick={() => onClick(true)}
      className="ml-4 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
    >
      <img
        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_dark_page_title_and_white_box-svg3.svg"
        alt="up"
      />
    </button>
  );
};
