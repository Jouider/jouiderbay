import Image from 'next/image';
import { useGuide } from './GuideContext';
import { BrandMark } from './icons';
import type { GuideContent, Lang } from './types';
import { cx, type SectionId } from './utils';
import s from './JouiderBayGuide.module.css';

interface HeroProps {
  content: GuideContent;
  onLanguageChange: (lang: Lang) => void;
  onJump: (id: SectionId) => void;
}

const LANGS: readonly Lang[] = ['fr', 'en'];

export function Hero({ content, onLanguageChange, onJump }: HeroProps) {
  const { lang, t, asset, pick } = useGuide();
  const logo = content.logoWhite;
  const welcome = pick(content.welcome);

  const jumps: Array<[SectionId, string]> = [];
  if (content.arrival.steps.length > 0 || content.arrival.video) jumps.push(['bienvenue', t.jumpArrival]);
  jumps.push(['appartement', t.jumpApartment]);
  if (content.departure.steps.some((step) => pick(step))) jumps.push(['depart', t.jumpDeparture]);

  return (
    <header className={s.hero}>
      {content.hero && (
        <Image
          className={s.heroImg}
          src={asset(content.hero.src)}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
        />
      )}
      <div className={s.heroShade} />
      <div className={cx(s.wrap, s.heroIn, logo && s.hasLogo)}>
        <div className={s.heroTop}>
          {!logo && <BrandMark className={s.mark} />}
          <div className={s.lang} role="group" aria-label={t.languageGroup}>
            {LANGS.map((code) => (
              <button key={code} type="button" aria-pressed={lang === code} onClick={() => onLanguageChange(code)}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {logo ? (
          <>
            <h1 className={s.logoH}>
              <Image
                src={asset(logo.src)}
                width={logo.width}
                height={logo.height}
                alt="Jouider Bay · Sidi Rahal"
                sizes="(min-width: 430px) 360px, 84vw"
                loading="eager"
              />
            </h1>
            <p className={s.eyebrow}>{t.eyebrowLogo}</p>
          </>
        ) : (
          <>
            <p className={s.eyebrow}>{t.eyebrow}</p>
            <h1 className={s.wordmark}>Jouider Bay</h1>
          </>
        )}

        <p className={s.lede}>{t.lede}</p>
        {welcome && <p className={s.welcome}>{welcome}</p>}

        <nav className={s.jump} aria-label={t.sectionsNav}>
          {jumps.map(([id, label], index) => (
            <button key={id} type="button" onClick={() => onJump(id)}>
              <b>{index + 1}</b>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
