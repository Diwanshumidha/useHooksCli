import { useState, useEffect } from "react";

// Define the Screen interface to represent the screen properties
interface Screen {
  width: number;
  height: number;
  // Add other properties as needed
}

// Define the useScreen hook
export function useScreen(): Screen | undefined {
  // Function to get the screen information
  const getScreen = (): Screen | undefined => {
    if (typeof window !== "undefined" && window.screen) {
      return {
        width: window.screen.width,
        height: window.screen.height,
        // Add other properties as needed
      };
    }
    return undefined;
  };

  // State to store the screen information
  const [screen, setScreen] = useState<Screen | undefined>(getScreen());

  // Event handler for screen size changes
  function handleSize() {
    setScreen(getScreen());
  }

  // Attach a resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleSize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  // Set size at the first client-side load
  useEffect(() => {
    handleSize();
  }, []);

  // Return the screen information
  return screen;
}
