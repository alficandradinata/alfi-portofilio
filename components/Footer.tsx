import type { CSSProperties } from "react";
import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  WhatsappIcon,
  SOCIAL_BRANDS,
} from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

const SOCIALS = [
  {
    label: "GitHub",
    href: PERSONAL_INFO.socials.github,
    Icon: GithubIcon,
    brand: SOCIAL_BRANDS.github,
  },
  {
    label: "LinkedIn",
    href: PERSONAL_INFO.socials.linkedin,
    Icon: LinkedinIcon,
    brand: SOCIAL_BRANDS.linkedin,
  },
  {
    label: "Instagram",
    href: PERSONAL_INFO.socials.instagram,
    Icon: InstagramIcon,
    brand: SOCIAL_BRANDS.instagram,
  },
  {
    label: "WhatsApp",
    href: PERSONAL_INFO.socials.whatsapp,
    Icon: WhatsappIcon,
    brand: SOCIAL_BRANDS.whatsapp,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-subtle">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Identitas */}
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand text-white font-semibold text-sm shrink-0">
              AC
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">
                {PERSONAL_INFO.name}
              </p>
              <p className="text-sm text-ink-muted">{PERSONAL_INFO.role}</p>
            </div>
          </div>

          {/* Tautan profil */}
          <ul className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, Icon, brand }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label} — buka di tab baru`}
                  style={
                    {
                      "--social": brand.color,
                      "--social-soft": brand.soft,
                    } as CSSProperties
                  }
                  className="flex p-2 rounded-lg border border-line bg-surface text-[var(--social)] hover:border-[var(--social)] hover:bg-[var(--social-soft)] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex p-2 rounded-lg border border-line bg-surface text-ink-muted hover:text-brand hover:border-brand-line transition-colors"
                aria-label="Kirim email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-ink-muted">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Seluruh hak cipta
            dilindungi.
          </p>
          <p className="text-sm text-ink-muted">
            Dibangun dengan Next.js dan Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
