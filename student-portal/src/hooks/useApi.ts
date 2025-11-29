import { useState, useEffect } from 'react';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: ApiStatus;
  refetch: () => void;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ApiStatus>('idle');

  const fetchData = async () => {
    setLoading(true);
    setStatus('loading');
    setError(null);

    try {
      const result = await apiCall();
      setData(result);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, status, refetch };
}