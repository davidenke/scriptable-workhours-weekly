export const prepareUrl = (context: string, token: string): string => {
  return `https://${context}.mite.yo.lk/time_entries.json?api_key=${token}&user_id=current`;
};

export const pickMinutes = (response: any): number => {
  return response[0]?.time_entry_group?.minutes ?? 0;
};

export const getHoursCurrentWeek = async (context: string, token: string): Promise<number> => {
  let url = prepareUrl(context, token);
  url += `&at=this_week`;
  url += `&group_by=week`;
  return pickMinutes(await new Request(url).loadJSON());
};

export const getHoursLastWeek = async (context: string, token: string): Promise<number> => {
  let url = prepareUrl(context, token);
  url += `&at=last_week`;
  url += `&group_by=week`;
  return pickMinutes(await new Request(url).loadJSON());
};

export const getHoursToday = async (context: string, token: string): Promise<number> => {
  let url = prepareUrl(context, token);
  url += `&at=today`;
  url += `&group_by=day`;
  return pickMinutes(await new Request(url).loadJSON());
};
