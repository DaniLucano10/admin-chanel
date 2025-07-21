import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../useAuth';

export const useFetchCountry = (params) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  const memoizedParams = useMemo(() => params, [params]);

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      const response = await axios.get(
        import.meta.env.VITE_API_URL + '/country',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: memoizedParams,
        }
      );
      setData(response.data);
    } catch (err) {
      setData([]);
      setError(
        err.response
          ? err.response.data
          : 'Ha ocurrido un error al obtener los datos.'
      );
    } finally {
      setLoading(false);
    }
  }, [memoizedParams, getToken]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return { loading, data, error, fetchCountries };
};