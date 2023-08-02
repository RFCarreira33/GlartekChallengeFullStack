export const getBackground = (icon: string) => {
  switch (icon) {
    case "01d":
      return "clear-d.jpg";
    case "01n":
      return "clear-n.jpg";
    case "02d":
    case "03d":
    case "04d":
      return "cloudy-d.jpg";
    case "02n":
    case "03n":
    case "04n":
      return "cloudy-n.jpg";
    case "09d":
    case "10d":
      return "rainy-d.jpg";
    case "09n":
    case "10n":
      return "rainy-n.png";
    case "11d":
    case "11n":
      return "thunderstorm.jpg";
    case "13d":
    case "13n":
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

  const today = new Date();
  const todayIndex = today.getDay();

  const weekdaysList = [];
  for (let i = 0; i < 7; i++) {
    const nextDayIndex = (todayIndex + i) % 7;
    weekdaysList.push(weekdays[nextDayIndex]);
  }

  return weekdaysList;
}
