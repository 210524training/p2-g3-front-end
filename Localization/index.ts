import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './banks/en';
import es from './banks/es';
import Bank from './banks/type';

i18n.fallbacks = true;

i18n.locale = Localization.locale;

i18n.translations = {
  en,
  es,
};

const t = (key: keyof Bank, options?: i18n.TranslateOptions): string => {
  return i18n.t(key, options);
};

export default t;