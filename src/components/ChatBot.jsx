import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const PLACEHOLDERS = {
  fr: 'Posez votre question...',
  en: 'Ask me anything...',
  ar: 'اكتب سؤالك...',
}

const BUBBLE_MSG = {
  fr: '👋 Bonjour ! Une question sur mon profil, mes projets ou mes compétences ?',
  en: '👋 Hi! Any questions about my profile, projects or skills?',
  ar: '👋 مرحباً! هل لديك سؤال عن مساري أو مشاريعي؟',
}

const WELCOME = {
  fr: "Bonjour ! Je suis l'assistant d'Ayoub. Posez-moi vos questions.",
  en: "Hello! I'm Ayoub's assistant. Feel free to ask me anything.",
  ar: "مرحباً! أنا مساعد أيوب. اسألني ما تشاء.",
}

/* ─── Robot ──────────────────────────────────────────────────────────────── */
function Robot({ isOpen, size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── Antenna ── */}
      <line x1="40" y1="10" x2="40" y2="4" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round"/>
      <motion.circle cx="40" cy="3" r="3" fill="#818cf8"
        animate={{ opacity: [1, 0.3, 1], r: [3, 3.8, 3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* ── Head ── */}
      <rect x="18" y="10" width="44" height="28" rx="10" fill="#1e1b4b"/>
      <rect x="20" y="12" width="40" height="24" rx="8" fill="#312e81"/>

      {/* Eyes background */}
      <circle cx="31" cy="24" r="7" fill="#0f0e24"/>
      <circle cx="49" cy="24" r="7" fill="#0f0e24"/>

      {/* Eyes glow */}
      <motion.circle cx="31" cy="24" r="4.5" fill={isOpen ? '#34d399' : '#818cf8'}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <motion.circle cx="49" cy="24" r="4.5" fill={isOpen ? '#34d399' : '#818cf8'}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
      />
      {/* Eye shine */}
      <circle cx="33" cy="22" r="1.5" fill="white" opacity="0.7"/>
      <circle cx="51" cy="22" r="1.5" fill="white" opacity="0.7"/>

      {/* Mouth */}
      <path
        d={isOpen ? 'M29 32 Q40 39 51 32' : 'M29 33 Q40 38 51 33'}
        stroke="#818cf8" strokeWidth="2" strokeLinecap="round" fill="none"
      />

      {/* ── Body ── */}
      <rect x="20" y="40" width="40" height="26" rx="8" fill="#1e1b4b"/>
      <rect x="22" y="42" width="36" height="22" rx="6" fill="#312e81"/>

      {/* Chest LEDs */}
      <rect x="27" y="46" width="10" height="10" rx="3" fill="#0f0e24"/>
      <rect x="43" y="46" width="10" height="10" rx="3" fill="#0f0e24"/>
      <motion.circle cx="32" cy="51" r="3" fill="#818cf8"
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
      />
      <motion.circle cx="48" cy="51" r="3" fill="#34d399"
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      />

      {/* ── Left arm (static) ── */}
      <rect x="8" y="40" width="10" height="20" rx="5" fill="#312e81"/>
      <circle cx="13" cy="62" r="5" fill="#1e1b4b"/>

      {/* ── Right arm (waving) — rotate around shoulder (62, 40) ── */}
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}
        animate={isOpen
          ? { rotate: 0 }
          : { rotate: [0, -45, 0, -45, 0] }
        }
        transition={isOpen
          ? {}
          : { duration: 2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }
        }
      >
        <rect x="62" y="40" width="10" height="20" rx="5" fill="#312e81"/>
        <circle cx="67" cy="62" r="5" fill="#1e1b4b"/>
      </motion.g>

      {/* ── Legs ── */}
      <rect x="26" y="67" width="10" height="12" rx="5" fill="#312e81"/>
      <rect x="44" y="67" width="10" height="12" rx="5" fill="#312e81"/>
      <rect x="24" y="75" width="14" height="5" rx="2.5" fill="#1e1b4b"/>
      <rect x="42" y="75" width="14" height="5" rx="2.5" fill="#1e1b4b"/>
    </svg>
  )
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function SendIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
    </svg>
  )
}

function XIcon({ cls = 'w-4 h-4' }) {
  return (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  )
}

