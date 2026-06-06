import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}

export default function About() {
  const { lang } = useLanguage()
  const t = translations[lang].about
  const isRtl = lang === 'ar'

  const infos = [
    { icon: '📍', label: t.location },
    { icon: '🎓', label: t.school },
    { icon: '✉️', label: t.email },
  ]

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand text-xs font-bold uppercase tracking-[0.2em]">{t.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">{t.title}</h2>
          <div className="mt-4 w-14 h-1 bg-gradient-to-r from-brand to-brand-light mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`space-y-5 ${isRtl ? 'text-right' : ''}`}
          >
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{t.p1}</p>
            <p className="text-gray-400 leading-relaxed">{t.p2}</p>

            <div className={`flex gap-4 pt-2 ${isRtl ? 'justify-end' : ''}`}>
              <a href="https://www.linkedin.com/in/ayoub-el-yaakoubi-513862243/" target="_blank" rel="noopener noreferrer"
                className="btn-glow bg-brand text-white text-sm font-bold px-5 py-2.5 rounded-full">
                {t.linkedin}
              </a>
              <a href="https://github.com/ayoubelyaakoubi" target="_blank" rel="noopener noreferrer"
                className="border border-[#252548] hover:border-brand text-gray-300 hover:text-brand text-sm font-medium px-5 py-2.5 rounded-full transition-all">
                {t.github}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-4"
          >
            {infos.map((info, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`glass rounded-2xl px-5 py-4 flex items-center gap-4 cursor-default ${isRtl ? 'flex-row-reverse' : ''}`}
              >
                <span className="text-2xl flex-shrink-0">{info.icon}</span>
                <span className="text-gray-300 text-sm font-medium">{info.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
