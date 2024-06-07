import { TitlePanel } from '@/components/panels/title-panel';
import { MainContainer } from '@/ui/MainContainer';
import { ROUTES, RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { ChatComponent } from '@/components/chat/ChatComponent';
import { ChatProvider } from '../../_components/chat/context-providers/ChatProvider';
import { SocketProvider } from '../../_components/chat/context-providers/SocketProvider';
import { getMeAsContact } from '../../_components/chat/services/chatService';
import { ContactsProvider } from '../../_components/chat/context-providers/ContactsProvider';
import { getParamOrDefault } from '../../_utils/search-params-utils';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  computePagesToDisplay,
} from '../../_utils/pagination-utils';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../_utils/auth-utils';
import { redirect } from 'next/navigation';
import { BookType, TransferRequest } from '../../_utils/types';
import Link from 'next/link';
import { ListMyBooks } from '../../_components/my-books/ListBooks';
import { CancelBookRequestButton } from '../../_ui/buttons/cancel-book-request-button';
import {
  handleAcceptBookRequest,
  handleCancelBookRequest,
  handleRefuseBookRequest,
} from '../../_services/server-actions';
import { AcceptBookRequestButton } from '../../_ui/buttons/approve-book-request-button';
import { RefuseBookRequestButton } from '../../_ui/buttons/refuse-book-request-button';
import { PaginationComponent } from '../../_ui/pagination/PaginationComponent';
import _ from 'lodash';

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
    `${TRANSFERS_URL}/${currentTransferParty}/${username}?page=${page - 1}&size=${size}`,
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
  let transfers: TransferRequest[] = []; // TODO Transfer here, not TransferRequest
  if (response.ok) {
    transfers = transfersData.content;
    totalPages = transfersData.page.totalPages;
    totalElements = transfersData.page.totalElements;
  }
  console.log(transfers);

  const bookIdToTransferId = new Map<string, TransferRequest>();

  transfers.forEach((tr) => bookIdToTransferId.set(tr.target, tr));
  const bookIdList = transfers.map((tr) => tr.target);

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
          <div className='row grid w-full grid-cols-2 grid-rows-1 justify-stretch gap-2 p-2'>
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
          additionalContent={(bookId) =>
            currentTransferParty === 'transferee' ? (
              <CancelBookRequestButton
                key={bookId}
                disabled={bookId % 2 == 0}
                label='Cancel the request'
                onSubmit={async () => {
                  'use server';
                  const response = await handleCancelBookRequest(
                    bookId,
                    bookIdToTransferId
                  );
                  return response;
                }}
              />
            ) : (
              <div>
                <AcceptBookRequestButton
                  key={`${bookId}_approve_button`}
                  disabled={bookId % 2 == 0}
                  label='Accept request'
                  onSubmit={async () => {
                    'use server';
                    const response = await handleAcceptBookRequest(
                      bookId,
                      bookIdToTransferId
                    );
                    return response;
                  }}
                />
                <RefuseBookRequestButton
                  key={`${bookId}_refuse_button`}
                  disabled={bookId % 2 == 0}
                  label='Refuse request'
                  onSubmit={async () => {
                    'use server';
                    const response = await handleRefuseBookRequest(
                      bookId,
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
