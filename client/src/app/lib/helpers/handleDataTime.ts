const handleDataTime = (dateTimeString: string) => {
  const timestamp = new Date(dateTimeString);

  const year = timestamp.getFullYear();
  const month = timestamp.getMonth() + 1;
  const day = timestamp.getDate();
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();

  return `${year}.${month}.${day} at ${hours}:${minutes}:${seconds}`;
};

export default handleDataTime;
