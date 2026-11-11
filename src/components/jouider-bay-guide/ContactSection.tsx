import { useEffect, useRef, useState } from 'react';
import { useGuide } from './GuideContext';
import { SectionHeading } from './SectionHeading';
import type { GuideContent } from './types';
import { cx } from './utils';
import s from './JouiderBayGuide.module.css';

interface ContactSectionProps {
  whatsapp?: GuideContent['whatsapp'];
  wifi?: GuideContent['wifi'];
}

export function ContactSection({ whatsapp, wifi }: ContactSectionProps) {
  const { t } = useGuide();
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const wifiName = wifi?.name?.trim();
  const wifiPassword = wifi?.password?.trim();
  if (!whatsapp && !wifiName && !wifiPassword) return null;

  const selectPassword = () => {
    const node = passwordRef.current;
    const selection = window.getSelection();
    if (!node || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const copyPassword = () => {
    if (!wifiPassword) return;
    try {
      navigator.clipboard.writeText(wifiPassword).then(() => setCopied(true), selectPassword);
    } catch {
      selectPassword();
    }
  };

  return (
    <section className={s.sec} id="contact" aria-labelledby="jb-h-contact">
      <SectionHeading id="jb-h-contact" kicker={t.contactKicker} title={t.contactTitle} />
      <div className={s.info}>
        {whatsapp && (
          <div className={s.infoBox}>
            <h3>WhatsApp</h3>
            <p className={s.infoHelp}>{t.whatsappHelp}</p>
            <div className={s.infoRow}>
              <span className={s.mono}>{whatsapp}</span>
              <a
                className={cx(s.btn, s.primary)}
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.whatsappButton}
              </a>
            </div>
          </div>
        )}
        {(wifiName || wifiPassword) && (
          <div className={s.infoBox}>
            <h3>{t.wifi}</h3>
            {wifiName && (
              <div className={s.infoRow}>
                <span className={s.infoLabel}>{t.wifiName}</span>
                <span className={s.mono}>{wifiName}</span>
              </div>
            )}
            {wifiPassword && (
              <div className={cx(s.infoRow, s.infoRowGap)}>
                <span className={s.infoLabel}>{t.wifiPassword}</span>
                <span ref={passwordRef} className={s.mono}>
                  {wifiPassword}
                </span>
                <button type="button" className={s.btn} onClick={copyPassword}>
                  {copied ? t.copied : t.copy}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
