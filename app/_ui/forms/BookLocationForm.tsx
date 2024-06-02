import { ReactNode } from 'react';
import { SelectLocationForm } from './SelectLocationForm';

interface Props {
  countryForm: ReactNode;
  cityForm: ReactNode;
}
export const BookLocationFormContainer = ({ countryForm, cityForm }: Props) => (
  <div className='grid sm:grid-cols-2'>
    <div className='flex w-full items-center justify-center'>
      <div className='w-52 justify-center'>
        <h1 className='text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white'>
          Locatia curenta a cartii:
        </h1>
      </div>
    </div>
    <div className='flex w-full flex-1 flex-col items-center justify-center'>
      <div className='z-40 w-full px-2 sm:col-span-3'>{countryForm}</div>
      <div className='z-30 mt-6 w-full px-2 sm:col-span-3'>{cityForm}</div>
    </div>
  </div>
);
