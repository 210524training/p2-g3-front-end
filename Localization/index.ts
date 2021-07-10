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

/**
 * 
 * @param key key value of the desired translation.
 * @returns returns the appropriate transaltion 
 * (from the provided bank) depending on the user's locale.
 */
const t = (key: keyof Bank, options?: i18n.TranslateOptions) => {
  return i18n.t(key, options);
};

export default t;