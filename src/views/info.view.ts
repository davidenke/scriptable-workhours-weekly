import { addProgress } from './progress.view';

export const addInfo = (
  widget: ListWidget | WidgetStack,
  progress: number,
  label: string,
  description?: string
) => {
  const info = widget.addStack();
  info.layoutVertically();

  const circle = info.addStack();
  circle.layoutHorizontally();
  circle.centerAlignContent();

  circle.addSpacer(undefined as any);
  addProgress(circle, progress, label);
  circle.addSpacer(undefined as any);

  if (description) {
    info.addSpacer(9); 
    const extra = info.addStack();
    extra.layoutHorizontally();
    extra.centerAlignContent();

    extra.addSpacer(undefined as any);
    const text = extra.addText(description);
    extra.addSpacer(undefined as any);

    text.centerAlignText();
    text.font = Font.caption1();
  }
};
