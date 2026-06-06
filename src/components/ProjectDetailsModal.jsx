import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { getTechByName } from '../data/technologies'

function GithubIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.237-1.673-2.237-1.066 0-1.684.721-1.96 1.414-.101.247-.126.592-.126.937v5.455h-3.554s.048-8.849 0-9.767h3.554v1.385c-.009.015-.021.029-.031.042h.031v-.042c.43-.664 1.195-1.612 2.905-1.612 2.127 0 3.716 1.39 3.716 4.375v5.619zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.704 0-.957.771-1.703 1.96-1.703 1.188 0 1.915.746 1.938 1.703 0 .946-.75 1.704-1.983 1.704zm1.581 11.597H3.635V9.685h3.283v10.767zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}


export default function ProjectDetailsModal({ project, isOpen, onClose, lang }) {
  const { isDark } = useTheme()
  const isRtl = lang === 'ar'

  if (!project) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl ${
              isDark ? 'bg-[#151433] border border-[#252548]' : 'bg-white border border-[#d8d8ee]'
            }`}
          >
            {/* Header */}
            <div className={`relative px-6 sm:px-8 py-6 border-b ${
              isDark ? 'border-[#252548] bg-[#0d0c1d]' : 'border-[#d8d8ee] bg-[#f0f0fa]'
            }`}>
              <button
                onClick={onClose}
                className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'hover:bg-[#252548] text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Close"
              >
                <CloseIcon />
              </button>
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold">{project.title}</h2>
                <p className="text-brand text-sm font-bold mt-2">{project.label}</p>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 120px)' }}>
              <div className="px-6 sm:px-8 py-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-brand mb-3">
                    {lang === 'ar' ? 'الوصف' : 'Description'}
                  </h3>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {project.details?.longDescription || project.detailedDescription || project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-bold text-brand mb-4">
                    {lang === 'ar' ? 'التقنيات المستخدمة' : 'Technologies'}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {project.tech.map((tech, i) => {
                      const techData = getTechByName(tech);
                      return (
                        <a
                          key={i}
                          href={techData?.docs || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer group ${
                            isDark
                              ? 'bg-[#0f0e24] border-brand/20 hover:border-brand/50 hover:bg-[#151433]'
                              : 'bg-gray-50 border-brand/20 hover:border-brand/50 hover:bg-gray-100'
                          }`}
                          title={techData ? `Click to view ${tech} docs` : tech}
                        >
                          {techData?.logo ? (
                            <img
                              src={techData.logo}
                              alt={tech}
                              className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-brand/20 text-brand' : 'bg-brand/10 text-brand'}`}>
                              {tech.charAt(0)}
                            </div>
                          )}
                          <span className="text-xs font-medium text-center group-hover:text-brand transition-colors">{tech}</span>
                        </a>
                      );
                    })}
                  </div>
                  <p className={`text-xs mt-3 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                    💡 {lang === 'ar' ? 'اضغط على أي تقنية لعرض الوثائق' : 'Click any tech to view documentation'}
                  </p>
                </div>

                {/* Key Features (if available) */}
                {(project.details?.features || project.features) && (project.details?.features || project.features).length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-brand mb-3">
                      {lang === 'ar' ? 'المميزات الرئيسية' : 'Key Features'}
                    </h3>
                    <ul className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {(project.details?.features || project.features).map((feature, i) => (
                        <li key={i} className={`flex ${isRtl ? 'flex-row-reverse' : ''} gap-3`}>
                          <span className="text-brand font-bold mt-0.5">•</span>
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Links */}
                <div>
                  <h3 className="text-lg font-bold text-brand mb-3">
                    {lang === 'ar' ? 'الروابط' : 'Links'}
                  </h3>
                  <div className={`flex flex-wrap gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    {/* LinkedIn link from details */}
                    {project.details?.linkedinUrl && (
                      <a
                        href={project.details.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                          isDark
                            ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400'
                            : 'bg-blue-600/10 hover:bg-blue-600/20 text-blue-600'
                        }`}
                      >
                        <LinkedinIcon />
                        {project.details.linkedinLabel || 'LinkedIn'}
                      </a>
                    )}

                    {/* Other project links */}
                    {project.links && project.links.map((link, i) => (
                      link.href && (
                        <a
                          key={i}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                            isDark
                              ? 'bg-brand/20 hover:bg-brand/30 text-brand'
                              : 'bg-brand/10 hover:bg-brand/20 text-brand'
                          }`}
                        >
                          {link.label === 'LinkedIn' ? (
                            <LinkedinIcon />
                          ) : link.label === 'Vidéo Demo' || link.label === 'عرض الفيديو' ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          ) : (
                            <GithubIcon />
                          )}
                          {link.label}
                        </a>
                      )
                    ))}

                    {/* Report download */}
                    {(project.details?.reportPath || project.reportUrl) && (
                      <a
                        href={project.details?.reportPath || project.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                          isDark
                            ? 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400'
                            : 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-600'
                        }`}
                      >
                        <DownloadIcon />
                        {project.details?.downloadLabel || (lang === 'ar' ? 'تحميل الرسالة' : lang === 'en' ? 'Download Report' : 'Télécharger Rapport')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
