import { useEffect, useRef } from "react";

const defaultOptions = {
  initialHidden: true,
};

const useLockedScroll = (options = defaultOptions) => {
  const { initialHidden } = { ...defaultOptions, ...options };
  const bodyRef = useRef(document.body);

  const toggleScrollLock = () => {
    const body = bodyRef.current;

    if (body) {
      const isLocked = body.style.overflow === "hidden";

      body.style.overflow = isLocked ? "visible" : "hidden";
      body.style.position = isLocked ? "static" : "fixed";
    }
  };

  useEffect(() => {
    const body = bodyRef.current;

    const handleScroll = (event) => {
      event.preventDefault();
    };

    body.style.overflow = initialHidden ? "hidden" : "visible";

    body.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      body.style.overflow = "visible";
      body.removeEventListener("scroll", handleScroll);
    };
  }, [initialHidden]);

  return toggleScrollLock;
};

export default useLockedScroll;
