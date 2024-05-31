'use client';
import React, { useState } from 'react';
import { SelectForm } from './SelectForm';
import { BookLocationFormContainer } from './BookLocationForm';

export const SelectLocationForm = () => {
  const [selectedCountry, setSelectedCountry] = useState('Select country');
  const [selectedCity, setSelectedCity] = useState('Select city');

  const [isCountrySearchOpen, setCountrySearchOpen] = useState(false);
  const [isCitySearchOpen, setCitySearchOpen] = useState(false);

  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [citySearchQuery, setCitySearchQuery] = useState('');

  const [countryOptions, setCountryOptions] = useState<string[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);

  const handleSearchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountrySearchQuery(e.target.value);
    setCountryOptions(e.target.value.split(' '));
  };

  const handleSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCitySearchQuery(e.target.value);
    setCityOptions(e.target.value.split(' '));
  };

  const handleSetCountry = (country: string) => {
    setSelectedCountry(country);
    setCountrySearchQuery('');
    setCountryOptions([]);
    setCountrySearchOpen(false);
  };
  const handleSetCity = (city: string) => {
    setSelectedCity(selectedCountry + '_' + city);
    setCitySearchQuery('');
    setCityOptions([]);
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
