import Image from 'next/image';
import { useRef, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { useGuide } from './GuideContext';
import { useFocusOnOpen } from './hooks';
import { CloseIcon } from './icons';
import type { GuideImage } from './types';
import s from './JouiderBayGuide.module.css';

export interface ZoomTarget {
  image: GuideImage;
  caption: string;
}

/** Full-screen photo or map. Tap the photo, the dark background, the close button or press Escape to close. */
export function Lightbox({ target, onClose }: { target: ZoomTarget; onClose: () => void }) {
  const { lang, t, asset, themeClassName } = useGuide();
  const closeRef = useRef<HTMLButtonElement>(null);
  useFocusOnOpen(closeRef);
  const { image, caption } = target;

  const onBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    const el = event.target as HTMLElement;
    if (el === event.currentTarget || el.tagName === 'IMG') onClose();
  };

  return createPortal(
    <div className={themeClassName} lang={lang}>
      <div
        className={s.lightbox}
        role="dialog"
        aria-modal="true"
        aria-label={caption || t.zoom}
        onClick={onBackdropClick}
      >
        <Image
          src={asset(image.src)}
          alt={caption}
          width={image.width}
          height={image.height}
          sizes="(min-width: 984px) 960px, 100vw"
        />
        {caption && <p>{caption}</p>}
      </div>
      <button ref={closeRef} type="button" className={s.close} aria-label={t.close} onClick={onClose}>
        <CloseIcon />
      </button>
    </div>,
    document.body,
  );
}
