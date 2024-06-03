'use client';

import { PaginationComponent } from '@/ui/pagination/PaginationComponent';
import { usePagination } from '@/ui/pagination/hooks/usePagination';
import { ReactNode, useEffect, useMemo, useState } from 'react';

interface Props {
  bookListing: (page: number, size: number) => ReactNode;
}
export const BookListingWrapper = ({ bookListing }: Props) => {
  const { page, size, onPageChange } = usePagination();
  const [bookListingComponent, setBookListingComponent] = useState<ReactNode>();
  const formattedPage = page + 1;
  const [isLoading, setLoading] = useState(true);

  const computePages = useMemo(() => {
    if (page <= 1) {
      return [1, 2, 3];
    }
    return [formattedPage - 1, formattedPage, formattedPage + 1];
  }, [page]);

  useEffect(() => {
    setLoading(true);
    const updatedPage = bookListing(page, size);
    setBookListingComponent(updatedPage);
    setLoading(false);
  }, [page]);

  if (isLoading) {
    return (
      <>
        <div className='justify-center py-20 text-center'>Loading</div>
        {/* 
        <PaginationComponent
          currentPage={formattedPage}
          pages={computePages}
          onPrevPage={() => onPageChange(page - 1)}
          onNextPage={() => onPageChange(page + 1)}
          onPageChange={(newPage: number) => onPageChange(newPage - 1)}
        /> */}
      </>
    );
  }
  return (
    <>
      {!!bookListingComponent && bookListingComponent}
      {/* <PaginationComponent
        currentPage={formattedPage}
        pages={computePages}
        onPrevPage={() => onPageChange(page - 1)}
        onNextPage={() => onPageChange(page + 1)}
        onPageChange={(newPage: number) => onPageChange(newPage - 1)}
      /> */}
    </>
  );
};
