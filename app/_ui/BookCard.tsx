import { ReactNode } from 'react';
import { BookType } from '../_utils/types';
import Image from 'next/image';

interface BookCardProps {
  book: BookType;
  additionalContent?: ReactNode;
}
export const BookCard = ({ book, additionalContent }: BookCardProps) => {
  const {
    id,
    title,
    authors,
    description,
    categories,
    image,
    isbn13,
    isbn10,
    imageUrl,
  } = book;

  return (
    <div
      id={`book-${id}`}
      className='flex flex-col rounded-lg border bg-white p-4'
    >
      <div className='h-72'>
        <Image
          src={imageUrl ?? '/no-book-cover-available.png'}
          width={200}
          height={70}
          alt='Placeholder Image'
          className='h-full w-full rounded-md object-cover'
          priority={false}
          placeholder='blur'
          blurDataURL='/public/no-book-cover-available.png'
        />
      </div>
      <div className='h-80'>
        <div className='flex h-60 flex-col items-center px-1 py-4 align-middle'>
          <div className='text-l mb-2 h-20 overflow-hidden font-bold text-gray-900'>
            {title}
          </div>
          <div className='text-base text-gray-700'>
            {authors && (
              <p>
                <span>
                  <b>Authors: </b>
                </span>
                <span>{authors.toString()}</span>
              </p>
            )}

            {categories && (
              <p>
                <span>
                  <b>Categories: </b>
                </span>
                <span>{categories.toString()}</span>
              </p>
            )}

            {description && (
              <p>
                <span>
                  <b>Description: </b>
                </span>
                <span>{description}</span>
              </p>
            )}
          </div>
        </div>
        {!!additionalContent && additionalContent}
        <div className='height-auto px-1 py-10'>
          <a href='#' className='text-blue-500 hover:underline'>
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};
