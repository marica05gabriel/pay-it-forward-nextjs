import { OutBook, manageCsvBooks2 } from "../_utils/books-batch-generator";

export default async function TestZonePage() {
  console.log("Hello on test Page");
  console.log("Trying to read lines from books.csv");

  const books: OutBook[] = await manageCsvBooks2();
  return (
    <>
      {books.map((book, index) => (
        <div key={index} style={{ backgroundColor: "black" }}>
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
    </>
  );
}
