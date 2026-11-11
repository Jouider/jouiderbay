'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ApartmentSection, type RoomFilter } from './ApartmentSection';
import { ArrivalSection } from './ArrivalSection';
import { ContactSection } from './ContactSection';
import { guideContent } from './content';
import { DepartureSection } from './DepartureSection';
import { displayFont, uiFont } from './fonts';
import { GuideContext, type GuideContextValue } from './GuideContext';
import { GuideFooter } from './GuideFooter';
import { Hero } from './Hero';
import { useBodyScrollLock, useGuideLanguage, useLocationHash } from './hooks';
import { ARRIVAL_TITLE, UI } from './i18n';
import { Lightbox, type ZoomTarget } from './Lightbox';
import { ReelViewer, type ViewerItem } from './ReelViewer';
import type { GuideContent, Lang } from './types';
import { ARRIVAL_ID, cx, isSectionId, pickText, resolveAsset, type SectionId } from './utils';
import s from './JouiderBayGuide.module.css';

export interface JouiderBayGuideProps {
  /** Guide content. Defaults to the bundled Jouider Bay content (content.ts). */
  content?: GuideContent | undefined;
  /** URL prefix of the files copied to public/jouider-bay. Include your basePath if the site uses one. */
  assetBase?: string | undefined;
  /** Language of the server render, and the fallback when the browser language is unknown. */
  defaultLang?: Lang | undefined;
  /**
   * "auto" follows the visitor's OS setting, or your site's `html.dark` / `html[data-theme]`.
   * Use "light" if your site has no dark mode.
   */
  theme?: 'auto' | 'light' | 'dark' | undefined;
  className?: string | undefined;
}

/**
 * Jouider Bay stay guide: arrival steps with photos and maps, one video per appliance,
 * check-out list, French/English. Video links: /guide#<item id>, sections: #bienvenue, #appartement, #depart.
 */
export function JouiderBayGuide({
  content = guideContent,
  assetBase = '/jouider-bay',
  defaultLang = 'fr',
  theme = 'auto',
  className,
}: JouiderBayGuideProps) {
  const [lang, setLang] = useGuideLanguage(defaultLang);
  const [hash, setHash] = useLocationHash();
  const [room, setRoom] = useState<RoomFilter>('all');
  const [zoom, setZoom] = useState<ZoomTarget | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  const themeClassName = cx(
    s.theme,
    theme === 'light' && s.forceLight,
    theme === 'dark' && s.forceDark,
    displayFont.variable,
    uiFont.variable,
  );

  const context = useMemo<GuideContextValue>(
    () => ({
      lang,
      t: UI[lang],
      asset: (path) => resolveAsset(assetBase, path),
      pick: (text) => pickText(text, lang),
      themeClassName,
    }),
    [lang, assetBase, themeClassName],
  );

  const arrivalItem = useMemo<ViewerItem | null>(() => {
    const { video, poster, steps, tips } = content.arrival;
    if (!video) return null;
    return { id: ARRIVAL_ID, room: 'arrivee', title: ARRIVAL_TITLE, steps, tips, video, poster };
  }, [content.arrival]);

  // The URL hash is the source of truth for the open video (#four, #arrivee…).
  const openItem: ViewerItem | null =
    !hash || isSectionId(hash)
      ? null
      : hash === ARRIVAL_ID
        ? arrivalItem
        : (content.items.find((item) => item.id === hash) ?? null);

  // Pager: previous/next appliance, wrapping around. From the arrival video: last and first.
  const items = content.items;
  const count = items.length;
  const openIndex = openItem ? items.findIndex((item) => item.id === openItem.id) : -1;
  const prev = count ? items[openIndex < 0 ? count - 1 : (openIndex - 1 + count) % count] : undefined;
  const next = count ? items[openIndex < 0 ? 0 : (openIndex + 1) % count] : undefined;

  const jumpTo = useCallback((id: SectionId, instant = false) => {
    const el = rootRef.current?.querySelector<HTMLElement>(`#${id}`);
    if (!el) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: instant || reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }, []);

  // Section anchors: scroll on load (and again once web fonts have settled the layout).
  const firstSectionJump = useRef(true);
  useEffect(() => {
    if (!isSectionId(hash)) return;
    const instant = firstSectionJump.current;
    firstSectionJump.current = false;
    jumpTo(hash, instant);
    if (!instant || !document.fonts) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      const el = rootRef.current?.querySelector<HTMLElement>(`#${hash}`);
      if (!cancelled && el && Math.abs(el.getBoundingClientRect().top) < 120) jumpTo(hash, true);
    });
    return () => {
      cancelled = true;
    };
  }, [hash, jumpTo]);

  const closeViewer = useCallback(() => setHash(null), [setHash]);
  const closeZoom = useCallback(() => setZoom(null), []);

  useBodyScrollLock(Boolean(openItem) || Boolean(zoom));

  useEffect(() => {
    if (!openItem && !zoom) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (zoom) closeZoom();
      else closeViewer();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openItem, zoom, closeViewer, closeZoom]);

  return (
    <GuideContext.Provider value={context}>
      <article ref={rootRef} lang={lang} className={cx(themeClassName, s.page, className)}>
        <Hero content={content} onLanguageChange={setLang} onJump={jumpTo} />
        <div className={s.wrap}>
          <ArrivalSection arrival={content.arrival} onOpenVideo={() => setHash(ARRIVAL_ID)} onZoom={setZoom} />
          <ApartmentSection items={items} room={room} onRoomChange={setRoom} onOpen={setHash} />
          <DepartureSection steps={content.departure.steps} />
          <ContactSection whatsapp={content.whatsapp} wifi={content.wifi} />
        </div>
        <GuideFooter logo={content.logo} logoWhite={content.logoWhite} />
      </article>

      {openItem && (
        <ReelViewer
          key={openItem.id}
          item={openItem}
          prev={prev}
          next={next}
          onClose={closeViewer}
          onNavigate={setHash}
        />
      )}
      {zoom && <Lightbox target={zoom} onClose={closeZoom} />}
    </GuideContext.Provider>
  );
}

export default JouiderBayGuide;
