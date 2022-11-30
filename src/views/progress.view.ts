import { getItemNear } from '../utils/auxiliary.utils';
import { getSystemColor } from '../utils/color.utils';
import { createProgressCircle } from './progress-circle.view';

export const progressBackground = new Color('#3f3f42', 1);
export const progressForegrounds = [
  getSystemColor('red'),
  getSystemColor('orange'),
  getSystemColor('yellow'),
  getSystemColor('green')
];
export const progressColor = new Color('#fff', 1);

export const addProgress = (stack: WidgetStack, percentage: number, label: string) => {
  const progressForeground = getItemNear(progressForegrounds, percentage);
  const progress = createProgressCircle(
    percentage,
    progressBackground,
    progressForeground,
    progressColor,
    label
  );
  stack.addImage(progress.getImage());
};
