import { toCapitalCase } from "@/app/_utils/string-utils";
import Link from "next/link";

interface Props {
  title: string;
  routeSegments: string[];
}
export const TitlePanel = ({ title, routeSegments }: Props) => {
  let composeRoutes = "";
  return (
    <div className="bg-gray-800 pt-8 pb-16 relative z-10">
      <div className="container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className="flex-col flex lg:flex-row items-start lg:items-center">
          <div className="ml-0 lg:ml-20 my-6 lg:my-0">
            <h4 className="text-2xl font-bold leading-tight text-white mb-2">
              {title}
            </h4>
            <p className="flex items-center text-gray-300 text-xs">
              {routeSegments.map((segment, index) => {
                composeRoutes = composeRoutes.concat('/').concat(segment)
                return (
                  <Link href={composeRoutes} key={index}>
                    <span className="mx-2">&gt;</span>
                    <span className="cursor-pointer">{toCapitalCase(segment)}</span>
                  </Link>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
