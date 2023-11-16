import { useState, useEffect } from "react";

const useBattery = () => {
  const [batteryState, setBatteryState] = useState({
    loading: true,
    level: 0,
    charging: false,
    chargingTime: null,
    dischargingTime: null,
  });

  useEffect(() => {
    const handleBatteryChange = (battery) => {
      setBatteryState({
        loading: false,
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime || null,
        dischargingTime: battery.dischargingTime || null,
      });
    };

    const handleBatteryError = () => {
      setBatteryState((prevState) => ({
        ...prevState,
        loading: false,
      }));
      console.error("Battery information not available.");
    };

    const navigatorWithBattery = navigator;

    navigatorWithBattery.getBattery().then((battery) => {
      handleBatteryChange(battery);
      battery.addEventListener("chargingchange", () =>
        handleBatteryChange(battery)
      );
      battery.addEventListener("levelchange", () =>
        handleBatteryChange(battery)
      );
      battery.addEventListener("chargingtimechange", () =>
        handleBatteryChange(battery)
      );
      battery.addEventListener("dischargingtimechange", () =>
        handleBatteryChange(battery)
      );
    });

    navigatorWithBattery.getBattery().catch(handleBatteryError);

    return () => {
      navigatorWithBattery.getBattery().then((battery) => {
        battery.removeEventListener("chargingchange", () =>
          handleBatteryChange(battery)
        );
        battery.removeEventListener("levelchange", () =>
          handleBatteryChange(battery)
        );
        battery.removeEventListener("chargingtimechange", () =>
          handleBatteryChange(battery)
        );
        battery.removeEventListener("dischargingtimechange", () =>
          handleBatteryChange(battery)
        );
      });
    };
  }, []);

  return batteryState;
};

export default useBattery;
