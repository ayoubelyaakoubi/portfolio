import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const timeline = {
  en: [
    {
      date: 'June 2020',
      title: 'Baccalaureate',
      subtitle: 'Taza, Morocco',
      description: 'Obtained the baccalaureate — first step toward a career in computer engineering.',
      tag: 'Education',
    },
    {
      date: 'Sept. 2020',
      title: 'Joined ENSA',
      subtitle: 'National School of Applied Sciences',
      description: 'Admitted to ENSA — beginning of a 5-year engineering program in applied sciences.',
      tag: 'Education',
    },
    {
      date: 'Sept. 2022',
      title: 'Computer Engineering',
      subtitle: 'ENSA — Specialization',
      description: 'Joined the Computer Engineering track — software development, systems and networks.',
      tag: 'Education',
    },
    {
      date: 'Jul. 2024',
      title: 'PFA Internship',
      subtitle: 'Full Stack Developer',
      description: 'Design and development of a full-stack web application — React + Spring Boot + MySQL.',
      tag: 'Internship',
    },
    {
      date: 'Feb. 2025',
      title: 'PFE Internship',
      subtitle: 'Mobile Developer',
      description: 'Development of a mobile banking application — React Native + Spring Boot + MySQL.',
      tag: 'Internship',
    },
    {
      date: 'Mar. 2026',
      title: 'Software Engineer',
      subtitle: 'Currently employed',
      description: 'Beginning career as a Full Stack Software Engineer — Java, Spring Boot, React, Docker & Kubernetes.',
      tag: 'Work',
      current: true,
    },
  ],
  fr: [
    {
      date: 'Juin 2020',
      title: 'Baccalauréat',
      subtitle: 'Taza, Maroc',
      description: 'Obtention du baccalauréat — première étape vers une carrière en ingénierie informatique.',
      tag: 'Études',
    },
    {
      date: 'Sept. 2020',
      title: 'Intégration à l\'ENSA',
      subtitle: 'École Nationale des Sciences Appliquées',
      description: 'Admission à l\'ENSA — début d\'un cursus d\'ingénieur de 5 ans en sciences appliquées.',
      tag: 'Études',
    },
    {
      date: 'Sept. 2022',
      title: 'Génie Informatique',
      subtitle: 'ENSA — Spécialisation',
      description: 'Intégration de la filière Génie Informatique — développement logiciel, systèmes et réseaux.',
      tag: 'Études',
    },
    {
      date: 'Juil. 2024',
      title: 'Stage PFA',
      subtitle: 'Développeur Full Stack',
      description: 'Conception et développement d\'une application web full-stack — React + Spring Boot + MySQL.',
      tag: 'Stage',
    },
    {
      date: 'Fév. 2025',
      title: 'Stage PFE',
      subtitle: 'Développeur Mobile',
      description: 'Développement d\'une application mobile bancaire — React Native + Spring Boot + MySQL.',
      tag: 'Stage',
    },
    {
      date: 'Mars 2026',
      title: 'Ingénieur Développeur',
      subtitle: 'En poste',
      description: 'Début de carrière en tant qu\'ingénieur développeur Full Stack — Java, Spring Boot, React, Docker & Kubernetes.',
      tag: 'Travail',
      current: true,
    },
  ],
  ar: [
    {
      date: 'يونيو 2020',
      title: 'البكالوريا',
      subtitle: 'تازة، المغرب',
      description: 'الحصول على شهادة البكالوريا — الخطوة الأولى نحو مسيرة في هندسة المعلوميات.',
      tag: 'دراسة',
    },
    {
      date: 'سبت. 2020',
      title: 'الالتحاق بـ ENSA',
      subtitle: 'المدرسة الوطنية للعلوم التطبيقية',
      description: 'القبول في ENSA — بداية مسار هندسي لمدة 5 سنوات في العلوم التطبيقية.',
      tag: 'دراسة',
    },
    {
      date: 'سبت. 2022',
      title: 'هندسة المعلوميات',
      subtitle: 'ENSA — التخصص',
      description: 'الالتحاق بتخصص هندسة المعلوميات — تطوير البرمجيات والأنظمة والشبكات.',
      tag: 'دراسة',
    },
    {
      date: 'يوليو 2024',
      title: 'تدريب PFA',
      subtitle: 'مطور Full Stack',
      description: 'تصميم وتطوير تطبيق ويب متكامل — React + Spring Boot + MySQL.',
      tag: 'تدريب',
    },
    {
      date: 'فبر. 2025',
      title: 'تدريب PFE',
      subtitle: 'مطور تطبيقات جوال',
      description: 'تطوير تطبيق جوال بنكي متكامل — React Native + Spring Boot + MySQL.',
      tag: 'تدريب',
    },
    {
      date: 'مارس 2026',
      title: 'مهندس مطوِّر',
      subtitle: 'في منصبي الحالي',
      description: 'بداية المسيرة المهنية كمهندس مطوِّر Full Stack — Java, Spring Boot, React, Docker & Kubernetes.',
      tag: 'عمل',
      current: true,
    },
  ],
}

