import { TitlePanel } from '@/app/_components/panels/title-panel';
import { authorizationCheck } from '@/app/_utils/auth-utils';
import { ROUTES, RoutesEnum, getRouteSettings } from '@/app/_utils/routes-util';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ListBooks } from '@/components/my-books/ListBooks';
import { TUKPage } from '@/ui/TUKPage';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function ListBooksPage() {
  const currentRoute = RoutesEnum.MY_BOOKS;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <TUKPage>
        <ListBooks />
      </TUKPage>
    </>
  );
}
