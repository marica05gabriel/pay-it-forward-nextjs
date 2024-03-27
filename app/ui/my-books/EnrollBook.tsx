import clsx from "clsx";
import { TitlePanel } from "../panels/title-panel";
import { ROUTES, RoutesEnum } from "@/app/lib/routes-util";

const isOverlapping = true;
export const EnrollBook = () => {
  const routeSegments = ROUTES[RoutesEnum.ENROLL_BOOK].split("/");
  routeSegments.shift();
  return (
    <>
      <TitlePanel title="Enroll your books" routeSegments={routeSegments} />

      <div className="container px-6 mx-auto text-gray-800">
        <div
          className={clsx(
            "rounded shadow relative bg-white z-10 -mt-8 mb-8 w-full h-64",
            isOverlapping && "-mt-8",
            !isOverlapping && "mt-4"
          )}
        >
          <div>
            <div>On this page you can enroll books in the platform</div>
            <li>
              The enroll will be done by minting an PaperBookNFT which is an
              ERC1155 token.
            </li>
            <li>
              A form will be present and the user should fill in the data.
            </li>
          </div>
        </div>
      </div>
    </>
  );
};
