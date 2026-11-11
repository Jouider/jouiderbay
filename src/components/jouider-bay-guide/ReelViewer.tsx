import Image from 'next/image';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useGuide } from './GuideContext';
import { useFocusOnOpen } from './hooks';
import { ROOMS } from './i18n';
import { CloseIcon } from './icons';
import type { GuideItem, RoomId } from './types';
import { cx } from './utils';
import s from './JouiderBayGuide.module.css';

/** An appliance video, or the arrival video (room "arrivee"). */
export interface ViewerItem extends Omit<GuideItem, 'room'> {
  room: RoomId | 'arrivee';
}

interface ReelViewerProps {
  item: ViewerItem;
  prev?: GuideItem | undefined;
  next?: GuideItem | undefined;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

/** Full-screen video sheet: vertical video on the left (desktop) or top (mobile), steps beside it. */
export function ReelViewer({ item, prev, next, onClose, onNavigate }: ReelViewerProps) {
  const { lang, t, asset, pick, themeClassName } = useGuide();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useFocusOnOpen(closeRef);

  // Start playing as soon as the sheet opens. Browsers may block autoplay with sound
  // (e.g. when the page is opened straight on a video link); the controls stay available.
  useEffect(() => {
    videoRef.current?.play()?.catch(() => undefined);
  }, []);

  const steps = item.steps.filter((step) => pick(step));
  const tips = item.tips.filter((tip) => pick(tip));
  const roomLabel = pick(ROOMS.find((r) => r.id === item.room)?.label);
  const otherTitle = lang === 'fr' ? item.title.en : item.title.fr;

  let media: ReactNode = null;
  if (item.video) {
    media = (
      <div className={s.player}>
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={item.poster ? asset(item.poster.src) : undefined}
          src={asset(item.video.src)}
          onError={() => setFailed(true)}
        />
        {failed && (
          <div className={s.noplay} role="status">
            {t.videoError}
            {item.link && (
              <>
                {' '}
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {t.openVideo}
                </a>
              </>
            )}
          </div>
        )}
      </div>
    );
  } else if (item.poster) {
    media = (
      <div className={s.player}>
        <Image
          src={asset(item.poster.src)}
          alt=""
          width={item.poster.width}
          height={item.poster.height}
          sizes="(min-width: 920px) 420px, 100vw"
        />
      </div>
    );
  }

  const body = (
    <div className={cx(s.sheetBody, s.wrap)}>
      <p className={s.roomLabel}>{roomLabel}</p>
      <h2 id={titleId}>{pick(item.title)}</h2>
      <p className={s.sub}>{otherTitle}</p>

      {steps.length > 0 && (
        <ol className={s.steps}>
          {steps.map((step, index) => (
            <li key={index}>
              <span className={s.n}>{index + 1}</span>
              <p>{pick(step)}</p>
            </li>
          ))}
        </ol>
      )}

      {tips.map((tip, index) => (
        <div key={index} className={s.tip}>
          <span className={s.tipIcon}>i</span>
          <p>{pick(tip)}</p>
        </div>
      ))}

      {item.link && (
        <p className={s.extlink}>
          <a className={s.btn} href={item.link} target="_blank" rel="noopener noreferrer">
            {t.externalLink}
          </a>
        </p>
      )}

      {prev && next && (
        <nav className={s.pager} aria-label={t.pagerNav}>
          <button type="button" className={s.btn} onClick={() => onNavigate(prev.id)}>
            <span>← {pick(prev.title)}</span>
          </button>
          <button type="button" className={s.btn} onClick={() => onNavigate(next.id)}>
            <span>{pick(next.title)} →</span>
          </button>
        </nav>
      )}
    </div>
  );

  return createPortal(
    <div className={themeClassName} lang={lang}>
      <div className={s.sheet} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        {media ? (
          <div className={s.sheetGrid}>
            {media}
            {body}
          </div>
        ) : (
          body
        )}
      </div>
      <button ref={closeRef} type="button" className={s.close} aria-label={t.close} onClick={onClose}>
        <CloseIcon />
      </button>
    </div>,
    document.body,
  );
}
