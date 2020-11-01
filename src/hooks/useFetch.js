import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const doFetch = async () => {
      setLoading(true)
      try {
        const res = await axios(url, options)
        const data = res.data
        setResponse(data)
        if (!signal.aborted) {
          setResponse(data);
        }
      } catch (e) {
        if (!signal.aborted) {
          setError(e);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }
    doFetch();

    return () => {
      abortController.abort();
    };
  }, [url, options]);

  return { response, error, loading };
};

export default useFetch;