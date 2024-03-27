import { OutBook } from "@/utils/books-batch-generator";
import { truncate, truncateDescription, truncateLong, truncateShort, truncateTitle } from "@/utils/string-utils";
import Image from "next/image";

interface Props {
  books: OutBook[];
}
export const BookListing = ({ books }: Props) => {
  return (
    <>
      <div className="bg-gradient-to-bl from-blue-50 to-violet-50 flex items-center justify-center">
        <div className="container mx-auto mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {/* <!-- Replace this with your grid items --> */}
            {books.map((book) => {
              const properties = new Map<string, string>();
              properties.set("Authors", truncateShort(book.authors.toString()));
              properties.set("Categories", truncateShort(book.categories.toString()));
              properties.set("Description", truncateLong(book.description));

              return (
                <BookCard
                  key={book.id}
                  title={truncateShort(book.title)}
                  properties={properties}
                />
              );
            })}
            {/* <!-- Add more items as needed --> */}
          </div>
        </div>
      </div>
    </>
  );
};

interface BookCardProps {
  title: string;
  properties: Map<string, string>;
}
const BookCard = ({ title, properties }: BookCardProps) => {
  return (
    <div className="bg-white rounded-lg border p-4">
      <Image
        src="/no-book-cover-available.png"
        width={300}
        height={100}
        alt="Placeholder Image"
        className="w-full rounded-md object-cover"
      />
      <div className="h-80">
        <div className="h-60 px-1 py-4">
          <div className="h-20 text-gray-900 font-bold text-l mb-2">{title}</div>
          <p className="text-gray-700 text-base">
            {Array.from(properties.keys()).map((key) => (
              <div>
                <b>{key}: </b>
                {properties.get(key)}
              </div>
            ))}
          </p>
        </div>
        <div className="px-1 py-10 height-auto">
          <a href="#" className="text-blue-500 hover:underline">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};
