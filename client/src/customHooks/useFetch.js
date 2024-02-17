import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, initialValue = null) => {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data, status } = await axios.get(url);
        setData(data);
        setStatus(status);
      } catch (error) {
        setError(error);
        setStatus(status);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

  return { data, isLoading, error, status };
};

export default useFetch;
