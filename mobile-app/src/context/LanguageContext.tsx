import { setLanguage as seti18Language, setLanguage } from "@/utils/i18n";
import { createContext, useContext, useState } from "react";

type Lang = 'ar' | 'en';

const LanguageContext = createContext({
    lang: 'ar' as Lang,
    setLang: (lang: Lang) => {},
});

export function 
LanguageProvider({children}: any ) {
    const [lang, setLangState] = useState<Lang>('ar');

    const setLang = (newLang: Lang) => {
        setLangState(newLang);
        seti18Language(newLang);
    };
    return (
    <LanguageContext.Provider value={{ lang, setLang }}>
        {children}
    </LanguageContext.Provider>
    );
} 

export const useLanguage = () => useContext(LanguageContext);