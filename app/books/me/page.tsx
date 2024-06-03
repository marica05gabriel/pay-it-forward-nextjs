import { TitlePanel } from '@/app/_components/panels/title-panel';
import { ROUTES, RoutesEnum, getRouteSettings } from '@/app/_utils/routes-util';
import { authOptions } from '@/utils/auth-utils';
import { ListMyBooks } from '@/components/my-books/ListBooks';
import { MainContainer } from '@/ui/MainContainer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PaginationComponent } from '@/app/_ui/pagination/PaginationComponent';
import { BookType } from '@/app/_utils/types';

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
  const page = getParamOrDefault(searchParams, 'page', 1);
  const size = getParamOrDefault(searchParams, 'size', 10);
  console.log('FETCH TO: ' + GET_MY_BOOKS);

  const response = await fetch(
    `${GET_MY_BOOKS}?page=${page - 1}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Coontent-Type': 'application/json',
        username: 'gmarica',
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

  console.log('books');
  console.log(books);
  console.log(page, size);

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

const getParamOrDefault = (
  searchParams: { [key: string]: string | string[] | undefined },
  key: string,
  defaultValue: number
) => {
  let result = defaultValue;
  const param = searchParams[key];
  if (typeof param === 'string') {
    result = parseInt(param);
  }
  if (isNaN(result)) {
    return defaultValue;
  }
  return result;
};

const computePagesToDisplay = (page: number, totalPages: number) => {
  let result = [];
  if (page < 3) {
    result = [1, 2, 3];
  } else {
    result = [page - 1, page, page + 1];
  }

  return result.filter((page) => page <= totalPages);
};
