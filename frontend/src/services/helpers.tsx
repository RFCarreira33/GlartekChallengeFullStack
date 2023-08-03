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

export function getWeekdays() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const todayIndex = new Date().getDay();

  const weekdaysList = [];
  for (let i = 0; i < 7; i++) {
    const nextDayIndex = (todayIndex + i) % 7;
    weekdaysList.push(weekdays[nextDayIndex]);
  }

  return weekdaysList;
}

export function getCapitalized(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
