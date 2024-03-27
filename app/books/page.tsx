import { ROUTES, RoutesEnum } from "@/utils/routes-util";
import { PaperBookListWrapper, readBooks, readBooks2 } from "@/utils/testData";
import { TUKPage } from "@/components/navigation";
import { TitlePanel } from "@/components/panels/title-panel";
import { BookListing } from "../_components/books/list";

export default async function FindBooksPage() {
  const routeSegments = ROUTES[RoutesEnum.FIND_BOOKS].split("/");
  routeSegments.shift();

  console.log("Hello from TUK");

  const readBooksAsync = (await readBooks()) as PaperBookListWrapper;
  if (!readBooksAsync) {
    console.error("Books are missing!");
  }

  const outBooks = await readBooks2();

  return (
    <>
      <TitlePanel title="Find Books" routeSegments={routeSegments} />
      <TUKPage>
        <BookListing books={outBooks} />
        {/* {readBooksAsync.books.map((book) => (
          <li key={book.title} className="text-gray-800">
            {book.title}
          </li>
        ))} */}
      </TUKPage>
    </>
  );
}
