import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

/* ─── Keyboard rows ─── */
const KB_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];
const ALL_KEYS = KB_ROWS.flat();

const TERMINAL_LINES = [
  'git commit -m "feat: new feature 🚀"',
  "docker-compose up --build",
  "mvn spring-boot:run",
  "npm run dev",
  "kubectl apply -f deployment.yaml",
  "git push origin main",
];

function AnimatedKeyboard() {
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      const k = ALL_KEYS[Math.floor(Math.random() * ALL_KEYS.length)];
      setActiveKey(k);
      setTimeout(() => setActiveKey(null), 130);
    }, 170);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex-shrink-0 select-none">
      {KB_ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-[3px] mb-[3px] justify-center">
          {row.map((key) => (
            <motion.div
              key={key}
              animate={
                activeKey === key
                  ? {
                      y: 2,
                      scale: 0.9,
                      backgroundColor: "rgba(230,57,70,0.45)",
                    }
                  : { y: 0, scale: 1, backgroundColor: "rgba(37,37,72,0.9)" }
              }
              transition={{ duration: 0.08 }}
              className="w-[18px] h-[18px] sm:w-5 sm:h-5 rounded-[3px] text-[7px] sm:text-[8px] font-bold flex items-center justify-center text-gray-400 border border-[#353560] shadow-[0_2px_0_rgba(0,0,0,0.5)]"
            >
              {key}
            </motion.div>
          ))}
        </div>
      ))}
      {/* Space bar */}
      <div className="flex justify-center mt-[3px]">
        <motion.div
          animate={
            activeKey === null
              ? { y: 0, backgroundColor: "rgba(37,37,72,0.9)" }
              : { y: 1, backgroundColor: "rgba(37,37,72,0.9)" }
          }
          className="w-24 h-[18px] sm:h-5 rounded-[3px] border border-[#353560] shadow-[0_2px_0_rgba(0,0,0,0.5)]"
        />
      </div>
    </div>
  );
}

function LaptopScreen({ text, blinkOn }) {
  return (
    <div className="flex-shrink-0 w-36 sm:w-44">
      {/* Monitor */}
      <div className="bg-[#0a0918] rounded-lg border border-[#252548] p-2 shadow-lg shadow-brand/10">
        {/* Traffic lights */}
        <div className="flex gap-1 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-green-500/80" />
        </div>
        {/* Code lines decoratives */}
        <div className="space-y-1 mb-1.5">
          <div className="h-1 w-3/4 bg-violet-500/30 rounded-full" />
          <div className="h-1 w-1/2 bg-brand/25 rounded-full" />
          <div className="h-1 w-5/6 bg-cyan-500/25 rounded-full" />
        </div>
        {/* Active typing line */}
        <div className="flex items-center gap-0.5 bg-[#151433] rounded px-1.5 py-0.5">
          <span className="text-emerald-400 text-[9px] font-mono">$</span>
          <span className="text-gray-300 text-[8px] font-mono truncate max-w-[90px]">
            {text}
          </span>
          <motion.span
            animate={{ opacity: blinkOn ? 1 : 0 }}
            className="text-emerald-400 text-[9px] font-mono leading-none"
          >
            ▌
          </motion.span>
        </div>
      </div>
      {/* Stand */}
      <div className="mx-auto w-8 h-1.5 bg-[#1a1935] rounded-b" />
      <div className="mx-auto w-12 h-1 bg-[#252548] rounded-b" />
    </div>
  );
}

