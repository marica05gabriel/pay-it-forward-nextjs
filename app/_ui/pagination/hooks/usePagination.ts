'use client';
import { useState } from 'react';

export const usePagination = () => {
  const size = 10;
  const [page, setPage] = useState(0);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  return { page, size, onPageChange };
};
