import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { translations } from '../translations'

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Navbar() {
  const { lang, toggleLang } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const t = translations[lang].nav
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visitors, setVisitors]     = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const counted = sessionStorage.getItem('visited')
    const endpoint = counted
      ? 'https://api.countapi.xyz/get/ayoub-elyaakoubi-portfolio/visits'
      : 'https://api.countapi.xyz/hit/ayoub-elyaakoubi-portfolio/visits'

    fetch(endpoint)
      .then(r => r.json())
      .then(d => {
        if (!counted) sessionStorage.setItem('visited', '1')
        setVisitors(d.value)
      })
      .catch(() => {})
  }, [])

  const links = [
    { href: '#about',      label: t.about },
    { href: '#experience', label: t.experience },
    { href: '#skills',     label: t.skills },
    { href: '#projects',   label: t.projects },
    { href: '#club',       label: t.club },
    { href: '#contact',    label: t.contact },
  ]

  const navBg = scrolled
    ? isDark
      ? 'glass shadow-xl shadow-black/30'
      : 'bg-white/90 backdrop-blur-md shadow-md shadow-black/8 border-b border-[#d8d8ee]'
    : 'bg-transparent'

  const linkClass = isDark
    ? 'text-gray-400 hover:text-brand'
    : 'text-gray-500 hover:text-brand'

  const mobileLineClass = isDark ? 'bg-white' : 'bg-[#12122a]'

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-extrabold gradient-text tracking-tight">AY</a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`${linkClass} transition-colors duration-200 text-sm font-medium relative group`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand rounded transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          {/* ── Visitor counter ── */}
          {visitors !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`hidden sm:flex items-center gap-1.5 border px-3 py-1.5 rounded-full text-xs font-semibold ${
                isDark
                  ? 'bg-[#151433] border-[#252548] text-gray-300'
                  : 'bg-white border-[#d8d8ee] text-gray-600 shadow-sm'
              }`}
              title="Visiteurs uniques"
            >
              <svg className="w-3.5 h-3.5 text-brand" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <motion.span
                key={visitors}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {visitors.toLocaleString()}
              </motion.span>
            </motion.div>
          )}

          {/* ── Theme toggle ── */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border ${
              isDark
                ? 'bg-[#151433] border-[#252548] text-yellow-300 hover:border-yellow-400/50 hover:text-yellow-200'
                : 'bg-white border-[#d8d8ee] text-brand hover:border-brand/40 shadow-sm'
            }`}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.span key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1 }}
                  exit={{    rotate:  90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <SunIcon />
                </motion.span>
              ) : (
                <motion.span key="moon"
                  initial={{ rotate: 90,  opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1 }}
                  exit={{    rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MoonIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* ── Lang toggle ── */}
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1.5 border px-3.5 py-1.5 rounded-full text-sm font-bold transition-all duration-200 hover:border-brand ${
              isDark
                ? 'bg-[#151433] border-[#252548]'
                : 'bg-white border-[#d8d8ee] shadow-sm'
            }`}
          >
            <span className={lang === 'fr' ? 'text-brand' : 'text-gray-400'}>FR</span>
            <span className="text-gray-400 font-light">|</span>
            <span className={lang === 'en' ? 'text-brand' : 'text-gray-400'}>EN</span>
            <span className="text-gray-400 font-light">|</span>
            <span className={lang === 'ar' ? 'text-brand' : 'text-gray-400'}>ع</span>
          </button>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1.5"
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-6 ${mobileLineClass} rounded transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 ${mobileLineClass} rounded transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 w-6 ${mobileLineClass} rounded transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`md:hidden overflow-hidden border-t ${
              isDark
                ? 'glass border-[#252548]'
                : 'bg-white/95 border-[#d8d8ee]'
            }`}
          >
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-3.5 transition-colors text-sm font-medium hover:text-brand ${
                  isDark ? 'text-gray-300 hover:bg-[#151433]' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
