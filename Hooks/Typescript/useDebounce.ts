import { useEffect, useState } from "react";

// Define the type for the value parameter
type DebouncedValue<T> = T;

export const useDebounce = <T>(
  value: T,
  milliSeconds: number = 300
): DebouncedValue<T> => {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] =
    useState<DebouncedValue<T>>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified duration
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    // Cleanup function to clear the timeout if the value or milliSeconds change
    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  // Return the debounced value
  return debouncedValue;
};
