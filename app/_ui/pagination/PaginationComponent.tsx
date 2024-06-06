import clsx from 'clsx';
import _ from 'lodash';
import Link from 'next/link';

interface Props {
  currentPage: number;
  pages: number[];
  size: number;
  redirectUrl: string;
}

export const PaginationComponent = ({
  currentPage,
  pages,
  size,
  redirectUrl,
}: Props) => {
  return (
    <div className='flex justify-center py-5'>
      <nav aria-label='Page navigation'>
        <ul className='list-style-none flex'>
          <li
            key={`go_to_page${currentPage - 1}`}
            className={clsx(
              'page-item cursor-pointer',
              (currentPage === pages[0] || _.isEmpty(pages)) &&
                'disabled cursor-not-allowed'
            )}
          >
            <Link
              href={`${redirectUrl}?page=${currentPage - 1}&size=${size}`}
              className={clsx(
                'page-link relative block rounded border-0 bg-transparent px-3 py-1.5  outline-none transition-all duration-300  focus:shadow-none',
                (currentPage === pages[0] || _.isEmpty(pages)) &&
                  ' pointer-events-none text-gray-500',
                currentPage !== pages[0] &&
                  ' text-gray-800 hover:bg-gray-200 hover:text-gray-800'
              )}
              tabIndex={-1}
              aria-disabled={currentPage === pages[0]}
            >
              Previous
            </Link>
          </li>
          {pages.map((page, index) => (
            <li
              className={clsx(
                'page-item cursor-pointer',
                page === currentPage && 'active'
              )}
              key={index}
            >
              <Link
                key={page}
                href={`${redirectUrl}?page=${page}&size=${size}`}
                className={clsx(
                  'page-link relative block rounded  border-0 px-3 py-1.5 outline-none transition-all  duration-300',
                  page !== currentPage &&
                    ' bg-transparent  text-gray-800  hover:bg-gray-200 hover:text-gray-800 focus:shadow-none',
                  page === currentPage &&
                    ' bg-blue-600  text-white shadow-md  hover:bg-blue-600 hover:text-white focus:shadow-md'
                )}
              >
                {page}
                {page === currentPage && <span className='visually-hidden' />}
              </Link>
            </li>
          ))}

          <li
            className={clsx(
              'page-item cursor-pointer',
              (currentPage === pages[pages.length - 1] || _.isEmpty(pages)) &&
                'disabled cursor-not-allowed'
            )}
          >
            <Link
              href={`${redirectUrl}?page=${currentPage + 1}&size=${size}`}
              className={clsx(
                'page-link relative block rounded border-0 bg-transparent px-3 py-1.5  outline-none transition-all duration-300  focus:shadow-none',
                (currentPage === pages[pages.length - 1] || _.isEmpty(pages)) &&
                  ' pointer-events-none text-gray-500',
                currentPage !== pages[pages.length - 1] &&
                  ' text-gray-800 hover:bg-gray-200 hover:text-gray-800'
              )}
              aria-disabled={currentPage === pages[pages.length - 1]}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
