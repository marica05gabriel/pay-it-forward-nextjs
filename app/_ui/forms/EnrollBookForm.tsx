import { BookInfoForm } from './BookInfoForm';
import { SearchISBNForm } from './SearchISBNForm';
import { SelectLocationForm } from './SelectLocationForm';

export const EnrollBookForm = () => (
  <div className='p-10'>
    <SearchISBNForm />

    <div className='grid grid-cols-1 grid-rows-2 gap-y-2 divide-y '>
      <BookInfoForm />
      <SelectLocationForm />
    </div>
  </div>
);
