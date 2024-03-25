import clsx from "clsx";
import { ReactNode, RefObject, useRef } from "react";
import { ChevronDownButton } from "../../common/ChevronDownButton";
import { ChevronUpButton } from "../../common/ChevronUpButton";
import { SubMenuList } from "../../const";
import { Icon } from "./Icon";
import { Label } from "./Label";

interface Props {
  icon: ReactNode;
  label: string;
  href: string;
  itemList: SubMenuList;
}
export const ComplexItem = ({ icon, label, href, itemList }: Props) => {
  const list = useRef<HTMLDivElement>(null);
  const chevrondown = useRef<HTMLButtonElement>(null);
  const chevronup = useRef<HTMLButtonElement>(null);

  const handleOpenSubMenu = (open: boolean) => {
    console.log("[MobileNavBarComplexElement] Client element");
    if (
      !(
        list &&
        list.current &&
        chevrondown &&
        chevrondown.current &&
        chevronup &&
        chevronup.current
      )
    ) {
      return;
    }

    if (open) {
      list.current.classList.remove("hidden");
      chevrondown.current.classList.remove("hidden");
      chevronup.current.classList.add("hidden");
    } else {
      list.current.classList.add("hidden");
      chevrondown.current.classList.add("hidden");
      chevronup.current.classList.remove("hidden");
    }
  };

  return (
    <li className="text-gray-700 pt-8">
      <InternalItem
        icon={icon}
        label={label}
        href={href}
        chevronup={chevronup}
        chevrondown={chevrondown}
        handleOpenSubMenu={handleOpenSubMenu}
      />
      <SubMenu subMenuRef={list} itemList={itemList} />
    </li>
  );
};

interface ItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  chevronup: RefObject<HTMLButtonElement>;
  chevrondown: RefObject<HTMLButtonElement>;
  handleOpenSubMenu: (open: boolean) => void;
}
const InternalItem = ({
  icon,
  label,
  href,
  chevronup,
  chevrondown,
  handleOpenSubMenu,
}: ItemProps) => (
  <div className="flex items-center">
    <div className="flex items-center">
      <Icon>{icon}</Icon>
      <Label label={label} href={href} />
    </div>
    <ChevronUpButton chevronRef={chevronup} onClick={handleOpenSubMenu} />
    <ChevronDownButton chevronRef={chevrondown} onClick={handleOpenSubMenu} />
  </div>
);

interface SubMenuProps {
  subMenuRef: RefObject<HTMLDivElement>;
  itemList: SubMenuList;
}
const SubMenu = ({ subMenuRef, itemList }: SubMenuProps) => {
  return (
    <div ref={subMenuRef} id="list" className="hidden">
      <ul className="my-3">
        {itemList.map((item) => (
          <li
            key={item.label}
            className={clsx(
              "text-sm  py-2 px-6 hover:text-indigo-500",
              item.isSelected && "text-indigo-500",
              !item.isSelected && "text-gray-800"
            )}
          >
            <a href={item.href}> {item.label} </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
