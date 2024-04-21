import { TitlePanel } from '@/app/_components/panels/title-panel';
import { TUKPage } from '@/app/_ui/TUKPage';
import { RoutesEnum, getRouteSettings } from '@/app/_utils/routes-util';
import { EnrollBook } from '@/components/my-books/EnrollBook';

export default async function EnrollBookPage() {
  const currentRoute = RoutesEnum.ENROLL_BOOK;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <TUKPage>
        <EnrollBook />
      </TUKPage>
    </>
  );
}
