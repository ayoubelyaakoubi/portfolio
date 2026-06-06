import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer className="py-8 border-t border-[#252548]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="gradient-text font-bold">Ayoub El Yaakoubi</span> —{" "}
          {t.rights}
        </p>

        <p className="flex items-center gap-1.5">
          {t.madeWith}
          <span className="text-red-400">♥</span>
        </p>

        <div className="flex gap-5">
          <a
            href="https://www.linkedin.com/in/ayoub-el-yaakoubi-513862243/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition-colors font-medium"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/ayoubelyaakoubi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition-colors font-medium"
          >
            GitHub
          </a>
          <a
            href="mailto:ayoub.elyaakoubi20@ump.ac.ma"
            className="hover:text-brand transition-colors font-medium"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
