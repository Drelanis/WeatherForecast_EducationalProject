const handleDataTime = (dateTimeString: string) => {
  const timestamp = new Date(dateTimeString);

  const year = timestamp.getFullYear();
  const month = timestamp.getMonth() + 1;
  const day = timestamp.getDate();
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();

  const formattedYears = year.toString().padStart(2, '0');
  const formattedMonths = month.toString().padStart(2, '0');
  const formattedDays = day.toString().padStart(2, '0');
  const formattedHoures = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedDays}.${formattedMonths}.${formattedYears} at ${formattedHoures}:${formattedMinutes}:${formattedSeconds}`;
};

export default handleDataTime;