const tagStyle = {
  'Études':     'bg-[#1e3a5f] text-blue-300',
  'Stage':      'bg-[#3a2a10] text-orange-300',
  'Travail':    'bg-[#0f2e1f] text-emerald-300',
  'Education':  'bg-[#1e3a5f] text-blue-300',
  'Internship': 'bg-[#3a2a10] text-orange-300',
  'Work':       'bg-[#0f2e1f] text-emerald-300',
  'دراسة':     'bg-[#1e3a5f] text-blue-300',
  'تدريب':     'bg-[#3a2a10] text-orange-300',
  'عمل':       'bg-[#0f2e1f] text-emerald-300',
}

export default function Experience() {
  const { lang } = useLanguage()
  const isRtl   = lang === 'ar'
  const items   = timeline[lang]
  const title   = lang === 'ar' ? 'مساري المهني' : lang === 'en' ? 'My Journey'   : 'Mon Parcours'
  const badge   = lang === 'ar' ? 'التجربة'       : lang === 'en' ? 'Experience'   : 'Expérience'
  const nowTxt  = lang === 'ar' ? 'الآن'          : lang === 'en' ? 'Now'          : 'Maintenant'

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand text-xs font-bold uppercase tracking-[0.2em]">{badge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">{title}</h2>
          <div className="mt-4 w-14 h-1 bg-gradient-to-r from-brand to-brand-light mx-auto rounded-full" />
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Dashed vertical line — desktop */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px hidden md:block"
            style={{
              backgroundImage: 'repeating-linear-gradient(to bottom, #252548 0px, #252548 8px, transparent 8px, transparent 16px)',
              transformOrigin: 'top center',
            }}
          />
          {/* Solid line — mobile */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute left-5 top-0 bottom-0 w-px bg-[#252548] md:hidden"
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-0">
            {items.map((item, i) => {
              const isLeft  = i % 2 === 0   // card on left side (desktop)
              const isCurrent = !!item.current

              return (
                <div key={i} className="relative md:grid md:grid-cols-[1fr_60px_1fr] pb-10">

                  {/* ── LEFT card (desktop) ── */}
                  <div className="hidden md:flex md:justify-end md:pr-3">
                    {isLeft && (
                      <div className="w-full">
                        <BubbleCard item={item} side="left" isCurrent={isCurrent} lang={lang} index={i} />
                      </div>
                    )}
                  </div>

                  {/* ── Center column: dot + date ── */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden md:flex flex-col items-center pt-[18px] gap-1.5 z-10"
                  >
                    <div className={`relative w-3.5 h-3.5 rounded-full border-2 border-[#0d0c1d] ${isCurrent ? 'bg-brand' : 'bg-[#444470]'}`}>
                      {isCurrent && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-brand opacity-50" />
                      )}
                    </div>
                    <span className={`text-[10px] font-bold whitespace-nowrap px-2 py-0.5 rounded border ${
                      isCurrent
                        ? 'text-brand border-brand/40 bg-brand/10'
                        : 'text-gray-500 border-[#252548] bg-[#0d0c1d]'
                    }`}>
                      {isCurrent ? nowTxt : item.date}
                    </span>
                  </motion.div>

                  {/* ── RIGHT card (desktop) ── */}
                  <div className="hidden md:flex md:pl-3">
                    {!isLeft && (
                      <div className="w-full">
                        <BubbleCard item={item} side="right" isCurrent={isCurrent} lang={lang} index={i} />
                      </div>
                    )}
                  </div>

                  {/* ── Mobile dot ── */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-5 top-5 -translate-x-1/2 z-10 md:hidden"
                  >
                    <div className={`w-3 h-3 rounded-full border-2 border-[#0d0c1d] ${isCurrent ? 'bg-brand' : 'bg-[#444470]'}`}>
                      {isCurrent && <span className="absolute inset-0 rounded-full animate-ping bg-brand opacity-50" />}
                    </div>
                  </motion.div>

                  {/* ── Mobile card ── */}
                  <div className="ml-12 pb-8 md:hidden w-full">
                    <BubbleCard item={item} side="right" isCurrent={isCurrent} lang={lang} mobile index={i} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Speech-bubble card ── */
function BubbleCard({ item, side, isCurrent, lang, mobile, index }) {
  const isRtl = lang === 'ar'
  const fromLeft = (side === 'left' && !mobile)

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -80 : 80, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative pt-2"
    >
      {/* Arrow tail — left card points right toward center */}
      {side === 'left' && !mobile && (
        <span
          className="absolute top-5 -right-[10px] w-4 h-4 rotate-45 z-0"
          style={{
            background: isCurrent ? '#1a0d05' : '#131326',
            borderTop:  `1px solid ${isCurrent ? 'rgba(230,57,70,0.4)' : '#252548'}`,
            borderRight:`1px solid ${isCurrent ? 'rgba(230,57,70,0.4)' : '#252548'}`,
          }}
        />
      )}
      {/* Arrow tail — right card points left toward center */}
      {side === 'right' && !mobile && (
        <span
          className="absolute top-5 -left-[10px] w-4 h-4 rotate-45 z-0"
          style={{
            background: isCurrent ? '#1a0d05' : '#131326',
            borderBottom:`1px solid ${isCurrent ? 'rgba(230,57,70,0.4)' : '#252548'}`,
            borderLeft:  `1px solid ${isCurrent ? 'rgba(230,57,70,0.4)' : '#252548'}`,
          }}
        />
      )}

      {/* Card body */}
      <div
        className={`relative z-10 rounded-xl p-4 sm:p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
          isCurrent
            ? 'bg-[#1a0d05] border-brand/40 shadow-brand/15'
            : 'bg-[#131326] border-[#252548] hover:border-[#353560]'
        }`}
      >
        {/* Tag + current badge */}
        <div className={`flex items-center gap-2 mb-2 flex-wrap ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tagStyle[item.tag]}`}>
            {item.tag}
          </span>
          {isCurrent && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-brand">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse inline-block" />
              {lang === 'ar' ? 'حالياً' : lang === 'en' ? 'Current' : 'Maintenant'}
            </span>
          )}
          {/* Mobile date */}
          <span className="md:hidden text-[10px] text-gray-500 ml-auto">{item.date}</span>
        </div>

        {/* Title */}
        <h3 className={`font-extrabold text-sm sm:text-base leading-tight ${isCurrent ? 'text-brand' : 'text-white'}`}>
          {item.title}
        </h3>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5 mb-2">{item.subtitle}</p>
        <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}
