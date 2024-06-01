import clsx from 'clsx';

interface Props {
  currentPage: number; // starts from 0
  pages: number[];
  pageSize?: number; // number of elements per page
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageChange: (newPage: number) => void;
}

export const PaginationComponent = ({
  currentPage,
  pages,
  onPrevPage,
  onNextPage,
  onPageChange,
}: Props) => (
  <div className='flex justify-center py-5'>
    <nav aria-label='Page navigation'>
      <ul className='list-style-none flex'>
        <li
          className={clsx(
            'page-item cursor-pointer',
            currentPage === pages[0] && 'disabled cursor-not-allowed'
          )}
        >
          <a
            className={clsx(
              'page-link relative block rounded border-0 bg-transparent px-3 py-1.5  outline-none transition-all duration-300  focus:shadow-none',
              currentPage === pages[0] && ' pointer-events-none text-gray-500',
              currentPage !== pages[0] &&
                ' text-gray-800 hover:bg-gray-200 hover:text-gray-800'
            )}
            onClick={onPrevPage}
            tabIndex={-1}
            aria-disabled={currentPage === pages[0]}
          >
            Previous
          </a>
        </li>
        {pages.map((page, index) => (
          <li
            className={clsx(
              'page-item cursor-pointer',
              page === currentPage && 'active'
            )}
            key={index}
          >
            <a
              className={clsx(
                'page-link relative block rounded  border-0 px-3 py-1.5 outline-none transition-all  duration-300',
                page !== currentPage &&
                  ' bg-transparent  text-gray-800  hover:bg-gray-200 hover:text-gray-800 focus:shadow-none',
                page === currentPage &&
                  ' bg-blue-600  text-white shadow-md  hover:bg-blue-600 hover:text-white focus:shadow-md'
              )}
              onClick={() => onPageChange(page)}
            >
              {page}
              {page === currentPage && <span className='visually-hidden' />}
            </a>
          </li>
        ))}

        <li
          className={clsx(
            'page-item cursor-pointer',
            currentPage === pages[pages.length - 1] &&
              'disabled cursor-not-allowed'
          )}
        >
          <a
            className={clsx(
              'page-link relative block rounded border-0 bg-transparent px-3 py-1.5  outline-none transition-all duration-300  focus:shadow-none',
              currentPage === pages[pages.length - 1] &&
                ' pointer-events-none text-gray-500',
              currentPage !== pages[pages.length - 1] &&
                ' text-gray-800 hover:bg-gray-200 hover:text-gray-800'
            )}
            onClick={onNextPage}
            aria-disabled={currentPage === pages[pages.length - 1]}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  </div>
);
