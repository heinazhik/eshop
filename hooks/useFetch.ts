import { useState, useEffect, useCallback } from 'react';

interface UseFetchOptions<T> {
  initialData?: T;
  refetchOnMount?: boolean;
}

function useFetch<T>(url: string, options?: UseFetchOptions<T>) {
  const [data, setData] = useState<T | null>(options?.initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const message = `This is an HTTP error: The status is ${response.status}`;
        throw new Error(message);
      }
      const json = await response.json();
      setData(json);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (options?.refetchOnMount !== false) {
      fetchData();
    }
  }, [fetchData, options?.refetchOnMount]);

  return { 
    data, 
    loading, 
    error,
    refetch: fetchData
  };
}

export default useFetch;
