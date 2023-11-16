import { useEffect, useMemo, useState } from "react";

export const useLocalStorage = (initialvalue: string, key: string) => {
  const [Value, setValue] = useState();
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setValue(value as undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const current = getItem();
    if (current) {
      setItem(current);
    } else {
      setItem(initialvalue);
    }
  }, []);

  return { Value, setItem, getItem, removeItem };
};
