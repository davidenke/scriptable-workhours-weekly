import * as Translations from '../translations.json';

export const i18n = (key: keyof typeof Translations[keyof typeof Translations]): string => {
  let locale = Device.locale().slice(0, 2) as keyof typeof Translations;

  // align locale if needed
  const available = Object.keys(Translations);
  if (!available.includes(locale)) locale = 'en';

  // deliver the translation
  return Translations[locale][key];
};
