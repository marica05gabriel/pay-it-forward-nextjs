import { TitlePanel } from '@/components/panels/title-panel';
import { MainContainer } from '@/ui/MainContainer';
import { ROUTES, RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { getParamOrDefault } from '../_utils/search-params-utils';
import { ListMyBooks } from '../_components/my-books/ListBooks';
import { PaginationComponent } from '../_ui/pagination/PaginationComponent';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../_utils/auth-utils';
import { BookType } from '../_utils/types';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  computePagesToDisplay,
} from '../_utils/pagination-utils';
import { SelectLocationForm } from './SelectLocationForm';
import { RequestBookButton } from '../_ui/buttons/request-book-button';
import { handleRequestBook } from '../_services/server-actions';

const FIND_BOOKS_URL = `${process.env.RESOURCE_SERVER_URL_BOOK}`;

export default async function FindBooksPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentRoute = RoutesEnum.FIND_BOOKS;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  const page = getParamOrDefault(searchParams, 'page', DEFAULT_PAGE_NUMBER);
  const size = getParamOrDefault(searchParams, 'size', DEFAULT_PAGE_SIZE);
  const locationId = getParamOrDefault(searchParams, 'locationId', -1);
  console.log('FETCH TO: ' + FIND_BOOKS_URL);

  const session = await getServerSession(authOptions);
  const username = session?.user?.name ?? '';
  const locationSearchParam =
    locationId != -1 ? `&locationId=${locationId}` : '';

  console.log(username, locationSearchParam);
  const response = await fetch(
    `${FIND_BOOKS_URL}?page=${page - 1}&size=${size}${locationSearchParam}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        username,
      },
    }
  );
  const data = await response.json();
  let totalPages;
  let books: BookType[] = [];
  if (response.ok) {
    books = data.content;
    totalPages = data.page.totalPages;
  }
  console.log(books);
  books.sort(
    (book1, book2) =>
      book1.availabilityStatus.length - book2.availabilityStatus.length
  );

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <MainContainer>
        <SelectLocationForm />
        <ListMyBooks
          books={books}
          additionalContent={(book) => (
            <RequestBookButton
              key={book.id}
              disabled={book.availabilityStatus === 'NOT_AVAILABLE'}
              label='Request this book'
              onSubmit={async (walletAddress) => {
                'use server';
                const response = await handleRequestBook(
                  book.id,
                  walletAddress
                );
                return response;
              }}
            />
          )}
        />
        <PaginationComponent
          currentPage={page}
          pages={computePagesToDisplay(page, totalPages)}
          size={size}
          redirectUrl={ROUTES[currentRoute]}
        />
      </MainContainer>
    </>
  );
}
