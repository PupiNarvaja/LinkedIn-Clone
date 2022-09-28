import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
