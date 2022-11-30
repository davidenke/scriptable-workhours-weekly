type WidgetParameters = {
  context: string;
  token: string;
  hours: number;
};

/**
 * Reads and delivers widget parameters.
 */
export const readParameters = (): WidgetParameters => {
  const { context = 'www', token = 'XXX', hours = 40 } = JSON.parse(args.widgetParameter ?? '{}');
  return { context, token, hours };
};

/**
 * Picks an item close to the given percentage (0-1) from the given array.
 */
export const getItemNear = <T>(items: T[], percentage: number): T => {
  return items[Math.round((items.length - 1) * percentage)];
};