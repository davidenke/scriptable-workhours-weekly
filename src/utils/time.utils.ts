export const formatHours = Intl.NumberFormat('de-DE', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0
}).format;

export const formatMinutes = (minutes: number, precision = 0.25): string => {
  const hours = Math.floor(minutes / 60 / precision) * precision;
  return `${formatHours(hours)}h`;
};