/* ─── Typing dots ────────────────────────────────────────────────────────── */
function TypingDots({ isDark }) {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="shrink-0"><Robot isOpen size={28}/></div>
      <div className={`rounded-2xl rounded-bl-sm px-4 py-3 ${isDark ? 'bg-[#1a1940] border border-[#252548]' : 'bg-gray-100'}`}>
        <div className="flex gap-1 items-center h-3.5">
          {[0,1,2].map(i => (
            <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-brand/70 block"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function ChatBot() {
  const { isDark } = useTheme()
  const { lang } = useLanguage()
  const [open, setOpen]           = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [messages, setMessages]   = useState([])
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 2000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const openChat = () => { setShowBubble(false); setOpen(true) }

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const userMsg = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Désolé, erreur.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Erreur de connexion.' }])
    } finally {
      setLoading(false)
    }
  }

  const isRtl = lang === 'ar'

  return (
    <>
      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className={`fixed bottom-28 right-5 z-50 w-[320px] rounded-2xl shadow-2xl flex flex-col overflow-hidden ${
              isDark ? 'bg-[#0d0c1d] border border-[#252548]' : 'bg-white border border-gray-200'
            }`}
            style={{ height: 420 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#312e81] to-brand px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <Robot isOpen size={36}/>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Ayoub El Yaakoubi</p>
                  <p className="text-white/70 text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"/>
                    AI Assistant · En ligne
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <XIcon cls="w-5 h-5"/>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3" dir={isRtl ? 'rtl' : 'ltr'}>
              {/* Welcome bubble */}
              <div className="flex items-end gap-2 mb-3">
                <div className="shrink-0"><Robot isOpen size={28}/></div>
                <div className={`max-w-[80%] rounded-2xl rounded-bl-sm px-3 py-2 text-xs leading-relaxed ${
                  isDark ? 'bg-[#1a1940] border border-[#252548] text-gray-200' : 'bg-gray-100 text-gray-800'
                }`}>
                  {WELCOME[lang]}
                </div>
              </div>

              {messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-2 mb-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="shrink-0"><Robot isOpen size={28}/></div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-brand text-white rounded-br-sm'
                      : isDark
                      ? 'bg-[#1a1940] border border-[#252548] text-gray-200 rounded-bl-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && <TypingDots isDark={isDark}/>}
              <div ref={bottomRef}/>
            </div>

            {/* Input */}
            <div className={`px-3 py-2.5 shrink-0 border-t ${isDark ? 'border-[#252548]' : 'border-gray-100'}`}>
              <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${
                isDark ? 'bg-[#151433] border border-[#252548]' : 'bg-gray-50 border border-gray-200'
              }`}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                  placeholder={PLACEHOLDERS[lang]}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  disabled={loading}
                  className={`flex-1 bg-transparent text-xs outline-none placeholder-gray-500 disabled:opacity-50 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 bg-brand hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed rounded-lg flex items-center justify-center text-white transition-colors shrink-0"
                >
                  <SendIcon/>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating robot + bubble ── */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">

        {/* Speech bubble */}
        <AnimatePresence>
          {showBubble && !open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`relative max-w-[210px] rounded-2xl rounded-br-sm px-4 py-3 pr-7 shadow-lg text-xs leading-snug ${
                isDark ? 'bg-[#1a1940] border border-[#252548] text-gray-100' : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              {BUBBLE_MSG[lang]}
              <button
                onClick={() => setShowBubble(false)}
                className={`absolute top-2 right-2 transition-colors ${
                  isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <XIcon cls="w-3 h-3"/>
              </button>
              {/* Arrow pointing down-right */}
              <span className={`absolute -bottom-[7px] right-6 w-3.5 h-3.5 rotate-45 ${
                isDark ? 'bg-[#1a1940] border-r border-b border-[#252548]' : 'bg-white border-r border-b border-gray-200'
              }`}/>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot button */}
        <motion.button
          onClick={openChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Open chat"
          className="relative"
        >
          <Robot isOpen={open} size={64}/>
          {/* Glow shadow */}
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-3 bg-brand/40 rounded-full blur-md pointer-events-none"
            animate={{ scaleX: [1, 1.4, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </div>
    </>
  )
}
