import { TitlePanel } from '@/app/_components/panels/title-panel';
import { RoutesEnum, getRouteSettings } from '@/app/_utils/routes-util';
import { ListBooks } from '@/components/my-books/ListBooks';
import { TUKPage } from '@/ui/TUKPage';

export default async function ListBooksPage() {
  const currentRoute = RoutesEnum.MY_BOOKS;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

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