function CodingBanner({ lang }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [blinkOn, setBlinkOn] = useState(true);

  /* typewriter */
  useEffect(() => {
    const line = TERMINAL_LINES[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setDisplayed(line.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 55);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed("");
        setCharIdx(0);
        setLineIdx((i) => (i + 1) % TERMINAL_LINES.length);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx]);

  /* cursor blink */
  useEffect(() => {
    const t = setInterval(() => setBlinkOn((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  const statusLabel =
    lang === "ar"
      ? "🟢 أنا أطبخ شيئًا جديدًا 😎"
      : "🟢 Cooking something new 😎";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-10"
    >
      <div className="glass rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 border border-emerald-500/15 max-w-2xl mx-auto">
        <LaptopScreen text={displayed} blinkOn={blinkOn} />

        <div
          className={`flex flex-col items-center sm:items-start gap-1 ${lang === "ar" ? "sm:items-end text-right" : ""}`}
        >
          <p className="text-xs text-gray-400 font-medium">{statusLabel}</p>
          <p className="font-mono text-emerald-400 text-xs sm:text-sm font-semibold min-h-[1.25rem]">
            {displayed}
            <motion.span
              animate={{ opacity: blinkOn ? 1 : 0 }}
              className="text-emerald-300"
            >
              _
            </motion.span>
          </p>
        </div>

        <AnimatedKeyboard />
      </div>
    </motion.div>
  );
}

const skillData = {
  frontend: [
    "React",
    "Next.js",
    "JavaScript",
    "HTML5",
    "CSS3",
    "TailwindCSS",
    "JavaFX",
  ],
  backend: [
    "Java",
    "Spring Boot",
    "Node.js",
    "Express.js",
    "REST API",
    "Camunda",
  ],
  mobile: ["React Native", "Expo"],
  database: ["MySQL", "PostgreSQL", "SQL Server", "SQL", "JDBC"],
  devops: ["Docker", "Kubernetes", "Jenkins", "SonarQube"],
  tools: [
    "Git",
    "GitHub",
    "GitLab",
    "IntelliJ",
    "VS Code",
    "Postman",
    "Eclipse",
    "Figma",
  ],
};

const categoryStyle = {
  frontend: {
    gradient: "from-red-600/15 to-rose-500/10",
    border: "border-red-500/25",
    dot: "bg-red-400",
  },
  backend: {
    gradient: "from-violet-600/15 to-indigo-500/10",
    border: "border-violet-500/25",
    dot: "bg-violet-400",
  },
  mobile: {
    gradient: "from-fuchsia-600/15 to-pink-500/10",
    border: "border-fuchsia-500/25",
    dot: "bg-fuchsia-400",
  },
  database: {
    gradient: "from-cyan-600/15 to-teal-500/10",
    border: "border-cyan-500/25",
    dot: "bg-cyan-400",
  },
  devops: {
    gradient: "from-orange-600/15 to-amber-500/10",
    border: "border-orange-500/25",
    dot: "bg-orange-400",
  },
  tools: {
    gradient: "from-slate-600/15 to-gray-500/10",
    border: "border-slate-500/25",
    dot: "bg-slate-400",
  },
};

const categoryIcons = {
  frontend: "🎨",
  backend: "⚙️",
  mobile: "📱",
  database: "🗄️",
  devops: "🚀",
  tools: "🛠️",
};

// Skills utilisés activement en ce moment sur mon PC / dans mes projets
const currentlyUsing = new Set([
  "React",
  "Java",
  "Spring Boot",
  "Camunda",
  "React Native",
  "PostgreSQL",
  "Git",
  "GitLab",
  "IntelliJ",
  "Postman",
  "Docker",
  "Kubernetes",
]);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function SkillBadge({ skill, lang }) {
  const active = currentlyUsing.has(skill);
  const label = lang === "ar" ? "أستخدمه الآن" : "Utilisé actuellement";

  return (
    <div className="relative inline-flex group">
      <span
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border transition-all duration-200
          ${
            active
              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
              : "bg-[#0d0c1d]/60 text-gray-500 border-[#252548] hover:border-gray-500 hover:text-gray-400"
          }`}
      >
        {active && (
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
        )}
        {skill}
      </span>

      {/* Tooltip au hover */}
      {active && (
        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500 text-black text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {label}
        </span>
      )}
    </div>
  );
}

export default function Skills() {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  const legendLabel =
    lang === "ar"
      ? "أستخدمها الآن في مشاريعي الحالية"
      : "Utilisé activement dans mes projets en cours";

  return (
    <section id="skills" className="py-24 bg-[#151433]/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="text-brand text-xs font-bold uppercase tracking-[0.2em]">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
            {t.title}
          </h2>
          <div className="mt-4 w-14 h-1 bg-gradient-to-r from-brand to-brand-light mx-auto rounded-full" />
        </motion.div>

        {/* Légende */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-yellow-400/80 text-xs font-medium mb-12 flex items-center justify-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          {legendLabel}
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {Object.entries(skillData).map(([cat, skills]) => {
            const s = categoryStyle[cat];
            return (
              <motion.div
                key={cat}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`bg-gradient-to-br ${s.gradient} border ${s.border} rounded-2xl p-5 cursor-default`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl">{categoryIcons[cat]}</span>
                  <h3 className="font-bold text-white text-sm">{t[cat]}</h3>
                  <span className={`w-2 h-2 rounded-full ${s.dot} ml-auto`} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} lang={lang} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <CodingBanner lang={lang} />
      </div>
    </section>
  );
}
