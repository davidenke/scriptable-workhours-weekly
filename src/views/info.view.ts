import { addProgress } from './progress.view';

export const addInfo = (
  widget: ListWidget | WidgetStack,
  progress: number,
  label: string,
  description?: string
) => {
  const info = widget.addStack();
  info.layoutVertically();
  addProgress(info, progress, label);

  if (description) {
    info.addSpacer(9); 
    const extra = info.addStack();
    extra.layoutHorizontally();

    extra.addSpacer(undefined as any);
    const text = extra.addText(description);
    extra.addSpacer(undefined as any);

    text.centerAlignText();
    text.font = Font.caption1();
  }
};
