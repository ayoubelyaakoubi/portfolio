import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { translations } from "../translations";

const toSrc = (path) => path.split("/").map(encodeURIComponent).join("/");

const SCATTERED = [
  { left: "2%", top: "8%", width: "29%", rotate: -5, zIndex: 1 },
  { left: "31%", top: "0%", width: "33%", rotate: 2, zIndex: 2 },
  { left: "63%", top: "13%", width: "28%", rotate: -3, zIndex: 1 },
];

// ─── Desktop scattered photo card ────────────────────────────────────────────
function ScatteredPhoto({ event, index, onSelect, frEvent, lang }) {
  const pos = SCATTERED[index] ?? SCATTERED[0];
  const coverImg = frEvent?.images?.[0] || event.image;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30, rotate: pos.rotate - 3 }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotate: pos.rotate }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.14, ease: "easeOut" }}
      onClick={() => onSelect(event)}
      className="absolute cursor-pointer group"
      style={{
        left: pos.left,
        top: pos.top,
        width: pos.width,
        zIndex: pos.zIndex,
      }}
    >
      <div className="relative aspect-[3/4] rounded overflow-hidden shadow-2xl ring-2 ring-white/10 group-hover:ring-brand/60 transition-all duration-300">
        <img
          src={toSrc(coverImg)}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-brand text-[10px] font-bold uppercase tracking-wider mb-1">
            {event.subtitle}
          </p>
          <h3 className="text-white text-sm font-bold leading-snug">
            {event.title}
          </h3>
          <p className="text-gray-300 text-xs mt-1">{event.date}</p>
          <span className="mt-2 text-brand text-xs font-semibold">
            {lang === "ar" ? "عرض الصور ←" : lang === "en" ? "View photos →" : "Voir les photos →"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Mobile card ──────────────────────────────────────────────────────────────
function MobileCard({ event, onSelect, isDark, frEvent }) {
  const coverImg = frEvent?.images?.[0] || event.image;
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(event)}
      className="cursor-pointer rounded-xl overflow-hidden relative shadow-lg group"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={toSrc(coverImg)}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-brand text-[10px] font-bold uppercase tracking-wider mb-0.5">
          {event.subtitle}
        </p>
        <h3 className="text-white text-base font-bold">{event.title}</h3>
        <p className="text-gray-300 text-xs">{event.date}</p>
      </div>
      <div className="absolute inset-0 border-2 border-brand/0 group-hover:border-brand/50 rounded-xl transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}

// ─── Gallery modal ─────────────────────────────────────────────────────────────
function GalleryModal({ event, frEvent, isOpen, onClose, lang, isDark }) {
  const [activeImg, setActiveImg] = useState(0);
  const images = frEvent?.images || (event?.image ? [event.image] : []);
  const total = images.length;

  useEffect(() => {
    setActiveImg(0);
  }, [event?.id]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setActiveImg((i) => (i - 1 + total) % total);
      if (e.key === "ArrowRight") setActiveImg((i) => (i + 1) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, total, onClose]);

  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            key={event.id}
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className={`w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row ${
              isDark ? "bg-[#0c0b1f]" : "bg-white"
            }`}
            style={{ maxHeight: "90vh" }}
          >
            {/* ── Gallery (left) ── */}
            <div
              className="lg:w-[55%] relative flex flex-col bg-black"
              style={{ minHeight: 260 }}
            >
              {/* Main image */}
              <div
                className="flex-1 relative overflow-hidden"
                style={{ minHeight: 240 }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    src={toSrc(images[activeImg])}
                    alt={`${event.title} ${activeImg + 1}`}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {total > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImg((i) => (i - 1 + total) % total)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-brand rounded-full text-white text-xl leading-none transition-colors flex items-center justify-center"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setActiveImg((i) => (i + 1) % total)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-brand rounded-full text-white text-xl leading-none transition-colors flex items-center justify-center"
                    >
                      ›
                    </button>
                  </>
                )}

                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                  {activeImg + 1} / {total}
                </div>
              </div>

              {/* Thumbnails */}
              {total > 1 && (
                <div className="flex gap-1.5 p-2 overflow-x-auto bg-black/70 shrink-0">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                        i === activeImg
                          ? "border-brand opacity-100"
                          : "border-transparent opacity-50 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={toSrc(img)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Details (right) ── */}
            <div
              className={`lg:w-[45%] flex flex-col overflow-y-auto ${isDark ? "text-white" : "text-gray-900"}`}
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-0 shrink-0">
                <p className="text-brand text-[10px] font-bold uppercase tracking-widest">
                  {event.subtitle}
                </p>
                <button
                  onClick={onClose}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${
                    isDark
                      ? "hover:bg-white/10 text-gray-400 hover:text-white"
                      : "hover:bg-gray-100 text-gray-500"
                  }`}
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-4 flex-1">
                <h2 className="text-2xl font-black mb-1">{event.title}</h2>
                <p
                  className={`text-xs mb-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {event.date}
                </p>

                <div className="mb-5">
                  <p className="text-[10px] font-bold text-brand uppercase tracking-wider mb-2">
                    {lang === "ar" ? "الوصف" : "Description"}{/* same in FR/EN */}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {event.description}
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-[10px] font-bold text-brand uppercase tracking-wider mb-2">
                    {lang === "ar" ? "الدور" : lang === "en" ? "My role" : "Mon rôle"}
                  </p>
                  <p
                    className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {event.role}
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-[10px] font-bold text-brand uppercase tracking-wider mb-2">
                    {lang === "ar" ? "النقاط البارزة" : lang === "en" ? "Key points" : "Points clés"}
                  </p>
                  <ul className="space-y-2">
                    {event.highlights.map((h, i) => (
                      <li
                        key={i}
                        className={`flex gap-2.5 text-sm ${lang === "ar" ? "flex-row-reverse" : ""}`}
                      >
                        <span className="text-brand shrink-0 mt-0.5">✓</span>
                        <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {frEvent?.guests?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-brand uppercase tracking-wider mb-2">
                      {lang === "ar" ? "الضيوف المدعوون" : lang === "en" ? "Guests" : "Invités"}
                    </p>
                    <ul className="space-y-2">
                      {frEvent.guests.map((guest, i) => (
                        <li key={i}>
                          <a
                            href={guest.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 text-sm group/guest w-fit"
                          >
                            <svg className="w-4 h-4 text-[#0A66C2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <span className={`font-medium group-hover/guest:text-brand transition-colors ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                              {guest.name}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Club() {
  const { lang } = useLanguage();
  const { isDark } = useTheme();
  const t = translations[lang].club;
  const frEvents = translations.fr.club.events;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedFrEvent, setSelectedFrEvent] = useState(null);

  const handleSelect = (event) => {
    setSelectedEvent(event);
    setSelectedFrEvent(frEvents.find((e) => e.id === event.id) ?? null);
  };

  const handleClose = () => {
    setSelectedEvent(null);
    setSelectedFrEvent(null);
  };

  return (
    <>
      <section
        id="club"
        className={`relative overflow-hidden py-20 ${isDark ? "" : "bg-gray-50"}`}
      >
        {/* Decorative diagonal stripes — like the OUR TEAM background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {[12, 26, 42, 57, 72].map((pct, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0"
              style={{
                left: `${pct}%`,
                width: i % 2 === 0 ? "1px" : "2px",
                background: isDark
                  ? "linear-gradient(to bottom, transparent, rgba(100,130,255,0.12), transparent)"
                  : "linear-gradient(to bottom, transparent, rgba(100,130,255,0.07), transparent)",
                transform: "rotate(-28deg) scaleY(2.5)",
                transformOrigin: "center center",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ─── DESKTOP: side-by-side OUR TEAM layout ─── */}
          <div className="hidden lg:flex items-center gap-10 min-h-[640px]">
            {/* Left: text panel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-[36%] shrink-0"
            >
              <p
                className={`text-xs font-bold tracking-[0.3em] uppercase mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {t.badge}
              </p>
              <h2
                className={`text-5xl font-black leading-tight mb-4 uppercase ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {t.title}
              </h2>
              <div className="w-10 h-[3px] bg-brand mb-6" />
              <p
                className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {t.description}
              </p>
              <p
                className={`mt-8 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                {lang === "ar"
                  ? "← انقر على الصور للتفاصيل"
                  : lang === "en"
                  ? "Click on the photos for details →"
                  : "Cliquez sur les photos pour voir les détails →"}
              </p>
            </motion.div>

            {/* Right: scattered photos */}
            <div className="flex-1 relative h-[580px]">
              {t.events.map((event, i) => (
                <ScatteredPhoto
                  key={event.id}
                  event={event}
                  index={i}
                  onSelect={handleSelect}
                  frEvent={frEvents.find((e) => e.id === event.id)}
                  lang={lang}
                />
              ))}
            </div>
          </div>

          {/* ─── MOBILE: stacked cards ─── */}
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <p className="text-brand text-xs font-bold tracking-[0.3em] uppercase mb-2">
                {t.badge}
              </p>
              <h2
                className={`text-3xl font-black mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {t.title}
              </h2>
              <div className="w-10 h-[3px] bg-brand mx-auto mb-4" />
              <p
                className={`text-sm max-w-md mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {t.description}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {t.events.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <MobileCard
                    event={event}
                    onSelect={handleSelect}
                    isDark={isDark}
                    frEvent={frEvents.find((e) => e.id === event.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GalleryModal
        event={selectedEvent}
        frEvent={selectedFrEvent}
        isOpen={!!selectedEvent}
        onClose={handleClose}
        lang={lang}
        isDark={isDark}
      />
    </>
  );
}
