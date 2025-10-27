export const formatDateTime = (dateTime: string): string => {
  const date = new Date(dateTime.endsWith("Z") ? dateTime : dateTime + "Z");

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
