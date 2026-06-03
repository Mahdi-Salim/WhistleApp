import ar from './ar';
import en from './en';

const translations = {
  ar,
  en,
};

let currentLanguage: 'ar' | 'en' = 'ar';

export const setLanguage = (lang: 'ar' | 'en') => {
    currentLanguage = lang;
  
};

export const t = (key: keyof typeof ar) => {
    return translations[currentLanguage][key] || key;
};