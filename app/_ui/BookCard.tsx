import { BookType } from '../_utils/types';
import Image from 'next/image';

interface BookCardProps {
  book: BookType;
}
export const BookCard = ({ book }: BookCardProps) => {
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
    <div id={`book-${id}`} className='rounded-lg border bg-white p-4'>
      <Image
        src={imageUrl ?? '/no-book-cover-available.png'}
        width={300}
        height={100}
        alt='Placeholder Image'
        className='w-full rounded-md object-cover'
        priority={false}
        placeholder='blur'
        blurDataURL='/public/no-book-cover-available.png'
      />
      <div className='h-80'>
        <div className='h-60 px-1 py-4'>
          <div className='text-l mb-2 h-20 font-bold text-gray-900'>
            {title}
          </div>
          <div className='text-base text-gray-700'>
            {title && (
              <p>
                <span>
                  <b>Title: </b>
                </span>
                <span>{title}</span>
              </p>
            )}

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
        <div className='height-auto px-1 py-10'>
          <a href='#' className='text-blue-500 hover:underline'>
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};
