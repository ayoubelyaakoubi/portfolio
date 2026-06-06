import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function SendIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
}

export default function Contact() {
  const { lang } = useLanguage()
  const t = translations[lang].contact
  const isRtl = lang === 'ar'

  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name:  form.name,
          user_email: form.email,
          comment:    `Objet: ${form.subject}\n\n${form.message}`,
          reply_to:   form.email,
        },
        PUBLIC_KEY,
      )
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-brand text-xs font-bold uppercase tracking-[0.2em]">{t.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">{t.title}</h2>
          <div className="mt-4 w-14 h-1 bg-gradient-to-r from-brand to-brand-light mx-auto rounded-full" />
          <p className="mt-5 text-gray-400 text-sm leading-relaxed">{t.subtitle}</p>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-7 sm:p-9 space-y-5"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <motion.div variants={fadeUp}>
              <label className={`block text-xs text-gray-400 mb-2 font-medium ${isRtl ? 'text-right' : ''}`}>{t.name}</label>
              <input
                name="name" value={form.name} onChange={handleChange} required
                className="w-full bg-[#0d0c1d] border border-[#252548] rounded-xl px-4 py-3 text-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <label className={`block text-xs text-gray-400 mb-2 font-medium ${isRtl ? 'text-right' : ''}`}>{t.email}</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange} required
                className="w-full bg-[#0d0c1d] border border-[#252548] rounded-xl px-4 py-3 text-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </motion.div>
          </div>

          <motion.div variants={fadeUp}>
            <label className={`block text-xs text-gray-400 mb-2 font-medium ${isRtl ? 'text-right' : ''}`}>{t.subject}</label>
            <input
              name="subject" value={form.subject} onChange={handleChange} required
              placeholder={t.subjectPlaceholder}
              className="w-full bg-[#0d0c1d] border border-[#252548] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <label className={`block text-xs text-gray-400 mb-2 font-medium ${isRtl ? 'text-right' : ''}`}>{t.message}</label>
            <textarea
              name="message" value={form.message} onChange={handleChange} required rows={5}
              placeholder={t.messagePlaceholder}
              className="w-full bg-[#0d0c1d] border border-[#252548] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </motion.div>

          {/* Error banner */}
          <AnimatePresence>
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-xs text-center"
              >
                {lang === 'ar'
                  ? 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.'
                  : "Erreur lors de l'envoi. Réessayez ou écrivez directement à l'adresse ci-dessous."}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div variants={fadeUp} className={`flex items-center justify-between gap-4 flex-wrap ${isRtl ? 'flex-row-reverse' : ''}`}>
            <a
              href="mailto:ayoub.elyaakoubi20@ump.ac.ma"
              className="text-brand hover:text-brand-light text-xs font-medium transition-colors"
            >
              ayoub.elyaakoubi20@ump.ac.ma
            </a>

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="btn-glow bg-brand hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-7 py-3 rounded-full text-sm flex items-center gap-2 transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                {status === 'loading' ? (
                  <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    {t.sending}
                  </motion.span>
                ) : status === 'success' ? (
                  <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2">
                    ✅ {t.success}
                  </motion.span>
                ) : (
                  <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-2">
                    <SendIcon /> {t.send}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </motion.form>

      </div>
    </section>
  )
}
