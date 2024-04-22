import { useEffect, useState } from "react";

export function useFetch({ url, extaPath = "" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const fetchFromURL = await fetch(`${url}${extaPath}`);
      const response = await fetchFromURL.json();
      if (response.results) {
        setData((prevState) => [...prevState, ...response.results]);
      } else {
        setData(response);
      }
      setLoading(false);
    } catch (error) {
      setError(`There is a error fetching ${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [extaPath]);

  return { data, loading, error };
}
