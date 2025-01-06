import "dotenv/config";
export const dateConvert = (date: Date) => {
  const dateFixed = date
    .toString()
    .replace(/[TZ]/g, " ")
    .slice(0, date.toString().length - 5);
  return dateFixed;
};
