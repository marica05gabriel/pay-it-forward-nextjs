import fs from 'fs';
import readline from 'readline';

type Book = {
  id: string;
  authors: string;
  categories: string;
  description: string;
  image: string;
  info_link: string;
  isbn: string;
  preview_link: string;
  published_date: string;
  publisher: string;
  ratings_count: string;
  title: string;
};
export type OutBook = {
  id: string;
  authors: string[];
  categories: string[];
  description: string;
  image: string;
  info_link: string;
  isbnList: string[];
  preview_link: string;
  published_date: string;
  publisher: string;
  ratings_count: string;
  title: string;
};

type FIELD_NAMES =
  | 'id'
  | 'authors'
  | 'categories'
  | 'description'
  | 'image'
  | 'info_link'
  | 'isbn'
  | 'preview_link'
  | 'published_date'
  | 'publisher'
  | 'ratings_count'
  | 'title';
const BATCH_SIZE: number = 100;

const BOOKS_TO_HANDLE = 1_000_000;
const OUTPUT_DIR = 'public/out/books-batch';
const OUTPUT_FILE = `${OUTPUT_DIR}/book`;
const availableCategories = new Set<string>();

export async function manageCsvBooks2() {
  const startTimeGlobal = new Date();

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const inputFile = 'public/books.csv';
  const inputStream = fs.createReadStream(inputFile);
  const readLine = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  let batchNr = 0;
  let count = -1;
  let outResult: OutBook[] = [];
  for await (const line of readLine) {
    if (count === -1) {
      console.log(`[${count}] Skipping headers...`);
      count++;
      continue;
    }
    if (count >= BOOKS_TO_HANDLE) {
      console.log(`Exit on ${count}.`);
      break;
    }

    if (count !== 0 && count % BATCH_SIZE === 0) {
      console.log(`ENTERED HERE. Batch nr. ${batchNr}`);
      writeBooksBatch(batchNr, outResult);
      outResult = [];

      batchNr++;
    }

    // console.log(`[${count}] Handling book line...`);
    const outBook: OutBook = handleBookLine(line);
    // console.log(outBook);
    outResult.push(outBook);
    count++;
  }

  // Write last batch
  writeBooksBatch(batchNr, outResult);

  console.log('End');
  const endTimeGlobal = new Date();
  const diffTimeGlobal =
    endTimeGlobal.getMilliseconds() - startTimeGlobal.getMilliseconds();
  console.log(`Duration: ${diffTimeGlobal} ms.`);
  console.log(`Duration: ${diffTimeGlobal / 1000} s.`);

  console.log(availableCategories);
  fs.writeFileSync(
    `${OUTPUT_DIR}/available-categories.json`,
    JSON.stringify(Array.from(availableCategories).sort(), null, 4),
    {
      flag: 'w',
    }
  );
  return outResult;
}

function handleBookLine(bookLine: string) {
  const columns = bookLine.split(';');

  const book: Book = {
    id: columns[0],
    authors: columns[1],
    categories: columns[2],
    description: columns[3],
    image: columns[4],
    info_link: columns[5],
    isbn: columns[6],
    preview_link: columns[7],
    published_date: columns[8],
    publisher: columns[9],
    ratings_count: columns[10],
    title: columns[11],
  };

  const outAuthors = handleAuthors(book.authors);
  const outCategories = handleCategories(book.categories);
  const outDescription = handleDescription(book.description);
  const outISBNs = handleISBNs(book.isbn);

  const outBook: OutBook = {
    ...book,
    authors: outAuthors,
    categories: outCategories,
    description: outDescription,
    isbnList: outISBNs,
  };
  return outBook;
}

function handleAuthors(authorsAsLine: string) {
  const authors1 = authorsAsLine.substring(1, authorsAsLine.length - 1);
  const authors2 = authors1.split(',');
  const outAuthors = [];
  for (const author of authors2) {
    const trimmedAuthor = author.trim();
    const authorWithNoQuotes = trimmedAuthor.substring(
      1,
      trimmedAuthor.length - 1
    );
    outAuthors.push(authorWithNoQuotes);
  }
  return outAuthors;
}

function handleCategories(categoriesAsLine: string) {
  const categories0 = categoriesAsLine.substring(
    1,
    categoriesAsLine.length - 1
  );
  const categories1 = categories0.replaceAll("'", '');
  const categories2 = categories1.split(',');
  const outCategories = [];
  for (const category of categories2) {
    const trimmedCategory = category.trim();
    outCategories.push(trimmedCategory);
  }
  for (const myCategory of outCategories) {
    availableCategories.add(myCategory);
  }
  return outCategories;
}

function handleDescription(descriptionAsLine: string) {
  const trimTripleQuotes = descriptionAsLine.replaceAll('"""', '"');
  const trimDoubleQuotes = trimTripleQuotes.replaceAll('""', '"');
  const removeStartQuote = trimDoubleQuotes.replaceAll('"', "'");
  const removeEndQuote = removeStartQuote.startsWith("'")
    ? removeStartQuote.substring(1, removeStartQuote.length)
    : removeStartQuote;
  return removeEndQuote.endsWith("'")
    ? removeEndQuote.substring(0, removeEndQuote.length - 1)
    : removeEndQuote;
}

function handleISBNs(isbnsAsLine: string) {
  const isbns = isbnsAsLine.split(',');
  const isbnList = [];
  for (const isbn of isbns) {
    isbnList.push(isbn.trim());
  }
  return isbnList;
}

function writeBooksBatch(batchNr: number, outResult: OutBook[]) {
  const startTimeWrite = new Date();

  const batchFileName = `${OUTPUT_FILE}-${batchNr}.json`;
  console.log(
    `Writing to file : ${batchFileName}. Nr of books: ${outResult.length}`
  );
  fs.writeFileSync(batchFileName, JSON.stringify(outResult, null, 4), {
    flag: 'w',
  });
  console.log(`Finishing writing to file : ${batchFileName}`);

  const endTimeWrite = new Date();
  const diffTimeWrite =
    endTimeWrite.getMilliseconds() - startTimeWrite.getMilliseconds();
  console.log(`[${batchNr}] Duration: ${diffTimeWrite} ms.`);
  console.log(`[${batchNr}] Duration: ${diffTimeWrite / 1000} s.\n\n`);
}
