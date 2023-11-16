import { useEffect, useState } from "react";

export const useLocalStorage = (initialValue, key) => {
  const [value, setValue] = useState();

  const setItem = (newValue) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const current = getItem();
    if (current) {
      setItem(current);
    } else {
      setItem(initialValue);
    }
  }, [initialValue, key]);

  return { value, setItem, getItem, removeItem };
};
