import { PaperBookListWrapper, readBooks } from "@/lib/testData";

export default async function PaperBookEnrollPage() {
  const readBooksAsync = await readBooks() as PaperBookListWrapper;

  if(!readBooksAsync) {
    console.error("Books are missing!")
  }

  return (
    <>
      <div>On this page you can enroll books in the platform</div>
      <li>
        The enroll will be done by minting an PaperBookNFT which is an ERC1155
        token.
      </li>
      <h1>Books</h1>
      {readBooksAsync.books.map((book) => <li key={book.title}>{book.title}</li>)}
    </>
  );
}
