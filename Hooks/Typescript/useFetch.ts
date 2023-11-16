import { useState, useEffect } from "react";

type ApiResponse<T> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
};

type FetchOptions = {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
};

export const useFetch = <T>(
  url: string,
  body?: object,
  options: FetchOptions = {}
): ApiResponse<T> => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

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
