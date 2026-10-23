const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Months since year 0, so month arithmetic is plain integer math. */
export const toMonthIndex = (yearMonth: string) => {
  const [year, month] = yearMonth.split("-").map(Number);
  return year * 12 + (month - 1);
};

export const currentMonthIndex = () => {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
};

export const monthName = (index: number) => MONTHS[index % 12];

export const yearOf = (index: number) => Math.floor(index / 12);

export const formatMonth = (index: number) =>
  `${monthName(index)} ${yearOf(index)}`;

export const formatSpan = (months: number) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest || !years) parts.push(`${rest} mo${rest === 1 ? "" : "s"}`);
  return parts.join(" ");
};
