import { ReactNode } from "react";
import { Label } from "./Label";
import { Icon } from "./Icon";

interface Props {
  icon: ReactNode;
  label: string;
  href: string;
}
export const Item = ({ icon, label, href }: Props) => (
  <ItemWrapper>
    <Icon>{icon}</Icon>
    <Label label={label} href={href} />
  </ItemWrapper>
);

interface ItemWrapperProps {
  children: ReactNode;
}
const ItemWrapper = ({ children }: ItemWrapperProps) => (
  <li className="text-white pt-8">
    <div className="flex items-center">{children}</div>
  </li>
);
