import { readParameters } from './utils/auxiliary.utils';
import { getHoursCurrentWeek } from './utils/mite.utils';
import { formatMinutes } from './utils/time.utils';
import { addProgress } from './views/progress.view';

const widgetBackground = new Color('#222', 1);

const createWidget = (
  hours: number,
  current: number,
  hideLabels: boolean,
  collapse: boolean
): ListWidget => {
  const widget = new ListWidget();
  if (!collapse) {
    widget.backgroundColor = widgetBackground;
    widget.useDefaultPadding();
  } else {
    widget.backgroundColor = Color.clear();
    widget.setPadding(0, 0, 0, 0);
  }

  // add a pure circle
  addProgress(widget, current / 60 / hours, formatMinutes(current));

  return widget;
};

// we always need application parameters and the current week hours
const { context, token, hours = 40, hideLabels = false, collapse = false } = readParameters();
const current = context && token ? await getHoursCurrentWeek(context, token) : 12.5;
const widget = createWidget(hours, current, hideLabels, collapse);

if (config.runsInWidget) {
  Script.setWidget(widget);
} else if (config.runsInApp) {
  await widget.presentSmall();
} else {
  await QuickLook.present(widget, undefined as any);
}
Script.complete();

export {};
// ^^^ This export statement will be omitted in the final bundle

// if (config.runsInWidget) {
//   // Tell the widget on the Home Screen to show our ListWidget instance.
//   const widget = await createWidget(items);
//   Script.setWidget(widget);
// } else if (config.runsWithSiri) {
//   // Present a table with a subset of the news.
//   let firstItems = items.slice(0, 5);
//   // let table = createTable(firstItems);
//   // await QuickLook.present(table);
// } else {
//   // Present the full list of news.
//   // let table = createTable(items);
//   // await QuickLook.present(table);
// }
