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
export const dateConvert = (date: string | Date, region: string) => {
  try {
    const dateInput = new Date(date);
    const options: ObjectDateType = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: region ? region : "Europe/Vilnius",
    };
    const dateNew = new Intl.DateTimeFormat(undefined, options).format(
      dateInput as Date
    );
    const formattedDate = JSON.stringify(dateNew)
      .replace(/[TZ]/g, " ")
      .replace(/"/g, "")
      .slice(0, -3);
    return formattedDate;
  } catch (err) {
    console.error("Error in dateConvert:", err);
  }
};
