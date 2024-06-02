import { TitlePanel } from '@/components/panels/title-panel';
import { BookListing } from '@/ui/BookListing';
import { MainContainer } from '@/ui/MainContainer';
import { RoutesEnum, getRouteSettings } from '@/utils/routes-util';
import { BookListingWrapper } from '../_components/book-listing/BookListingWrapper';

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
      <MainContainer>
        <BookListingWrapper
          bookListing={async (page: number, size: number) => {
            'use server';
            return <BookListing page={page} size={size} />;
          }}
        />
      </MainContainer>
    </>
  );
}
