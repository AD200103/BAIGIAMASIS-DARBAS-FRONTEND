import "dotenv/config";
type DateOptionType = {
  hour: "2-digit" | "numeric" | undefined;
  minute: "2-digit" | "numeric" | undefined;
  hour12?: boolean;
  timeZone?: string;
};
export const dateConvert = (date: Date) => {
  const options: DateOptionType = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Vilnius",
  } as DateOptionType;
  const formattedTime = new Intl.DateTimeFormat("lt-LT", options).format(date);
  return formattedTime;
};
