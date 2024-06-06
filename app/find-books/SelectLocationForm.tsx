'use client';
import { useState } from 'react';
import { useSearchBookLocation } from '../_services/useSearchBookLocation';
import { SelectForm } from '../_ui/forms/SelectForm';
import useDebounce from '../_utils/useDebounce';
import { BookLocation } from '../_services/types';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES, RoutesEnum } from '../_utils/routes-util';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from '../_utils/pagination-utils';
import Link from 'next/link';

export const SelectLocationForm = () => {
  const {
    loading,
    country,
    city,
    countryOptions,
    cityOptions,
    locations,
    setCity,
    setCountry,
    searchCountry,
    searchCity,
  } = useSearchBookLocation();
  const [isCountrySearchOpen, setCountrySearchOpen] = useState(false);
  const [isCitySearchOpen, setCitySearchOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const router = useRouter();

  const handleSearchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountrySearchQuery(e.target.value);
  };

  const handleSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCitySearchQuery(e.target.value);
  };

  const handleSetCountry = (country: string) => {
    setCountry(country);
    setCountrySearchQuery('');
    setCountrySearchOpen(false);
    handleSetCity('');
  };
  const handleSetCity = (city: string) => {
    setCity(city);
    setCitySearchQuery('');
    setCitySearchOpen(false);
  };

  const handleClear = () => {
    handleSetCountry('');
  };

  const handleSearchBooks = () => {
    const pageSearchParam = `?page=${DEFAULT_PAGE_NUMBER}`;
    const sizeSearchParam = `&size=${DEFAULT_PAGE_SIZE}`;
    const selectedLocation = Array.from(locations).find(
      (location) => location.country === country && location.city === city
    );
    const locationIdSearchParams =
      selectedLocation == undefined ? '' : `&locationId=${selectedLocation.id}`;
    router.push(
      `${ROUTES[RoutesEnum.FIND_BOOKS]}${pageSearchParam}${sizeSearchParam}${locationIdSearchParams}`
    );
  };

  useDebounce(
    () => {
      searchCountry(countrySearchQuery);
    },
    [countrySearchQuery],
    800
  );

  useDebounce(
    () => {
      searchCity(citySearchQuery);
    },
    [citySearchQuery],
    800
  );

  const disabled = false;
  const isbn = '1234567891234';
  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 p-8 lg:flex-row'>
      <div className='w-full px-2 '>
        <SelectForm
          loading={loading}
          selectedValue={country}
          defaultValue='Select country'
          searchQuery={countrySearchQuery}
          options={countryOptions}
          isSearchOpen={isCountrySearchOpen}
          toggleSearch={() => {
            setCountrySearchOpen((prev) => !prev);
          }}
          onSearch={handleSearchCountry}
          handleSetValue={handleSetCountry}
        />
      </div>
      <div className='w-full px-2 '>
        <SelectForm
          loading={loading}
          selectedValue={city}
          defaultValue='Select city'
          searchQuery={citySearchQuery}
          options={cityOptions}
          isSearchOpen={isCitySearchOpen}
          toggleSearch={() => {
            setCitySearchOpen((prev) => !prev);
          }}
          handleSetValue={handleSetCity}
          onSearch={handleSearchCity}
        />
      </div>
      <div className='w-30  px-4 py-2 sm:col-span-3'>
        <button
          onClick={handleSearchBooks}
          className={clsx(
            ' rounded-md border bg-gray-800 p-2 text-white',
            disabled ||
              (isbn.length < 13 &&
                'cursor-not-allowed rounded-md bg-gray-300 px-4 py-2 opacity-50')
          )}
        >
          Search
        </button>
      </div>

      <div className='w-30  px-4 py-2 sm:col-span-3'>
        <button
          onClick={handleClear}
          className='rounded-md border bg-gray-800 p-2 text-white'
        >
          Clear
        </button>
      </div>
    </div>
  );
};
