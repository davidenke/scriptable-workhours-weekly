import { readParameters } from './utils/param.utils';
import { createProgressCircle } from './views/progress-circle.view';

const colorBgStart = new Color('#13233F', 1);
const colorBgEnd = new Color('#141414', 1);
const colorLights = [
  new Color('#ec5858', 1),
  new Color('#f69153', 1),
  new Color('#ffca4d', 1),
  new Color('#e0d84f', 1),
  new Color('#c0e650', 1)
];

const createWidget = async (context: string, token: string): Promise<ListWidget> => {
  const gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [colorBgStart, colorBgEnd];

  const widget = new ListWidget();
  widget.backgroundGradient = gradient;
  widget.useDefaultPadding();

  const wrapper = widget.addStack();
  wrapper.layoutHorizontally();

  wrapper.addImage(createProgressCircle(0.6, colorLights, 100, 10, true).getImage());
  wrapper.addSpacer(18);

  const infos = wrapper.addStack();
  infos.addText(context ?? '');
  infos.addSpacer(18);
  infos.addText(token ?? '');

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
