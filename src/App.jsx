import { useEffect } from 'react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Club from './components/Club'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

function AppContent() {
  const { lang } = useLanguage()
  const { isDark } = useTheme()

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-[#0d0c1d] text-white' : 'bg-[#f0f0fa] text-[#12122a]'
    } ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Club />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}
