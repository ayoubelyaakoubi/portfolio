import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import ProjectDetailsModal from "./ProjectDetailsModal";

/* ─── SVG Icons ─── */
function MobileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
    </svg>
  );
}
function WebIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function DesktopIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
function CloudIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className="w-full h-full"
    >
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}
function ShopIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ─── Phone mockup wrapper ─── */
function PhoneMockup({ src }) {
  return (
    <div className="relative mx-auto w-28 h-52 flex-shrink-0">
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[18px] border-[3px] border-gray-600/60 bg-black overflow-hidden shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-b-xl z-10" />
        {/* Screenshot — blurred for confidentiality */}
        <img
          src={src}
          alt="PFE App"
          className="w-full h-full object-cover object-top"
          style={{ filter: 'blur(3px)', transform: 'scale(1.05)' }}
        />
        {/* Frosted overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-20" />
        {/* Confidentiality badge */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-1.5">
          <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span className="text-white/70 text-[9px] font-semibold tracking-widest uppercase">Confidentiel</span>
        </div>
      </div>
      {/* Glow under phone */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-brand/30 blur-lg rounded-full" />
    </div>
  );
}

/* ─── Glow card ─── */
const glowVariant = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function ProjectCard({
  Icon,
  image,
  title,
  label,
  description,
  tech,
  role,
  links,
  lang,
  projectData,
  onSelect,
}) {
  const isRtl = lang === "ar";

  return (
    <motion.div
      variants={glowVariant}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => onSelect(projectData)}
      className="relative flex flex-col items-center text-center rounded-2xl p-7 border border-brand/20
        bg-[#0f0e24]
        shadow-[0_0_20px_rgba(230,57,70,0.08),inset_0_0_30px_rgba(230,57,70,0.03)]
        hover:border-brand/50
        hover:shadow-[0_0_40px_rgba(230,57,70,0.22),inset_0_0_30px_rgba(230,57,70,0.06)]
        transition-all duration-400 group cursor-pointer"
    >
      {/* Label badge */}
      <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/20">
        {label}
      </span>

      {/* Icon or phone */}
      <div className="mb-5 mt-2">
        {image ? (
          <PhoneMockup src={image} />
        ) : (
          <div
            className="w-16 h-16 text-brand group-hover:scale-110 transition-transform duration-300
            drop-shadow-[0_0_12px_rgba(230,57,70,0.5)]"
          >
            <Icon />
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-extrabold text-lg text-white mb-2 leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Divider */}
      <div className="w-12 h-px bg-brand/30 mb-4" />

      {/* Tech stack */}
      <p className="text-gray-300 text-xs mb-1 font-medium">
        {tech.join(" • ")}
      </p>

      {/* Role */}
      {role && (
        <p className="text-gray-500 text-[11px] mb-5">
          {lang === "ar" ? "الدور:" : "Role:"}{" "}
          <span className="text-brand/80">{role}</span>
        </p>
      )}

      {/* Links */}
      {links && links.length > 0 && (
        <div
          className={`flex items-center justify-center gap-4 mt-auto pt-2 flex-wrap ${isRtl ? "flex-row-reverse" : ""}`}
        >
          {links.map((l, i) =>
            l.href ? (
              <a
                key={i}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-brand hover:text-brand-light text-sm font-semibold underline-offset-4 hover:underline transition-colors"
              >
                {l.icon && <GithubIcon />}
                {l.label}
              </a>
            ) : null,
          )}
        </div>
      )}
    </motion.div>
  );
}

const PFA_DEMO =
  "https://www.linkedin.com/posts/ayoub-el-yaakoubi-513862243_pr%C3%A9sentation-de-notre-application-web-pour-activity-7214387315056488450-TnnU?utm_source=share&utm_medium=member_desktop";

export default function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;
  const [selectedProject, setSelectedProject] = useState(null);
  const viewGh = lang === "ar" ? "GitHub" : "GitHub";
  const viewDemo = lang === "ar" ? "عرض الفيديو" : "Vidéo Demo";

  const cards = [
    {
      Icon: MobileIcon,
      image: "/assets/img/pfe_login.png",
      key: "pfe",
      role: "Mobile Developer",
      links: [],
    },
    {
      Icon: WebIcon,
      image: null,
      key: "pfa",
      role: "Full Stack Developer",
      links: [
        {
          href: "https://github.com/ayoubelyaakoubi",
          label: viewGh,
          icon: true,
        },
      ],
    },
    {
      Icon: DesktopIcon,
      image: null,
      key: "ensao",
      role: "Full Stack Developer",
      links: [
        {
          href: "https://github.com/yassine-elhamdaoui/pfa-frontend",
          label: "Frontend",
          icon: true,
        },
        {
          href: "https://github.com/yassine-elhamdaoui/pfa-backend-api",
          label: "Backend",
          icon: true,
        },
        { href: PFA_DEMO, label: viewDemo, icon: false },
      ],
    },
    {
      Icon: CloudIcon,
      image: null,
      key: "weather",
      role: "Frontend Developer",
      links: [
        {
          href: "https://github.com/ayoubelyaakoubi",
          label: viewGh,
          icon: true,
        },
      ],
    },
    {
      Icon: ShopIcon,
      image: null,
      key: "avito",
      role: "Frontend Developer",
      links: [
        {
          href: "https://github.com/ayoubelyaakoubi",
          label: viewGh,
          icon: true,
        },
      ],
    },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <span className="text-brand text-xs font-bold uppercase tracking-[0.2em]">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
            {t.title}
          </h2>
          <div className="mt-4 w-14 h-1 bg-gradient-to-r from-brand to-brand-light mx-auto rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-500 text-sm mb-14 max-w-lg mx-auto"
        >
          {lang === "ar"
            ? "مجموعة من المشاريع التي طورتها خلال مساري الأكاديمي والمهني."
            : "Une sélection de projets développés tout au long de mon parcours académique et professionnel."}
        </motion.p>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card) => {
            const pt = t[card.key];
            const projectData = {
              key: card.key,
              title: pt.title,
              label: pt.label,
              description: pt.description,
              tech: pt.tech,
              links: card.links,
              details: pt.details,
            };
            return (
              <ProjectCard
                key={card.key}
                Icon={card.Icon}
                image={card.image}
                title={pt.title}
                label={pt.label}
                description={pt.description}
                tech={pt.tech}
                role={card.role}
                links={card.links}
                lang={lang}
                projectData={projectData}
                onSelect={setSelectedProject}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
      />
    </section>
  );
}
