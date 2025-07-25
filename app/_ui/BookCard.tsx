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
    isbn13,
    imageUrl,
    currentLocation,
    currentOwner,
  } = book;

  return (
    <div
      id={`book-${id}-isbn13-${isbn13}`}
      className='h-90 flex flex-col rounded-lg border bg-white p-4'
    >
      <div className='h-72'>
        <div className='relative h-full w-full'>
          <Image
            src={imageUrl ?? '/no-book-cover-available.png'}
            // width={200}
            // height={70}
            fill
            objectFit='contain'
            alt='Placeholder Image'
            className='h-full w-full rounded-md object-cover'
            priority={false}
            placeholder='blur'
            blurDataURL='/public/no-book-cover-available.png'
          />
        </div>
      </div>
      <div className='h-80'>
        <div className='flex h-80 flex-col items-center px-1 py-4 align-middle'>
          <div
            className='text-l my-2 flex h-20 justify-center overflow-hidden font-bold text-gray-900'
            title={title}
          >
            <p className='items-center justify-center'>{title}</p>
          </div>
          <div
            className='w-full text-base text-gray-700'
            title={`Authors of book ${book.id} ISBN ${book.isbn13}`}
          >
            <div
              title={`Book with isbn ${book.isbn13} is ${book.availabilityStatus}`}
              className='flex w-full flex-row items-center gap-2'
            >
              <b>
                <u>Status</u>:
              </b>
              {book.availabilityStatus !== 'AVAILABLE' && (
                <span className='me-3 flex h-3 w-3 rounded-full bg-red-500'></span>
              )}
              {book.availabilityStatus === 'AVAILABLE' && (
                <span className='me-3 flex h-3 w-3 rounded-full bg-green-500'></span>
              )}
            </div>
            {authors && (
              <p className='max-h-40 overflow-hidden'>
                <span>
                  <b>
                    <u>Authors</u>:{' '}
                  </b>
                </span>
                <span title={authors.toString()}>{authors.toString()}</span>
              </p>
            )}
          </div>

          <div
            id={`current_owner_of_book_${book.id}_isbn_${book.isbn13}`}
            className=' w-full items-start align-top text-base text-gray-700'
            title={`Current Owner of book ${book.id} ISBN ${book.isbn13}`}
          >
            {currentOwner && (
              <p className='items-start align-top'>
                <span>
                  <b>
                    <u>Owner</u>:{' '}
                  </b>
                </span>
                <span id={`current-owner-of-${book.id}`} title={currentOwner}>
                  {currentOwner}
                </span>
              </p>
            )}
          </div>

          <div
            id={`location_of_book-${book.id}-isbn-${book.isbn13}`}
            className=' w-full  py-2 align-top text-base text-gray-700'
            title={`Location of book ${book.id} ISBN ${book.isbn13}`}
          >
            {currentLocation && (
              <p>
                <span
                  className='justify-center'
                  id={`current-owner-of-${book.id}`}
                  title={`${currentLocation.city}, ${currentLocation.country}`}
                >
                  <i className='justify-center'>{`${currentLocation.city}`}</i>
                </span>
              </p>
            )}
          </div>

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
      <div className='height-auto mt-2 flex items-end justify-center p-1'>
        <a href='#' className='text-blue-500 hover:underline'>
          Read More
        </a>
      </div>
    </div>
  );
};
