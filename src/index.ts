type WidgetParameters = {
  context: string;
  token: string;
};

const colorBgStart = new Color('#13233F', 1);
const colorBgEnd = new Color('#141414', 1);
const colorLights = [
  new Color('#ec5858', 1),
  new Color('#f69153', 1),
  new Color('#ffca4d', 1),
  new Color('#e0d84f', 1),
  new Color('#c0e650', 1)
];

const readParameters = (): WidgetParameters => {
  const { context = 'context', token = 'token' } = JSON.parse(args.widgetParameter ?? '{}');
  return { context, token };
};

const createWidget = async (context: string, token: string): Promise<ListWidget> => {
  const gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [colorBgStart, colorBgEnd];

  const widget = new ListWidget();
  widget.backgroundGradient = gradient;
  widget.useDefaultPadding();

  const wrapper = widget.addStack();
  wrapper.layoutHorizontally();

  wrapper.addImage(createProgressCircle(0.6).getImage());
  wrapper.addSpacer(18);

  const infos = wrapper.addStack();
  infos.addText(context ?? '');
  infos.addSpacer(18);
  infos.addText(token ?? '');

  return widget;
};

const getPercentageColor = (percentage: number): Color => {
  return colorLights[Math.floor((colorLights.length - 1) * percentage)];
};

const createProgressCircle = (percentage: number, size = 100, stroke = 10): DrawContext => {
  const context = new DrawContext();
  context.opaque = false;
  context.respectScreenScale = true;
  context.size = new Size(size, size);

  // draw background circle
  context.setLineWidth(stroke);
  context.setStrokeColor(new Color('#6fbad9', 0.3));
  context.strokeEllipse(new Rect(stroke / 2, stroke / 2, size - stroke, size - stroke));

  const color = getPercentageColor(percentage);
  context.setStrokeColor(color);

  // draw circle segment
  const center = new Point(size / 2, size / 2);
  const radius = (size - stroke) / 2;

  const getPointOnCircle = (degrees: number): Point => {
    var radians = ((degrees - 90) * Math.PI) / 180;
    const x = center.x + radius * Math.cos(radians);
    const y = center.y + radius * Math.sin(radians);
    return new Point(x, y);
  };

  const drawArc = (from: number, to: number): Path => {
    const start = getPointOnCircle(360 * from);
    const mid = getPointOnCircle(360 * (to - from)); // @todo: calc control point instead of mid point
    const end = getPointOnCircle(360 * Math.max(to, from + 0.25));
    const segment = new Path();
    segment.move(start);
    segment.addQuadCurve(end, mid);
    return segment;
  };

  // calculate amount of full path segments
  const arcs = percentage / 0.25;
  const length = Math.floor(arcs);

  // draw full segments
  Array.from({ length }, (_, index) => {
    context.addPath(drawArc(0.25 * index, 0.25 * index + 0.25));
  });

  // draw partial segment
  if (length - arcs > 0) {
    context.addPath(drawArc(length * 0.25, length * 0.25 + length - arcs));
  }

  context.strokePath();
  return context;
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
