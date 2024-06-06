'use client';
import React, { useState } from 'react';
import { SelectForm } from './SelectForm';
import { BookLocationFormContainer } from './BookLocationForm';
import useDebounce from '@/app/_utils/useDebounce';
import { BookLocation } from '@/app/_services/types';
import { useSearchBookLocation } from '@/app/_services/useSearchBookLocation';

interface Props {
  setLocation: (location: BookLocation) => void;
}
export const SelectLocationForm = ({ setLocation }: Props) => {
  const {
    loading,
    country,
    city,
    countryOptions,
    cityOptions,
    setCity,
    setCountry,
    searchCountry,
    searchCity,
  } = useSearchBookLocation();
  const [isCountrySearchOpen, setCountrySearchOpen] = useState(false);
  const [isCitySearchOpen, setCitySearchOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [countrySearchQuery, setCountrySearchQuery] = useState('');

  const handleSearchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountrySearchQuery(e.target.value);
  };

  const handleSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCitySearchQuery(e.target.value);
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
    setLocation({ country, city });
  };

  return (
    <BookLocationFormContainer
      countryForm={
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
      }
      cityForm={
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
      }
    />
  );
};
