type WidgetParameters = {
  context: string;
  token: string;

  hours: number;
  collapse: boolean;
  hideLabels: boolean;
};

/**
 * Reads and delivers widget parameters.
 */
export const readParameters = (): Partial<WidgetParameters> => {
  const { collapse, context, token, hours, hideLabels } = JSON.parse(args.widgetParameter ?? '{}');
  return { collapse, context, token, hours, hideLabels };
};

/**
 * Picks an item close to the given percentage (0-1) from the given array.
 */
export const getItemNear = <T>(items: T[], percentage: number): T => {
  return items[Math.round((items.length - 1) * percentage)];
};
