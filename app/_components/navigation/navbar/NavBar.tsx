import { useThirdWebContext } from '@/utils/context-providers';
import { RefObject } from 'react';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { MenuList } from './menu/MenuList';

interface Props {
  items: { label: string; route: string }[];
  menu: RefObject<HTMLButtonElement>;
  sidebarHandler: (display: boolean) => void;
}
export const NavBar = ({ menu, sidebarHandler, items }: Props) => {
  console.log('NavBar');
  const thirdWebContext = useThirdWebContext();

  if (thirdWebContext == null) {
    return <>Loading...</>;
  }

  return (
    <>
      <nav className='relative z-20 mx-auto w-full bg-white shadow'>
        <div className='container mx-auto flex h-16 items-center justify-between px-6 lg:items-stretch'>
          <div className='flex items-center'>
            <Header />
            <MenuList items={items} />
          </div>

          <Footer />
          <div className='visible flex items-center xl:hidden'>
            <div>
              <button
                ref={menu}
                id='menu'
                className='rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2'
                onClick={() => sidebarHandler(true)}
              >
                <img
                  src='https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_dark_page_title_and_white_box-svg7.svg'
                  alt='toggler'
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
