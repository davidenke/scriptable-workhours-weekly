import { degreesToRadians, getPointAtAngle, getRelativeControlPoints } from '../utils/arc.utils';

export const getPercentageColor = (colors: Color[], percentage: number): Color => {
  return colors[Math.floor((colors.length - 1) * percentage)];
};

export const drawArc = (
  path: Path,
  fromPercentage: number,
  toPercentage: number,
  center: Point,
  radius: number,
  debug = false
) => {
  const fromRadians = degreesToRadians(360 * fromPercentage);
  const toRadians = degreesToRadians(360 * toPercentage);
  const start = getPointAtAngle(fromRadians, center, radius);
  const end = getPointAtAngle(toRadians, center, radius);
  const controls = getRelativeControlPoints(fromRadians, toRadians, center, radius);

  if (debug) {
    [start, end, ...controls].forEach(point => {
      path.move(point);
      path.addEllipse(new Rect(point.x, point.y, 1, 1));
    });
  }

  path.move(start);
  path.addCurve(end, ...controls);
};

export const createProgressCircle = (
  percentage: number,
  colors: Color[],
  size = 100,
  stroke = 10,
  debug = false
): DrawContext => {
  const context = new DrawContext();
  context.opaque = false;
  context.respectScreenScale = true;
  context.size = new Size(size, size);

  // draw background circle
  context.setLineWidth(stroke);
  context.setStrokeColor(new Color('#6fbad9', 0.3));
  context.strokeEllipse(new Rect(stroke / 2, stroke / 2, size - stroke, size - stroke));

  const color = getPercentageColor(colors, percentage);
  context.setStrokeColor(color);

  // draw circle segment
  const center = new Point(size / 2, size / 2);
  const radius = (size - stroke) / 2;

  // calculate amount of full path segments
  const max = 0.5;
  const arcs = percentage / max;
  const length = Math.floor(arcs);
  const delta = arcs - length;
  const path = new Path();

  // draw full segments
  Array.from({ length }, (_, index) =>
    drawArc(path, max * index, max * (index + 1), center, radius, debug)
  );

  // draw partial segment
  if (delta > 0) {
    const from = max * (length + 1);
    drawArc(path, from, from + delta, center, radius, debug);
  }

  context.addPath(path);
  context.strokePath();
  return context;
};
