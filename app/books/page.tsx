import { ROUTES, RoutesEnum } from "../_utils/routes-util";
import { PaperBookListWrapper, readBooks } from "../_utils/testData";
import { TUKPage } from "@/components/navigation";
import { TitlePanel } from "@/components/panels/title-panel";

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
