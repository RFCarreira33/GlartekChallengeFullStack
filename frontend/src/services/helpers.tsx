/**
 * Helper function to get the background image based on the weather icon
 * @param icon
 * @returns image name as string
 */
export const getBackground = (icon: string) => {
  const hour = new Date().getHours();
  const time = hour >= 6 && hour <= 18 ? "d" : "n";

  switch (icon) {
    case "01":
      return `clear-${time}.jpg`;
    case "02":
    case "03":
    case "04":
      return `cloudy-${time}.jpg`;
    case "09":
    case "10":
      return `rainy-${time}.jpg`;
    case "11":
      return "thunderstorm.jpg";
    case "13":
      return "snow.jpg";
    default:
      return "clear-d.jpg";
  }
};

/**
 * Helper function to get the wind direction based on the wind degree
 * @param deg
 * @returns wind direction as string
 */
export const getWindDirection = (deg: number) => {
  let counter = 0;
  while (deg > 45) {
    deg -= 45;
    counter++;
  }
  switch (counter) {
    case 0:
      return "N";
    case 1:
      return "NE";
    case 2:
      return "E";
    case 3:
      return "SE";
    case 4:
      return "S";
    case 5:
      return "SW";
    case 6:
      return "W";
    case 7:
      return "NW";
    default:
      return "N";
  }
};

/**
 * Helper function to capitalize the first letter of a string
 * @param str
 * @returns capitalized string
 */
export function getCapitalized(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getToken() {
  return localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
}

// Very redundant function, but keeps code clean
export function isLoggedIn() {
  return getToken() != null;
}
