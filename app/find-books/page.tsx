import { TitlePanel } from '@/components/panels/title-panel';
import { BookListing } from '@/ui/BookListing';
import { TUKPage } from '@/ui/TUKPage';
import { RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { TEST_BOOK_LIST } from '@/utils/testData';

export default async function FindBooksPage() {
  const currentRoute = RoutesEnum.FIND_BOOKS;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <TUKPage>
        <BookListing books={TEST_BOOK_LIST} />
      </TUKPage>
    </>
  );
}
