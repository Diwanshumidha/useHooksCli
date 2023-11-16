import { useEffect } from "react";

const useTabActive = ({ onTabActive, onTabInactive }) => {
  useEffect(() => {
    const handleTabActive = () => {
      onTabActive();
    };

    const handleTabInactive = () => {
      onTabInactive();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // If the page becomes visible, consider it as the tab becoming active
        handleTabActive();
      } else {
        // If the page becomes hidden, consider it as the tab becoming inactive
        handleTabInactive();
      }
    };

    // Add event listeners for visibilitychange
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Remove the event listener when the component is unmounted
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onTabActive, onTabInactive]);
};

export default useTabActive;
