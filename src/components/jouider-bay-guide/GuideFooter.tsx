import Image from 'next/image';
import type { ReactNode } from 'react';
import { useGuide } from './GuideContext';
import { BrandMark } from './icons';
import type { GuideImage } from './types';
import { cx } from './utils';
import s from './JouiderBayGuide.module.css';

const LOGO_ALT = 'Jouider Bay · Sidi Rahal';

export function GuideFooter({
  logo,
  logoWhite,
}: {
  logo?: GuideImage | undefined;
  logoWhite?: GuideImage | undefined;
}) {
  const { t, asset } = useGuide();

  let brand: ReactNode;
  if (logo && logoWhite) {
    // Both are rendered; the theme tokens show the colour logo in light mode and the white one in dark mode.
    brand = (
      <>
        <Image
          className={cx(s.footLogo, s.logoColor)}
          src={asset(logo.src)}
          width={logo.width}
          height={logo.height}
          alt={LOGO_ALT}
          sizes="240px"
        />
        <Image
          className={cx(s.footLogo, s.logoWhite)}
          src={asset(logoWhite.src)}
          width={logoWhite.width}
          height={logoWhite.height}
          alt={LOGO_ALT}
          sizes="240px"
        />
      </>
    );
  } else if (logo) {
    brand = (
      <Image
        className={s.footLogo}
        src={asset(logo.src)}
        width={logo.width}
        height={logo.height}
        alt={LOGO_ALT}
        sizes="240px"
      />
    );
  } else {
    brand = (
      <>
        <BrandMark className={s.mark} />
        <span className={s.sign}>Jouider Bay</span>
        <span className={s.place}>Sidi Rahal</span>
      </>
    );
  }

  return (
    <footer className={cx(s.foot, s.wrap)}>
      {brand}
      <p className={s.footNote}>{t.enjoyStay}</p>
    </footer>
  );
}
