export const dateConvert = (date: Date) => {
  const dateFixed = date
    .toString()
    .replace(/[TZ]/g, " ")
    .slice(0, date.toString().length - 5);
  return dateFixed;
};
export const emailConvert = (email: string) => {
  const newEmail = email.replace("gmail.com", "");
  return newEmail;
};
