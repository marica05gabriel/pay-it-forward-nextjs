import {
  PaperBookListWrapper,
  readBooks,
  readFileAsync,
} from "../lib/testData";
import { TUKPage } from "../ui/navigation";

export default async function Page() {
  console.log("Hello from TUK");

  const readBooksAsync = (await readBooks()) as PaperBookListWrapper;
  if (!readBooksAsync) {
    console.error("Books are missing!");
  }
  return (
      <TUKPage>
        {readBooksAsync.books.map((book) => (
          <li key={book.title}>{book.title}</li>
        ))}
      </TUKPage>
  );
}
