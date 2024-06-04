import { TitlePanel } from '../_components/panels/title-panel';
import { MainContainer } from '../_ui/MainContainer';
import { OutBook, manageCsvBooks2 } from '../_utils/books-batch-generator';
import { RoutesEnum, getRouteSettings } from '../_utils/routes-util';

export default async function TestZonePage() {
  const currentRoute = RoutesEnum.TEST_ZONE;
  const routeSettings = getRouteSettings(currentRoute);
  console.log(RoutesEnum[currentRoute]);

  // const books: OutBook[] = await manageCsvBooks2();
  const books: OutBook[] = [];

  return (
    <>
      <TitlePanel
        title={routeSettings.label}
        routeSegments={routeSettings.segments}
      />
      <MainContainer>
        <div>
          {books.map((book, index) => (
            <div key={index}>
              <div>
                <div>id: {book.id}</div>
                <div>authors: {book.authors}</div>
                <div>categories: {book.categories}</div>
                <div>description: {book.description}</div>
                <div>image: {book.image}</div>
                <div>info_link: {book.info_link}</div>
                <div>isbnList: {book.isbnList}</div>
                <div>preview_link: {book.preview_link}</div>
                <div>published_date: {book.published_date}</div>
                <div>publisher: {book.publisher}</div>
                <div>ratings_count: {book.ratings_count}</div>
                <div>title: {book.title}</div>
              </div>
              <br />
              <br />
            </div>
          ))}
        </div>
      </MainContainer>
    </>
  );
}
