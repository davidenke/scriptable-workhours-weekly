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
  const {
    context = SWW_CONTEXT,
    token = SWW_TOKEN,
    collapse,
    hours,
    hideLabels
  } = JSON.parse(args.widgetParameter ?? '{}');
  return { context, token, collapse, hours, hideLabels };
};

/**
 * Picks an item close to the given percentage (0-1) from the given array.
 */
export const getItemNear = <T>(items: T[], percentage: number): T => {
  const limited = Math.max(0, Math.min(percentage, .9));
  return items[Math.floor(limited * items.length)];
};
