interface Hook {
  title: string;
  value: string;
  description?: string;
}

export const Hooks: Hook[] = [
  {
    title: "useBatteryState",
    value: "useBatteryState",
    description: "A Hook for managing battery state in a React component",
  },
  {
    title: "useDebounce",
    value: "useDebounce",
    description: "A Hook for debouncing values in a React component",
  },
  {
    title: "useFetch",
    value: "useFetch",
    description: "A Hook for making HTTP requests in a React component",
  },
  {
    title: "useHistoryState",
    value: "useHistoryState",
    description: "A Hook for managing state with undo and redo functionality",
  },
  {
    title: "useLocalStorage",
    value: "useLocalStorage",
    description:
      "A Hook for interacting with local storage in a React component",
  },
  {
    title: "useLockedScroll",
    value: "useLockedScroll",
    description:
      "A Hook for locking and unlocking scrolling in a React component",
  },
  {
    title: "useMediaQuery",
    value: "useMediaQuery",
    description: "A Hook for handling media queries in a React component",
  },
  {
    title: "useOnClickOutside",
    value: "useOnClickOutside",
    description:
      "A Hook for handling clicks outside a specified element in a React component",
  },
  {
    title: "useScreen",
    value: "useScreen",
    description:
      "A Hook for getting and tracking screen dimensions in a React component",
  },
  {
    title: "useTabActive",
    value: "useTabActive",
    description:
      "A Hook for detecting when the browser tab becomes active or inactive",
  },
];
