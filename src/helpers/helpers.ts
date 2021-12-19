export const isDateBeforeNow = (date: Date) => {
  const now = new Date();

  return date < now;
};
