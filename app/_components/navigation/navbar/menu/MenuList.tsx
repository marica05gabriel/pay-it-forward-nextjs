import { RefObject, useRef } from 'react';
import { Item } from './Item';
import { ComplexItem } from './ComplexItem';
import { DELIVERABLES_SUB_MENU, MY_BOOKS_SUB_MENU } from '../../const';
import { ROUTES, RoutesEnum } from '@/app/_utils/routes-util';

interface Props {
  items: {
    label: string;
    route: string;
  }[];
}
export const MenuList = ({ items }: Props) => {
  const single = useRef<HTMLUListElement>(null);

  function dropdownHandler(ref: RefObject<HTMLUListElement>) {
    if (ref && ref.current) {
      ref.current.classList.toggle('hidden');
    }
  }
  return (
    <ul ref={single} className='hidden h-full items-center pr-32 xl:flex'>
      {items.map((item) => (
        <Item
          key={item.route}
          label={item.label}
          href={item.route}
          isSelected={false}
        />
      ))}
    </ul>
  );
};
