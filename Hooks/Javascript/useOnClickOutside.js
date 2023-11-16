import { useEffect } from "react";

const useOnClickOutside = (ref, handleClickOutside) => {
  useEffect(() => {
    // Function to handle clicks outside the specified ref
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClickOutside(event);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [ref, handleClickOutside]);
};

export default useOnClickOutside;
