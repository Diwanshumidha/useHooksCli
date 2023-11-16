import { useState, useEffect } from "react";

const useFetch = (url, body, options = {}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: options.method || "GET",
          headers: options.headers || {
            "Content-Type": "application/json",
          },
          body: options.body || JSON.stringify(body),
          ...options, // Merge additional options
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Text: ${errorText}`
          );
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred.")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, body, options]);

  return { loading, error, data };
};

export default useFetch;
