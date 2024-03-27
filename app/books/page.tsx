import { ROUTES, RoutesEnum } from "../lib/routes-util";
import { PaperBookListWrapper, readBooks } from "../lib/testData";
import { TUKPage } from "../ui/navigation";
import { TitlePanel } from "../ui/panels/title-panel";

export default async function FindBooksPage() {
  const routeSegments = ROUTES[RoutesEnum.FIND_BOOKS].split("/");
  routeSegments.shift();

  console.log("Hello from TUK");

  const readBooksAsync = (await readBooks()) as PaperBookListWrapper;
  if (!readBooksAsync) {
    console.error("Books are missing!");
  }

  return (
    <>
      <TitlePanel title="Find Books" routeSegments={routeSegments} />
      <TUKPage>
        {readBooksAsync.books.map((book) => (
          <li key={book.title} className="text-gray-800">
            {book.title}
          </li>
        ))}
      </TUKPage>
    </>
  );
}
