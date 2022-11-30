import { addProgress } from './progress.view';

export const addInfo = (
  widget: ListWidget | WidgetStack,
  progress: number,
  label: string,
  text: string
) => {
  const info = widget.addStack();
  info.layoutVertically();
  addProgress(info, progress, label);
  info.addSpacer(9);
  info.addText(text);
};
