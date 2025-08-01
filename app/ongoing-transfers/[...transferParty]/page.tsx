import { TitlePanel } from '@/components/panels/title-panel';
import { MainContainer } from '@/ui/MainContainer';
import { ROUTES, RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { getParamOrDefault } from '../../_utils/search-params-utils';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  computePagesToDisplay,
} from '../../_utils/pagination-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../_utils/auth-utils';
import { redirect } from 'next/navigation';
import { BookTransfer, BookType } from '../../_utils/types';
import Link from 'next/link';
import { ListMyBooks } from '../../_components/my-books/ListBooks';
import { handleCancelTransfer } from '../../_services/server-actions';
import { PaginationComponent } from '../../_ui/pagination/PaginationComponent';
import _ from 'lodash';
import { CancelTransferButton } from '@/app/_ui/buttons/cancel-transfer-button';
import { GenerateSignatureButton } from '@/app/_ui/buttons/generate-signature-button';

const TRANSFERS_URL = `${process.env.RESOURCE_SERVER_URL_TRANSFER}`;
const FIND_BOOKS_URL = `${process.env.RESOURCE_SERVER_URL_BOOK}`;

export default async function OngoingTransfersPage({
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
    redirect(`${ROUTES[RoutesEnum.BOOK_TRANSFERS]}/transferee`);
  }

  const currentRoute = RoutesEnum.BOOK_TRANSFERS;
  const routeSettings = getRouteSettings(currentRoute);

  let response = await fetch(
    // `${TRANSFERS_URL}/${currentTransferParty}/${username}?page=${page - 1}&size=${size}`,
    `${TRANSFERS_URL}/${currentTransferParty}/${username}?page=${page - 1}&size=50`,
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

  let transfersData = await response.json();
  console.log(transfersData);
  let totalElements;
  let totalPages;
  let transfers: BookTransfer[] = [];
  if (response.ok) {
    transfers = transfersData.content;
    totalPages = transfersData.page.totalPages;
    totalElements = transfersData.page.totalElements;
  }
  console.log(transfers);

  const bookIdToTransferId = new Map<string, BookTransfer>();

  transfers.forEach((tr) => bookIdToTransferId.set(tr.target, tr));
  const pendingTransfers = transfers.filter((t) => t.status === 'PENDING');
  console.log('TRANSFERS');
  console.log(transfers);
  console.log('PENDING TRANSFERS');
  console.log(pendingTransfers);

  const bookIdList = pendingTransfers.map((tr) => tr.target);

  console.log('ID list');
  console.log(bookIdList);

  let books: BookType[] = [];
  if (totalElements > 0) {
    response = await fetch(
      // `${FIND_BOOKS_URL}/byIdList?page=${page - 1}&size=${size}`,
      `${FIND_BOOKS_URL}/byIdList?page=${page - 1}&size=50`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idList: bookIdList }),
      }
    );
    const booksData = await response.json();
    if (response.ok) {
      books = booksData.content;
      totalPages = booksData.page.totalPages;
    }
    console.log(books);
  }

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <MainContainer>
        {currentTransferParty === 'transferee' && (
          <div className='row grid w-full grid-cols-2 grid-rows-1 justify-stretch gap-2 p-2'>
            <Link
              href={`${ROUTES[RoutesEnum.BOOK_TRANSFERS]}/transferee`}
              type='button'
              className='mb-2 rounded-lg bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
            >
              Initiated by you
            </Link>
            <Link
              href={`${ROUTES[RoutesEnum.BOOK_TRANSFERS]}/transferor`}
              type='button'
              className='mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
            >
              Waiting for your validation
            </Link>
          </div>
        )}

        {currentTransferParty === 'transferor' && (
          <div className='row grid w-full grid-cols-2 grid-rows-1 justify-stretch gap-2 p-2'>
            <Link
              href={`${ROUTES[RoutesEnum.BOOK_TRANSFERS]}/transferee`}
              type='button'
              className='mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'
            >
              Initiated by you
            </Link>
            <Link
              href={`${ROUTES[RoutesEnum.BOOK_TRANSFERS]}/transferor`}
              type='button'
              className='mb-2 rounded-lg bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
            >
              Waiting for your validation
            </Link>
          </div>
        )}

        <ListMyBooks
          books={books}
          additionalContent={(book) =>
            currentTransferParty === 'transferee' ? (
              <>
                <GenerateSignatureButton
                  label='Generate sinature'
                  transferId={bookIdToTransferId.get(String(book.id))!.id}
                />
                <CancelTransferButton
                  key={book.id}
                  label='Cancel ongoing transfer'
                  onSubmit={async () => {
                    'use server';
                    const response = await handleCancelTransfer(
                      book.id,
                      bookIdToTransferId
                    );
                    return response;
                  }}
                />
              </>
            ) : (
              <div>
                <CancelTransferButton
                  key={book.id}
                  label='Cancel ongoing transfer'
                  onSubmit={async () => {
                    'use server';
                    const response = await handleCancelTransfer(
                      book.id,
                      bookIdToTransferId
                    );
                    return response;
                  }}
                />
              </div>
            )
          }
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
