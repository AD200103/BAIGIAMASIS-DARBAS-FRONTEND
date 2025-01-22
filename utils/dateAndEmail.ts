import "dotenv/config";
type ObjectDateType = {
  year: "numeric" | "2-digit" | undefined;
  month: "numeric" | "2-digit" | undefined;
  day: "numeric" | "2-digit" | undefined;
  hour: "numeric" | "2-digit" | undefined;
  minute: "numeric" | "2-digit" | undefined;
  second: "numeric" | "2-digit" | undefined;
  hour12: boolean;
  timeZone: string;
};
export const dateConvert = (date: Date) => {
  const options: ObjectDateType = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/Vilnius",
  };
  const lithuanianDateTime = new Intl.DateTimeFormat("lt-LT", options).format(
    date
  );
  return lithuanianDateTime;
};
