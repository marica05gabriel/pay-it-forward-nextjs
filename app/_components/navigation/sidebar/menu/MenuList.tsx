import { DashBoardSVG } from '../../../icons/DashBoardSVG';
import { Item } from './Item';

interface Props {
  items: { label: string; route: string }[];
}
export const MenuList = ({ items }: Props) => (
  <ul className='f-m-m'>
    {items.map((item) => (
      <Item
        key={item.route}
        label={item.label}
        href={item.route}
        icon={<DashBoardSVG />}
      />
    ))}
  </ul>
);
