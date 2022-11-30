export const degreesToRadians = (degrees: number): number => {
  const toRad = (angle: number): number => (angle * Math.PI) / 180;
  // to start on top, substract 90 degrees
  return toRad(degrees) - toRad(90);
};

// https://gist.github.com/arce/9dd11df69ad73e422c7a7b106f54c78e#file-arc-js-L69
export const getApproximationFactor = (start: number, end: number): number => {
  let arc = end - start;
  if (Math.abs(arc) > Math.PI) {
    arc -= Math.PI * 2;
    arc %= Math.PI * 2;
  }
  return (4 / 3) * Math.tan(arc / 4);
};

// https://gist.github.com/arce/9dd11df69ad73e422c7a7b106f54c78e#file-arc-js-L38
export const getRelativeControlPoints = (
  startRadians: number,
  endRadians: number,
  center: Point,
  radius: number
): [Point, Point] => {
  const factor = getApproximationFactor(startRadians, endRadians);
  const distToCtrPoint = Math.sqrt(radius * radius * (1 + factor * factor));
  const angle1 = startRadians + Math.atan(factor);
  const angle2 = endRadians - Math.atan(factor);

  return [
    new Point(
      center.x + Math.cos(angle1) * distToCtrPoint,
      center.y + Math.sin(angle1) * distToCtrPoint
    ),
    new Point(
      center.x + Math.cos(angle2) * distToCtrPoint,
      center.y + Math.sin(angle2) * distToCtrPoint
    )
  ];
};

// https://gist.github.com/arce/9dd11df69ad73e422c7a7b106f54c78e#file-arc-js-L61
export const getPointAtAngle = (radians: number, center: Point, radius: number): Point => {
  const x = center.x + radius * Math.cos(radians);
  const y = center.y + radius * Math.sin(radians);
  return new Point(x, y);
};
