import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true; // Track whether the component is mounted
    const fetchData = async () => {
      setLoading(true);
      setError(false); // Reset error state before fetching
      try {
        const res = await axios.get(url);
        if (isMounted) {
          setData(res.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Error fetching data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup
    };
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    setError(false); // Reset error state before fetching
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
