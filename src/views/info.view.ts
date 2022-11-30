import { addProgress } from './progress.view';

export const addInfo = (
  widget: ListWidget | WidgetStack,
  progress: number,
  label: string,
  description: string
) => {
  const info = widget.addStack();
  info.layoutVertically();
  addProgress(info, progress, label, 23);

  info.addSpacer(9);

  const text = info.addStack();
  text.layoutHorizontally();
  text.addSpacer(undefined as any);
  text.addText(description).centerAlignText();
  text.addSpacer(undefined as any);
};
