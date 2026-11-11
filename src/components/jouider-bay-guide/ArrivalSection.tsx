import Image from 'next/image';
import { useGuide } from './GuideContext';
import { PlayIcon } from './icons';
import type { ZoomTarget } from './Lightbox';
import { SectionHeading } from './SectionHeading';
import type { GuideArrival } from './types';
import { formatDuration } from './utils';
import s from './JouiderBayGuide.module.css';

interface ArrivalSectionProps {
  arrival: GuideArrival;
  onOpenVideo: () => void;
  onZoom: (target: ZoomTarget) => void;
}

export function ArrivalSection({ arrival, onOpenVideo, onZoom }: ArrivalSectionProps) {
  const { t, asset, pick } = useGuide();
  const steps = arrival.steps.filter((step) => pick(step));
  const tips = arrival.tips.filter((tip) => pick(tip));
  if (!steps.length && !tips.length && !arrival.video) return null;

  return (
    <section className={s.sec} id="bienvenue" aria-labelledby="jb-h-arrival">
      <SectionHeading
        id="jb-h-arrival"
        kicker={t.arrivalKicker}
        title={t.arrivalTitle}
        lede={t.arrivalLede(steps.length)}
      />

      {arrival.video && (
        <button type="button" className={s.watch} onClick={onOpenVideo}>
          {arrival.poster ? (
            <Image
              src={asset(arrival.poster.src)}
              width={arrival.poster.width}
              height={arrival.poster.height}
              alt=""
              sizes="84px"
            />
          ) : (
            <span />
          )}
          <span className={s.watchT}>
            <b>{t.watchArrival}</b>
            <small>
              {t.watchArrivalSub} · {formatDuration(arrival.video.duration)}
            </small>
          </span>
          <span className={s.play}>
            <PlayIcon />
          </span>
        </button>
      )}

      {steps.length > 0 && (
        <ol className={s.timeline}>
          {steps.map((step, index) => {
            const text = pick(step);
            return (
              <li key={index}>
                <span className={s.n}>{index + 1}</span>
                <div>
                  <p>{text}</p>
                  {step.photos && step.photos.length > 0 && (
                    <div className={s.thumbs}>
                      {step.photos.map((photo) => (
                        <button
                          key={photo.src}
                          type="button"
                          className={s.thumb}
                          aria-label={t.zoom}
                          onClick={() => onZoom({ image: photo, caption: text })}
                        >
                          <Image src={asset(photo.src)} alt="" fill sizes="96px" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {tips.map((tip, index) => (
        <div key={index} className={s.tip}>
          <span className={s.tipIcon}>i</span>
          <p>{pick(tip)}</p>
        </div>
      ))}

      {arrival.maps.length > 0 && (
        <div className={s.maps}>
          {arrival.maps.map((map) => {
            const title = pick(map.title);
            return (
              <button
                key={map.image.src}
                type="button"
                className={s.mapCard}
                onClick={() => onZoom({ image: map.image, caption: title })}
              >
                <span className={s.mapImg}>
                  <Image
                    src={asset(map.image.src)}
                    alt=""
                    fill
                    sizes="(min-width: 812px) 384px, 46vw"
                    style={map.position ? { objectPosition: map.position } : undefined}
                  />
                </span>
                <span className={s.mapText}>
                  {title}
                  <small>{t.zoom}</small>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
