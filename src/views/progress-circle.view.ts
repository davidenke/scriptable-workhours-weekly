import { degreesToRadians, getPointAtAngle, getRelativeControlPoints } from '../utils/arc.utils';

export const addArc = (
  path: Path,
  fromPercentage: number,
  toPercentage: number,
  center: Point,
  radius: number
) => {
  const fromRadians = degreesToRadians(360 * fromPercentage);
  const toRadians = degreesToRadians(360 * toPercentage);
  const start = getPointAtAngle(fromRadians, center, radius);
  const end = getPointAtAngle(toRadians, center, radius);
  const controls = getRelativeControlPoints(fromRadians, toRadians, center, radius);

  path.move(start);
  path.addCurve(end, ...controls);
};

export const addCap = (context: DrawContext, size: number, point: Point) => {
  context.fillEllipse(new Rect(point.x - size / 2, point.y - size / 2, size, size));
};

export const createProgressCircle = (
  percentage: number,
  background: Color,
  foreground: Color,
  labelColor: Color,
  label = '',
  font = 25,
  size = 100,
  stroke = 10
): DrawContext => {
  const center = new Point(size / 2, size / 2);
  const radius = (size - stroke) / 2;
  const assumedLineHeight = 1.25;

  // prepare draw context
  const path = new Path();
  const context = new DrawContext();
  context.opaque = false;
  context.respectScreenScale = true;
  context.size = new Size(size, size);
  context.setLineWidth(stroke);

  // draw background circle
  context.setStrokeColor(background);
  context.strokeEllipse(new Rect(stroke / 2, stroke / 2, size - stroke, size - stroke));

  // draw arc (and split if exceeding 180°)
  context.setStrokeColor(foreground);
  if (percentage > 0.5) {
    addArc(path, 0, 0.5, center, radius);
    addArc(path, 0.5, percentage, center, radius);
  } else {
    addArc(path, 0, percentage, center, radius);
  }

  // add path to context and add the stroke
  context.addPath(path);
  context.strokePath();

  // add rounded caps
  context.setFillColor(foreground);
  addCap(context, stroke, getPointAtAngle(degreesToRadians(0), center, radius));
  addCap(context, stroke, getPointAtAngle(degreesToRadians(360 * percentage), center, radius));

  // add label
  const innerSize = size - stroke * 2;
  const y = (size - font * assumedLineHeight) / 2;
  context.setTextAlignedCenter();
  context.setTextColor(labelColor);
  context.setFont(Font.mediumSystemFont(font));
  context.drawTextInRect(label, new Rect(stroke, y, innerSize, innerSize));

  // deliver result
  return context;
};
