import { readParameters } from './utils/auxiliary.utils';
import { i18n } from './utils/i18n.utils';
import { getHoursCurrentWeek, getHoursLastWeek, getHoursToday } from './utils/mite.utils';
import { formatMinutes } from './utils/time.utils';
import { addInfo } from './views/info.view';
import { addProgress } from './views/progress.view';

const widgetBackground = new Color('#222', 1);

const createWidget = async (
  hours: number,
  current: number,
  last: number,
  today: number
): Promise<ListWidget> => {
  const widget = new ListWidget();
  widget.backgroundColor = widgetBackground;
  widget.useDefaultPadding();

  const wrapper = widget.addStack();
  wrapper.layoutHorizontally();
  wrapper.centerAlignContent();

  // current week hours
  const currentWeekProgress = current / 60 / hours;
  const currentWeekFormatted = formatMinutes(current);
  addInfo(wrapper, currentWeekProgress, currentWeekFormatted, i18n('LABEL.CURRENT_WEEK'));

  // info container
  const infos = wrapper.addStack();
  infos.layoutHorizontally();

  // last week hours
  const lastWeekProgress = last / 60 / hours;
  const lastWeekFormatted = formatMinutes(last);
  addInfo(infos, lastWeekProgress, lastWeekFormatted, i18n('LABEL.LAST_WEEK'));

  // todays hours
  const todayProgress = today / 60 / (hours / 5);
  const todayFormatted = formatMinutes(today);
  addInfo(infos, todayProgress, todayFormatted, i18n('LABEL.TODAY'));

  return widget;
};

const { context, token, hours = 40 } = readParameters();
const current = context && token ? await getHoursCurrentWeek(context, token) : 12.5;
const last = context && token ? await getHoursLastWeek(context, token) : 38.75;
const today = context && token ? await getHoursToday(context, token) : 3.25;
const widget = await createWidget(hours, current, last, today);

if (!config.runsInWidget) {
  widget.presentMedium();
} else {
  Script.setWidget(widget);
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
