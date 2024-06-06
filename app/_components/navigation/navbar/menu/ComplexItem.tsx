import { RefObject, useRef } from 'react';
import { SubMenuList } from '../../const';

interface Props {
  label: string;
  itemList: SubMenuList;
  dropdownHandler: (ref: RefObject<any>) => void;
}

export const ComplexItem = ({ label, dropdownHandler, itemList }: Props) => {
  const productsDropDownRef = useRef<HTMLUListElement>(null);

  return (
    <li
      className='text-gry-800 relative mx-5 flex h-full cursor-pointer items-center text-sm tracking-normal hover:text-indigo-700'
      onClick={() => dropdownHandler(productsDropDownRef)}
    >
      <InternalItem label={label} />
      <SubMenu subListRef={productsDropDownRef} itemList={itemList} />
    </li>
  );
};

interface InternalItemProps {
  label: string;
}
const InternalItem = ({ label }: InternalItemProps) => {
  return (
    <a className='flex items-center text-gray-800'>
      {label}
      <span className='ml-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-chevron-down'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' />
          <polyline points='6 9 12 15 18 9' />
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
    className='absolute left-0 top-0 -ml-4 mt-16 hidden w-40 rounded bg-white py-1 shadow'
  >
    {itemList.map((item) => (
      <li
        key={item.label}
        className='cursor-pointer px-3 py-3 text-sm font-normal leading-3 tracking-normal text-gray-800 hover:bg-indigo-700 hover:text-white'
      >
        <a href={item.href}>{item.label}</a>
      </li>
    ))}
  </ul>
);
