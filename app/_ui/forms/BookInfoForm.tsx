import Image from 'next/image';
import { InputForm } from './InputForm';
import { Book } from './EnrollBookForm';

export const BookInfoForm = ({ authors, imageUrl, isbn13, title }: Book) => {
  return (
    <div className='mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2'>
      <div className='flex w-full flex-1 flex-col items-center justify-center gap-y-4'>
        <InputForm label='Title' input={title} />
        <InputForm label='Author(s)' input={authors} />
      </div>
      <div className='flex w-full justify-center'>
        <div className='w-52 justify-center'>
          <Image
            src={imageUrl}
            width={300}
            height={100}
            alt='No book cover available'
            className='w-full rounded-md object-cover'
            priority={false}
            placeholder='blur'
            blurDataURL='/public/no-book-cover-available.png'
          />
        </div>
      </div>
    </div>
  );
};
