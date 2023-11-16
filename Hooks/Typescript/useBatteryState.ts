import { useState, useEffect } from "react";

interface BatteryState {
  loading: boolean;
  level: number;
  charging: boolean;
  chargingTime: number | null;
  dischargingTime: number | null;
}

// Extend the Navigator interface
interface NavigatorWithBattery extends Navigator {
  getBattery: () => Promise<any>;
}

const useBattery = (): BatteryState => {
  const [batteryState, setBatteryState] = useState<BatteryState>({
    loading: true,
    level: 0,
    charging: false,
    chargingTime: null,
    dischargingTime: null,
  });

  useEffect(() => {
    const handleBatteryChange = (battery: any) => {
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

    // Type assertion to NavigatorWithBattery
    const navigatorWithBattery = navigator as NavigatorWithBattery;

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
