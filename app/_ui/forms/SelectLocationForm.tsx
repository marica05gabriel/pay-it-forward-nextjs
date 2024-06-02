'use client';
import React, { useState } from 'react';
import { SelectForm } from './SelectForm';
import { BookLocationFormContainer } from './BookLocationForm';
import { BookLocation } from './EnrollBookForm';
import useDebounce from '@/app/_utils/useDebounce';

export const SelectLocationForm = () => {
  const [selectedCountry, setSelectedCountry] = useState('Select country');
  const [selectedCity, setSelectedCity] = useState('Select city');

  const [isCountrySearchOpen, setCountrySearchOpen] = useState(false);
  const [isCitySearchOpen, setCitySearchOpen] = useState(false);

  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [citySearchQuery, setCitySearchQuery] = useState('');

  const [countryOptions, setCountryOptions] = useState<Set<string>>(new Set());
  const [cityOptions, setCityOptions] = useState<Set<string>>(new Set());

  const handleSearchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountrySearchQuery(e.target.value);
  };

  const handleSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCitySearchQuery(e.target.value);
  };

  const searchCountry = async () => {
    if (!countrySearchQuery || countrySearchQuery.length < 3) {
      return;
    }
    const response = await fetch(
      `/api/book/location/country?country=${countrySearchQuery}`,
      { method: 'GET' }
    );
    response
      .json()
      .then((data: { locations: BookLocation[] }) => {
        if (data && data.locations && Array.isArray(data.locations)) {
          const countries = data.locations.map((location) => location.country);
          setCountryOptions(new Set(countries));
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const searchCity = async () => {
    if (
      !selectedCountry ||
      selectedCountry.length < 3 ||
      !citySearchQuery ||
      citySearchQuery.length < 3
    ) {
      return;
    }
    const response = await fetch(
      `/api/book/location/city?country=${selectedCountry}&city=${citySearchQuery}`,
      { method: 'GET' }
    );
    response
      .json()
      .then((data: { locations: BookLocation[] }) => {
        if (data && data.locations && Array.isArray(data.locations)) {
          const cities = data.locations.map((location) => location.city);
          setCityOptions(new Set(cities));
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  useDebounce(
    () => {
      searchCountry();
    },
    [countrySearchQuery],
    800
  );

  useDebounce(
    () => {
      searchCity();
    },
    [citySearchQuery],
    800
  );

  const handleSetCountry = (country: string) => {
    setSelectedCountry(country);
    setCountrySearchQuery('');
    setCountryOptions(new Set());
    setCountrySearchOpen(false);
    handleSetCity('');
  };
  const handleSetCity = (city: string) => {
    setSelectedCity(city);
    setCitySearchQuery('');
    setCityOptions(new Set());
    setCitySearchOpen(false);
  };

  const countryForm = (
    <SelectForm
      selectedValue={selectedCountry}
      isSearchOpen={isCountrySearchOpen}
      toggleSearch={() => {
        setCountrySearchOpen((prev) => !prev);
      }}
      searchQuery={countrySearchQuery}
      onSearch={handleSearchCountry}
      options={countryOptions}
      handleSetValue={handleSetCountry}
    />
  );

  const cityForm = (
    <SelectForm
      selectedValue={selectedCity}
      isSearchOpen={isCitySearchOpen}
      toggleSearch={() => {
        setCitySearchOpen((prev) => !prev);
      }}
      searchQuery={citySearchQuery}
      onSearch={handleSearchCity}
      options={cityOptions}
      handleSetValue={handleSetCity}
    />
  );

  return (
    <BookLocationFormContainer countryForm={countryForm} cityForm={cityForm} />
  );
};
