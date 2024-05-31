import Image from 'next/image';
import { InputForm } from './InputForm';

export const BookInfoForm = () => (
  <div className='mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2'>
    <div className='flex w-full flex-1 flex-col items-center justify-center gap-y-4'>
      <InputForm label='Book title' input='book-title' />
      <InputForm label='Author name' input='author-name' />
    </div>
    <div className='flex w-full justify-center'>
      <div className='w-52 justify-center'>
        <Image
          src='http://books.google.com/books/content?id=OeL8swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_ap'
          width={300}
          height={100}
          alt='Placeholder Image'
          className='w-full rounded-md object-cover'
          priority={false}
          placeholder='blur'
          blurDataURL='/public/no-book-cover-available.png'
        />
      </div>
    </div>
  </div>
);
