import { useState } from 'react';

interface Location {
  id: number;
  country: string;
  city: string;
}
const NO_LOCATION = {
  id: '-1',
  country: '',
  city: '',
};
export const useSearchBookLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [locations, setLocations] = useState<Set<Location>>(new Set());

  const searchCountry = async (query: string) => {
    if (!query || query.length < 3) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `/api/book/location/country?country=${query}`,
        { method: 'GET' }
      );
      const locationsResult = await response.json();
      if (locationsResult && Array.isArray(locationsResult)) {
        setLocations(new Set(locationsResult));
      }
    } catch (e) {
      console.error(e);
      setError('ERROR');
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async (query: string) => {
    if (!query || query.length < 1 || !country || country.length < 3) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `/api/book/location/city?country=${country}&city=${query}`,
        { method: 'GET' }
      );
      const locations = await response.json();
      if (locations && Array.isArray(locations)) {
        setLocations(new Set(locations));
      }
    } catch (e) {
      console.error(e);
      setError('ERROR');
    } finally {
      setLoading(false);
    }
  };

  const countryOptions = Array.from(locations)
    .slice(0, 5)
    .map((location) => location.country);
  const cityOptions = Array.from(locations)
    .slice(0, 5)
    .map((location) => location.city);
  return {
    loading,
    error,
    country,
    city,
    countryOptions: new Set(countryOptions),
    cityOptions: new Set(cityOptions),
    locations,
    setCountry,
    setCity,
    searchCountry,
    searchCity,
  };
};
