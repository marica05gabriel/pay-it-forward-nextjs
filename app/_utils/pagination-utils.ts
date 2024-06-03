export const computePagesToDisplay = (page: number, totalPages: number) => {
  let result = [];
  if (page < 3) {
    result = [1, 2, 3];
  } else {
    result = [page - 1, page, page + 1];
  }

  return result.filter((page) => page <= totalPages);
};

export const DEFAULT_PAGE_SIZE = 8;
export const DEFAULT_PAGE_NUMBER = 1;
