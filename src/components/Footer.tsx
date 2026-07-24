"use client";

import Image from "next/image";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/site-config";
import { useLang } from "./LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer id="contact" className="scroll-mt-20 relative overflow-hidden bg-navy-deep text-white">
      {/* wave cap */}
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="block h-[40px] w-full sm:h-[60px]" aria-hidden>
        <path
          d="M0,40 C240,75 480,5 720,40 C960,75 1200,5 1440,40 L1440,0 L0,0 Z"
          fill="var(--color-sand)"
        />
      </svg>

      <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logo-light.png"
              alt="Jouider Bay"
              width={150}
              height={40}
              className="h-11 w-auto"
            />
            <p className="mt-3 text-sm text-white/60">{t.footer.tagline}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-sun-soft">
              {t.footer.contact}
            </h3>
            <div className="mt-3 space-y-2 text-sm">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/80 transition-colors hover:text-white"
              >
                WhatsApp · +32 465 59 56 93
              </a>
              <a
                href="mailto:contact@jouiderbay.com"
                className="block text-white/80 transition-colors hover:text-white"
              >
                contact@jouiderbay.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-sun-soft">
              {t.footer.follow}
            </h3>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
            >
              <InstagramIcon />
              @jouiderbay
            </a>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Jouider Bay · jouiderbay.com · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}
