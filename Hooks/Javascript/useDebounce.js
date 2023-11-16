import { useEffect, useState } from "react";

export const useDebounce = (value, milliSeconds = 300) => {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

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
