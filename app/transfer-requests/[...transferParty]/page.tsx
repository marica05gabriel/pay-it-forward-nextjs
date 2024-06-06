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

const TRANSFER_REQUESTS_URL = `${process.env.RESOURCE_SERVER_URL_TRANSFER}/request`;
const FIND_BOOKS_URL = `${process.env.RESOURCE_SERVER_URL_BOOK}`;

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

  const transferParty = params.transferParty[0];
  if (transferParty !== 'transferor' && transferParty !== 'transferee') {
    redirect(`${ROUTES[RoutesEnum.TRANSFER_REQUESTS]}/transferee`);
  }

  const currentRoute = RoutesEnum.TRANSFER_REQUESTS;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  console.log(username, transferParty);
  let response = await fetch(
    `${TRANSFER_REQUESTS_URL}/${transferParty}/${username}?page=${page - 1}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Coontent-Type': 'application/json',
      },
    }
  );
  console.log(response);
  if (response.status !== 200) {
    console.log('NOT OK');
  }

  let data = await response.json();
  console.log(data);
  let totalElements;
  let totalPages;
  let transferRequests: any = [];
  if (response.ok) {
    transferRequests = data.content;
    totalPages = data.page.totalPages;
    totalElements = data.page.totalElements;
  }

  let books: BookType[] = [];
  if (totalElements <= 0) {
    // if (totalElements > 0) {
    response = await fetch(`${FIND_BOOKS_URL}?page=${page - 1}&size=${size}`, {
      method: 'GET',
      headers: {
        'Coontent-Type': 'application/json',
        username,
      },
    });
    data = await response.json();
    if (response.ok) {
      books = data.content;
      totalPages = data.page.totalPages;
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
          'Coontent-Type': 'application/json',
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
        <>
          {transferParty} {username}
        </>
        <ListMyBooks
          books={books}
          additionalContent={(bookId) => (
            <RequestBookButton
              key={bookId}
              disabled={bookId % 2 == 0}
              label='Request book'
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
          redirectUrl={`${ROUTES[currentRoute]}/${transferParty}`}
        />
      </MainContainer>
    </>
  );
}
