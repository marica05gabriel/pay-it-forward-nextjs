import { PaperBookListWrapper, readBooks } from "@/app/_utils/testData";
import clsx from "clsx";
import { TitlePanel } from "../panels/title-panel";
import { ROUTES, RoutesEnum } from "@/app/_utils/routes-util";

const isOverlapping = true;
export const ListBooks = () => {
  const routeSegments = ROUTES[RoutesEnum.MY_BOOKS].split("/");
  routeSegments.shift();

  return (
    <>
      <TitlePanel
        title="Here you can see your books"
        routeSegments={routeSegments}
      />
      <div className="container px-6 mx-auto text-gray-800">
        <div
          className={clsx(
            "rounded shadow relative bg-white z-10 -mt-8 mb-8 w-full h-64",
            isOverlapping && "-mt-8",
            !isOverlapping && "mt-4"
          )}
        >
          <div>The listing page of the books owned by the user.</div>
        </div>
      </div>
    </>
  );
};
