type WidgetParameters = {
  context: string;
  token: string;
};

export const readParameters = (): WidgetParameters => {
  const { context = 'context', token = 'token' } = JSON.parse(args.widgetParameter ?? '{}');
  return { context, token };
};
