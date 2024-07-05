// Регулярное выражение для проверки URL
export const urlRegex = new RegExp(
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/
);