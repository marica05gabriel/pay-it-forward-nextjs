import { DashBoardSVG } from "../../../icons/DashBoardSVG";
import { Item } from "./Item";
import { ComplexItem } from "./ComplexItem";
import { DELIVERABLES_SUB_MENU, PRODUCTS_SUB_MENU } from "../../const";
import { ProductsSVG } from "@/components/icons/ProductsSVG";
import { DeliverablesSVG } from "@/components/icons/DeliverablesSVG";

export const MenuList = () => (
  <ul className="f-m-m">
    <Item icon={<DashBoardSVG />} label="Dashboard" href="/" />
    <ComplexItem
      itemList={PRODUCTS_SUB_MENU}
      icon={<ProductsSVG />}
      label="Products"
      href="/"
    />
    <Item icon={<DashBoardSVG />} label="Performance123" href="/" />
    <ComplexItem
      itemList={DELIVERABLES_SUB_MENU}
      icon={<DeliverablesSVG />}
      label="Deliverables"
      href="/"
    />
  </ul>
);
