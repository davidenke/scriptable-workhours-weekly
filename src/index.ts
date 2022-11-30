import { readParameters } from './utils/auxiliary.utils';
import { i18n } from './utils/i18n.utils';
import { addInfo } from './views/info.view';
import { addProgress } from './views/progress.view';

const widgetBackground = new Color('#222', 1);

const createWidget = async (context: string, token: string): Promise<ListWidget> => {
  const widget = new ListWidget();
  widget.backgroundColor = widgetBackground;
  widget.useDefaultPadding();

  const wrapper = widget.addStack();
  wrapper.layoutHorizontally();

  // current week hours
  addProgress(wrapper, 0.15, '12h');
  wrapper.addSpacer(18);

  // mini info container
  const infos = wrapper.addStack();
  infos.layoutHorizontally();
  addInfo(infos, 0.95, '6,25h', i18n('LABEL.TODAY'));
  infos.addSpacer(18);
  addInfo(infos, 0.75, '38,5h', i18n('LABEL.LAST_WEEK'));

  return widget;
};

const { context, token } = readParameters();
const widget = await createWidget(context, token);

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
