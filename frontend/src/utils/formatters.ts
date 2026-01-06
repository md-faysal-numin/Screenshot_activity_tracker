import { format, parseISO } from "date-fns";

export const formatDate = (
  date: string | Date,
  formatStr: string = "MMM dd, yyyy"
): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const formatTime = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "hh:mm a");
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMM dd, yyyy hh:mm a");
};

export const getDateString = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

export const parseTimeString = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const convertUTCHourToLocal = (utcHour: number): number => {
  // Create a date in UTC with the given hour
  const now = new Date();
  const utcDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      utcHour,
      0,
      0
    )
  );

  // Get local hour
  return utcDate.getHours();
};
export const convertUTCTimeToLocal = (utcTimeStr: string): string => {
  const [hours, minutes] = utcTimeStr.split(":");
  const utcHour = parseInt(hours);
  const utcMinute = parseInt(minutes);

  // Create a date in UTC with the given time
  const now = new Date();
  const utcDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      utcHour,
      utcMinute,
      0
    )
  );

  // Get local time components
  const localHour = utcDate.getHours();
  const localMinute = utcDate.getMinutes();

  // Return as HH:mm
  return `${localHour.toString().padStart(2, "0")}:${localMinute
    .toString()
    .padStart(2, "0")}`;
};

export const formatLocalTime = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};
export const getUserTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
