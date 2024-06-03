import { TitlePanel } from '@/components/panels/title-panel';
import { BookListing } from '@/ui/BookListing';
import { MainContainer } from '@/ui/MainContainer';
import { ROUTES, RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { BookListingWrapper } from '../_components/book-listing/BookListingWrapper';
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
  console.log('FETCH TO: ' + FIND_BOOKS_URL);

  const session = await getServerSession(authOptions);
  const username = session?.user?.name ?? '';

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
  const data = await response.json();
  let totalPages;
  let books: BookType[] = [];
  if (response.ok) {
    books = data.content;
    totalPages = data.page.totalPages;
  }
  console.log(books);
  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <MainContainer>
        <ListMyBooks books={books} />
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
