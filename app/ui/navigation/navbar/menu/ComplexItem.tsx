import { RefObject, useRef } from "react";
import { PRODUCTS_SUB_MENU, SubMenuList } from "../../const";

interface Props {
  label: string;
  itemList: SubMenuList;
  dropdownHandler: (ref: RefObject<any>) => void;
}

export const ComplexItem = ({ label, dropdownHandler, itemList }: Props) => {
  const productsDropDownRef = useRef<HTMLUListElement>(null);

  return (
    <li
      className="hover:text-indigo-700 cursor-pointer h-full flex items-center text-sm text-gry-800 mx-5 tracking-normal relative"
      onClick={() => dropdownHandler(productsDropDownRef)}
    >
      <InternalItem label={label} />
      <SubMenu subListRef={productsDropDownRef} itemList={itemList}/>
    </li>
  );
};

interface InternalItemProps {
  label: string;
}
const InternalItem = ({ label }: InternalItemProps) => {
  return (
    <a className="flex items-center">
      {label}
      <span className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevron-down"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </a>
  );
};

interface SubMenuProps {
  subListRef: RefObject<HTMLUListElement>;
  itemList: SubMenuList;
}
const SubMenu = ({ subListRef, itemList }: SubMenuProps) => (
  <ul
    ref={subListRef}
    className="bg-white shadow rounded py-1 w-40 left-0 mt-16 -ml-4 absolute hidden top-0"
  >
    {itemList.map((item) => (
      <li
        key={item.label}
        className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal"
      >
        <a href={item.href}>{item.label}</a>
      </li>
    ))}
  </ul>
);
