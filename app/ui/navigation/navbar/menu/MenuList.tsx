import { RefObject, useRef } from "react";
import { Item } from "./Item";
import { ComplexItem } from "./ComplexItem";
import { DELIVERABLES_SUB_MENU, MY_BOOKS_SUB_MENU, PRODUCTS_SUB_MENU } from "../../const";
import { ROUTES, RoutesEnum } from "@/app/lib/routes-util";

export const MenuList = () => {
  const single = useRef<HTMLUListElement>(null);
  const deliverablesDropDownRef = useRef<HTMLUListElement>(null);

  function dropdownHandler(ref: RefObject<HTMLUListElement>) {
    if (ref && ref.current) {
      ref.current.classList.toggle("hidden");
    }
  }
  return (
    <ul ref={single} className="pr-32 xl:flex hidden items-center h-full">
      <Item label="Find Boks" href={ROUTES[RoutesEnum.FIND_BOOKS]} isSelected={true} />
      {/* <Item label="Dashboard2" href="/" isSelected={false} /> */}
      <ComplexItem
        label="My Books"
        itemList={MY_BOOKS_SUB_MENU}
        dropdownHandler={dropdownHandler}
      />
      <Item label="Button 3" href="/" />
      <ComplexItem
        label="Complex Submenu button"
        itemList={DELIVERABLES_SUB_MENU}
        dropdownHandler={dropdownHandler}
      />
    </ul>
  );
};
