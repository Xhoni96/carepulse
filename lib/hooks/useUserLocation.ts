import { useEffect, useState } from "react";

export const useUserLocation = () => {
  const [userCountryCode, setUserCountryCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Use a reverse geocoding API to get country code from coordinates
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();

        const countryCode = data.countryCode;

        if (countryCode) {
          setUserCountryCode(countryCode);
        }
      });
    }
  }, []);

  return { userCountryCode };
};
