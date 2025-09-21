export const formatTime = (time: Date) => {
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return timeFormatter.format(time);
};
