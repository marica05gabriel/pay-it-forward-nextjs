import Link from 'next/link';
import Image from 'next/image';

export const Header = () => (
  <Link href='/'>
    <div aria-label='Home' className='mr-10 flex items-center'>
      <Image
        src='https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_dark_page_title_and_white_box-svg6.svg'
        alt='logo'
        width={50}
        height={50}
      />
      <h3 className='ml-3 hidden text-base font-bold leading-tight tracking-normal text-gray-800 lg:block'>
        Pay it forward
      </h3>
    </div>
  </Link>
);
