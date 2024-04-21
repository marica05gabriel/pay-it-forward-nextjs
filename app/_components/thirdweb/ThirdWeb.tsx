'use client';

import { MintBookButton } from './MintBookButton';
import { ThirdWebConnectButton } from './ThirdWebConnectButton';

export const ThirdWeb = () => {
  console.log('ThirdWeb');

  const isbn = '9781643585345';
  const cid =
    'http://books.google.com/books/content?id=gE0wzAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api';

  return (
    <div className='text-black'>
      <div>ThirdWeb</div>
      <ThirdWebConnectButton />
      <div>
        <p>
          Mint book with isbn: {isbn} and cid: {cid}
        </p>
        <MintBookButton isbn={isbn} cid={cid} />
      </div>
    </div>
  );
};
