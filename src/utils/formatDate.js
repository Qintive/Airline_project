export const FormatDate = (inputDate) => {
    const months = [
      "янв.", "февр.", "мар.", "апр.", "мая", "июн.", "июл.", "авг.", "сент.", "окт.", "нояб.", "дек."
    ];
  
    const daysOfWeek = [
      "вс", "пн", "вт", "ср", "чт", "пт", "сб"
    ];
  
    const date = new Date(inputDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth();
    const dayOfWeek = date.getDay();
  
    const formattedDate = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${day} ${months[month]} ${daysOfWeek[dayOfWeek]}`;
  
    return formattedDate;
  }