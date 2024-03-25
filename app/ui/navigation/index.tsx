import { ReactNode } from "react";
import { FindBooksDashboard } from "../find-books/FindBooksDashboard";
import clsx from "clsx";

const isOverlapping = true;

interface Props {
  children: ReactNode;
}
export const TUKPage = ({children}: Props) => {
  console.log("Inside TUKPage")
  return (
    <>
      <FindBooksDashboard />
      <div className="container px-6 mx-auto">
        <div
          className={clsx(
            "rounded shadow relative bg-white z-10 -mt-8 mb-8 w-full h-64",
            isOverlapping && "-mt-8",
            !isOverlapping && "mt-4"
          )}
        >
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};
