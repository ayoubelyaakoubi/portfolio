import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

const LANGS = ['fr', 'en', 'ar']

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')
  const cycleLang = () => setLang(l => LANGS[(LANGS.indexOf(l) + 1) % LANGS.length])
  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang: cycleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
