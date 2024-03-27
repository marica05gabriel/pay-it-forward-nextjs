import { ROUTES, RoutesEnum } from "@/app/lib/routes-util";

export type SubMenuList = SubMenuItem[];

export type SubMenuItem = {
  label: string;
  href: string;
  isSelected?: boolean;
};

export const MY_BOOKS_SUB_MENU: SubMenuList = [
  {
    label: "Enroll a book",
    href: ROUTES[RoutesEnum.ENROLL_BOOK],
    isSelected: true,
  },
  {
    label: "My Books",
    href: ROUTES[RoutesEnum.MY_BOOKS],
    isSelected: false,
  }
];

export const PRODUCTS_SUB_MENU: SubMenuList = [
  {
    label: "BestSellers 123",
    href: "/",
    isSelected: true,
  },
  {
    label: "Out of Stock",
    href: "/",
    isSelected: false,
  },
  {
    label: "New Products",
    href: "/",
  },
  {
    label: "New Products 223",
    href: "/",
  },
];

export const DELIVERABLES_SUB_MENU: SubMenuList = [
  {
    label: "Best Sellers",
    href: "/",
    isSelected: true,
  },
  {
    label: "Out of Stock",
    href: "/",
    isSelected: false,
  },
  {
    label: "New Products",
    href: "/",
  },
];
