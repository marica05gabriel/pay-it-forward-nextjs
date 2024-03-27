import { error } from "console";
import * as fs from "fs";
import { OutBook } from "./books-batch-generator";

const FILE_PATH = "/public/books.json";
const TEST_FILE_PATH = "/public/testData.json";

export type PaperBookListWrapper = {
  books: PaperBook[];
};
export type PaperBook = {
  title: string;
  description: string;
  authors: string;
  image: string;
  previewLink: string;
  publisher: string;
  publishedDate: string;
  infoLink: string;
  categories: string;
  ratingsCount: string;
  isbn: string;
};

// export async function fetchCardData() {
//   const path = process.cwd() + TEST_FILE_PATH;
//   const myData = await fs.readFileSync(path, { encoding: "utf8" });
//   const books = JSON.parse(myData);
//   // console.log(books.books[0]);
//   return books.books as PaperBook[];
// }

export async function readBooks() {
  const path = process.cwd() + TEST_FILE_PATH;
  const promise = readFileAsync(path) as Promise<string>;
  const content = await promise
    .then((data) => JSON.parse(data))
    .catch((error) => console.error(error));

  return content
}

export const readFileAsync = (path: string) => {
  return new Promise<unknown>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};


export async function readBooks2() {
  const path = process.cwd() + "/public/out/books-batch/book-0.json";
  const promise = readFileAsync(path) as Promise<string>;
  const content = await promise
    .then((data) => JSON.parse(data))
    .catch((error) => console.error(error));

  return content as OutBook[]
}