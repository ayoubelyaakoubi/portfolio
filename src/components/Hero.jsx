import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.7, ease: "easeOut" },
  }),
};

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const isRtl = lang === "ar";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Petits carrés décoratifs flottants */}
      <div className="absolute top-24 right-[38%] w-3 h-3 bg-brand rotate-45 opacity-70 pointer-events-none" />
      <div className="absolute bottom-36 right-[18%] w-2 h-2 bg-brand/60 rotate-45 pointer-events-none" />
      <div className="absolute top-1/3 left-[4%] w-2 h-2 bg-brand/50 rotate-45 pointer-events-none" />
      <div className="absolute bottom-24 left-[12%] w-2.5 h-2.5 bg-brand/40 rotate-45 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full pt-24 pb-16 relative z-10">
        <div
          className={`grid md:grid-cols-2 gap-14 items-center ${isRtl ? "" : ""}`}
        >
          <div
            className={`space-y-7 ${isRtl ? "text-right md:order-2" : "md:order-1"}`}
          >
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-block text-brand font-semibold tracking-widest text-xs uppercase"
            >
              {t.greeting}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-tight"
            >
              <span className="gradient-text">{t.name}</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-0.5 bg-brand rounded" />
              <h2 className="text-xl sm:text-2xl text-gray-300 font-semibold">
                {t.role}
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg"
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className={`flex flex-wrap gap-4 ${isRtl ? "justify-end" : ""}`}
            >
              <a
                href="#projects"
                className="btn-glow bg-brand hover:bg-brand-dark text-white font-bold px-7 py-3 rounded-full transition-all duration-200 text-sm"
              >
                {t.cta1}
              </a>
              <a
                href="#contact"
                className="border-2 border-brand text-brand hover:bg-brand/10 font-bold px-7 py-3 rounded-full transition-all duration-200 text-sm"
              >
                {t.cta2}
              </a>
              <a
                href="/assets/reports/AYOUB EL YAAKOUBI Cv.pdf"
                download
                className="flex items-center gap-2 border-2 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold px-6 py-3 rounded-full transition-all duration-200 text-sm hover:border-emerald-500"
              >
                <DownloadIcon />
                {lang === "ar" ? "تحميل السيرة" : "Mon CV"}
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className={`flex gap-5 ${isRtl ? "justify-end" : ""}`}
            >
              <a
                href="https://www.linkedin.com/in/ayoub-el-yaakoubi-513862243/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-brand transition-colors duration-200 text-sm font-medium"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <a
                href="https://github.com/ayoubelyaakoubi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-brand transition-colors duration-200 text-sm font-medium"
              >
                <GitHubIcon />
                GitHub
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            className={`flex justify-center relative ${isRtl ? "md:order-1" : "md:order-2"}`}
          >
            {/* Grand cercle rouge — exactement derrière la photo */}
            <div className="absolute w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] rounded-full bg-brand z-0 animate-pulse-slow" />

            <div className="relative z-10">
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/10 animate-float shadow-2xl">
                <img
                  src="/assets/img/profile.jpg"
                  alt="Ayoub El Yaakoubi"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-3 -right-4 glass rounded-2xl px-4 py-2.5 text-xs font-bold shadow-lg"
              >
                <span className="text-brand">Full Stack</span>
                <span className="text-gray-300"> Developer</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -top-3 -left-4 glass rounded-2xl px-3 py-2 text-xs font-semibold shadow-lg"
              >
                <span className="text-green-400">● </span>
                <span className="text-gray-300">
                  {lang === "ar" ? "متاح للعمل" : "Disponible"}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <a
          href="#about"
          className="text-gray-600 hover:text-brand transition-colors flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-brand/60 to-transparent"
          />
        </a>
      </motion.div>
    </section>
  );
}
