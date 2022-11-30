export const formatMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const left = 10 / (60 / Math.round(minutes % 60));
  if (left === 0) return `${hours}h`;
  return `${hours},${left}h`;
};
