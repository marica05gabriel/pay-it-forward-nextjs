import { getParamOrDefault } from '@/app/_utils/search-params-utils';
import { ROUTES, RoutesEnum, getRouteSettings } from '../../_utils/routes-util';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  computePagesToDisplay,
} from '@/app/_utils/pagination-utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_utils/auth-utils';
import { redirect } from 'next/navigation';
import _ from 'lodash';
import { TitlePanel } from '@/app/_components/panels/title-panel';
import { MainContainer } from '@/app/_ui/MainContainer';
import { BookType } from '@/app/_utils/types';
import { ListMyBooks } from '@/app/_components/my-books/ListBooks';
import { PaginationComponent } from '@/app/_ui/pagination/PaginationComponent';
import { RequestBookButton } from '@/app/_ui/buttons/request-book-button';
import Link from 'next/link';

const TRANSFER_REQUESTS_URL = `${process.env.RESOURCE_SERVER_URL_TRANSFER}/request`;
const FIND_BOOKS_URL = `${process.env.RESOURCE_SERVER_URL_BOOK}`;

type TransferRequest = {
  id: string;
  createdAt: Date;
  from: string;
  fromPublicId: string;
  to: string;
  toPublicId: string;
  target: string;
  targetPublicId: string;
  status: 'PENDING' | 'CANCELED' | 'ACCEPTED' | 'REFUSED';
  consentDate: Date | null;
};

export default async function TransferRequestsPage({
  params,
  searchParams,
}: {
  params: { transferParty: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = getParamOrDefault(searchParams, 'page', DEFAULT_PAGE_NUMBER);
  const size = getParamOrDefault(searchParams, 'size', DEFAULT_PAGE_SIZE);

  const session = await getServerSession(authOptions);
  const username = session?.user?.name ?? '';
  if (!session || _.isEmpty(username)) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }

  const currentTransferParty = params.transferParty[0];
  if (
    currentTransferParty !== 'transferor' &&
    currentTransferParty !== 'transferee'
  ) {
    redirect(`${ROUTES[RoutesEnum.TRANSFER_REQUESTS]}/transferee`);
  }

  const currentRoute = RoutesEnum.TRANSFER_REQUESTS;
  const routeSettings = getRouteSettings(currentRoute);

  let response = await fetch(
    `${TRANSFER_REQUESTS_URL}/${currentTransferParty}/${username}?page=${page - 1}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  console.log(response);
  if (response.status !== 200) {
    console.error('NOT OK');
    console.log('Response');
  }

  let transferRequestsData = await response.json();
  console.log(transferRequestsData);
  let totalElements;
  let totalPages;
  let transferRequests: TransferRequest[] = [];
  if (response.ok) {
    transferRequests = transferRequestsData.content;
    totalPages = transferRequestsData.page.totalPages;
    totalElements = transferRequestsData.page.totalElements;
  }
  console.log('TR REQ');
  console.log(transferRequests);

  const bookIdList = transferRequests.map((tr) => tr.target);
  console.log('ID list');
  console.log(bookIdList);

  let books: BookType[] = [];
  if (totalElements > 0) {
    // if (totalElements > 0) {
    response = await fetch(
      `${FIND_BOOKS_URL}/byIdList?page=${page - 1}&size=${size}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idList: bookIdList }),
      }
    );
    console.log('By id list response:');
    console.log(response);
    const booksData = await response.json();
    if (response.ok) {
      books = booksData.content;
      totalPages = booksData.page.totalPages;
    }
    console.log(books);
  }

  const handleRequestBook = async (bookId: number) => {
    'use server';
    console.log(bookId, 'requested');
    const response = await fetch(
      `${FIND_BOOKS_URL}?page=${page - 1}&size=${size}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          username,
        },
      }
    );
    return { status: 'ok' };
  };

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <MainContainer>
        {currentTransferParty === 'transferee' && (
          <div className='row m-2 grid w-full grid-cols-2 grid-rows-1 justify-stretch gap-2 p-2'>
            <Link
              href={`${ROUTES[RoutesEnum.TRANSFER_REQUESTS]}/transferee`}
              type='button'
              className='mb-2 rounded-lg bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
            >
              Initiated by you
            </Link>
            <Link
              href={`${ROUTES[RoutesEnum.TRANSFER_REQUESTS]}/transferor`}
              type='button'
              className='mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
            >
              Waiting for your approval
            </Link>
          </div>
        )}

        {currentTransferParty === 'transferor' && (
          <div className='row m-2 grid w-full grid-cols-2 grid-rows-1 justify-stretch gap-2 p-2'>
            <Link
              href={`${ROUTES[RoutesEnum.TRANSFER_REQUESTS]}/transferee`}
              type='button'
              className='mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
            >
              Initiated by you
            </Link>
            <Link
              href={`${ROUTES[RoutesEnum.TRANSFER_REQUESTS]}/transferor`}
              type='button'
              className='mb-2 rounded-lg bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
            >
              Waiting for your approval
            </Link>
          </div>
        )}

        <ListMyBooks
          books={books}
          additionalContent={(bookId) => (
            <RequestBookButton
              key={bookId}
              disabled={bookId % 2 == 0}
              label='Request this book'
              onSubmit={async () => {
                'use server';
                const response = await handleRequestBook(bookId);
                return response;
              }}
            />
          )}
        />
        <PaginationComponent
          currentPage={page}
          pages={computePagesToDisplay(page, totalPages)}
          size={size}
          redirectUrl={`${ROUTES[currentRoute]}/${currentTransferParty}`}
        />
      </MainContainer>
    </>
  );
}
