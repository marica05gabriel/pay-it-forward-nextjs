import { TitlePanel } from '@/app/_components/panels/title-panel';
import { ROUTES, RoutesEnum, getRouteSettings } from '@/app/_utils/routes-util';
import { authOptions } from '@/utils/auth-utils';
import { ListMyBooks } from '@/components/my-books/ListBooks';
import { MainContainer } from '@/ui/MainContainer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PaginationComponent } from '@/app/_ui/pagination/PaginationComponent';
import { BookType } from '@/app/_utils/types';
import { getParamOrDefault } from '@/app/_utils/search-params-utils';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  computePagesToDisplay,
} from '@/app/_utils/pagination-utils';

const GET_MY_BOOKS = `${process.env.RESOURCE_SERVER_URL_BOOK}/me`;
export default async function MyBooksPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentRoute = RoutesEnum.MY_BOOKS;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }
  const username = session?.user?.name ?? '';
  const page = getParamOrDefault(searchParams, 'page', DEFAULT_PAGE_NUMBER);
  const size = getParamOrDefault(searchParams, 'size', DEFAULT_PAGE_SIZE);
  console.log('FETCH TO: ' + GET_MY_BOOKS);

  const response = await fetch(
    `${GET_MY_BOOKS}?page=${page - 1}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        username,
      },
    }
  );
  const data = await response.json();
  console.log('MY books');
  console.log(data);

  let totalPages;
  let books: BookType[] = [];
  if (response.ok) {
    books = data.content;
    totalPages = data.page.totalPages;
  }

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
