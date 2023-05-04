import { getUseCurrentLocation, saveLocation } from "@/lib/supabase/location-service";

let watcherId = -1;

export function startLocationWatching() {
  if (watcherId === -1) {
    console.log("[LocationWatcher] start watching ...");
    watcherId = window.navigator.geolocation.watchPosition((geolocationPosition) => {
      const currentLocation = {
        longitude: geolocationPosition.coords.longitude,
        latitude: geolocationPosition.coords.latitude
      };
      // setLocation(currentLocation);
      saveLocation(currentLocation).then();
    });
  }
}

export function stopLocationWatching() {
  if (watcherId) {
    console.log("[LocationWatcher] stop watching ...");
    window.navigator.geolocation.clearWatch(watcherId);
    watcherId = -1;
  }
}

export async function initLocationWatcher() {
  const useCurrentLocation = await getUseCurrentLocation();
  useCurrentLocation ? startLocationWatching() : stopLocationWatching();
}