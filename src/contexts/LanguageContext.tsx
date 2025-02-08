import React, { createContext, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import arabicMessages from '../locales/ar.json';
import englishMessages from '../locales/en.json';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const messages = {
  en: englishMessages,
  ar: arabicMessages,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  const toggleLanguage = () => {
    setLanguage((prevLang) => {
      const newLang = prevLang === 'en' ? 'ar' : 'en';
      localStorage.setItem('language', newLang);
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <IntlProvider messages={messages[language]} locale={language}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};