interface Hook {
  title: string;
  value: string;
  description?: string;
}

export const Hooks: Hook[] = [
  {
    title: "useToggle",
    value:
      "useToggle|https://raw.githubusercontent.com/WebDevSimplified/useful-custom-react-hooks/main/src/1-useToggle/useToggle.js",
    description:
      "A Hook that stores Previous and provides functions like redo and undo",
  },
  {
    title: "useEventListener",
    value:
      "useEventListener|https://raw.githubusercontent.com/WebDevSimplified/useful-custom-react-hooks/main/src/13-useEventListener/useEventListener.js",
    description: "A Hook for handling event listeners in a declarative way",
  },
];
