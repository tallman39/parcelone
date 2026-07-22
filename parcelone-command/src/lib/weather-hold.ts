import { useSyncExternalStore } from "react";

const KEY = "parcelone.weatherHold";
const EVT = "parcelone:weatherhold";

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVT, cb);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVT, cb);
  };
}

function getSnapshot(): boolean {
  return localStorage.getItem(KEY) === "1";
}

function getServerSnapshot(): boolean {
  return false;
}

export function useWeatherHold(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setWeatherHold(v: boolean) {
  localStorage.setItem(KEY, v ? "1" : "0");
  window.dispatchEvent(new Event(EVT));
}
