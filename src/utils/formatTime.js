export const FormatTime = (inputTime) => {
  const time = parseInt(inputTime, 10);

  const hours = Math.floor(time / 100);
  const minutes = time % 100;

  const formattedTime = `${hours}ч ${minutes}мин`;

  return formattedTime;
};
