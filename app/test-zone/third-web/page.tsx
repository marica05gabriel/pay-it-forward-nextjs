import { TitlePanel } from '@/components/panels/title-panel';
import ThirdWebContainer from '@/components/thirdweb/ThirdWebContainer';
import { TUKPage } from '@/ui/TUKPage';
import { RoutesEnum, getRouteSettings } from '@/utils/routes-util';

export default function ThirdWebPage() {
  const currentRoute = RoutesEnum.TEST_ZONE;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      {/* <TUKPage> */}
      {/* <ThirdWebContainer />; */}
      {/* </TUKPage> */}
    </>
  );
}
