import Image from 'next/image';
import { Fragment } from 'react';
import { useGuide } from './GuideContext';
import { ROOMS } from './i18n';
import { BoxIcon, LockIcon, PlayIcon } from './icons';
import { SectionHeading } from './SectionHeading';
import type { GuideItem, RoomId } from './types';
import { cx, formatDuration } from './utils';
import s from './JouiderBayGuide.module.css';

export type RoomFilter = RoomId | 'all';

interface ApartmentSectionProps {
  items: GuideItem[];
  room: RoomFilter;
  onRoomChange: (room: RoomFilter) => void;
  onOpen: (id: string) => void;
}

export function ApartmentSection({ items, room, onRoomChange, onOpen }: ApartmentSectionProps) {
  const { t, pick } = useGuide();
  const roomsUsed = ROOMS.filter((r) => items.some((item) => item.room === r.id));
  const groups = room === 'all' ? roomsUsed : roomsUsed.filter((r) => r.id === room);

  return (
    <section className={s.sec} id="appartement" aria-labelledby="jb-h-apartment">
      <SectionHeading id="jb-h-apartment" kicker={t.apartmentKicker} title={t.apartmentTitle} lede={t.apartmentLede} />

      <div className={s.rooms} role="group" aria-label={t.roomsGroup}>
        <button type="button" className={s.chip} aria-pressed={room === 'all'} onClick={() => onRoomChange('all')}>
          {t.all}
        </button>
        {roomsUsed.map((r) => (
          <button
            key={r.id}
            type="button"
            className={s.chip}
            aria-pressed={room === r.id}
            onClick={() => onRoomChange(r.id as RoomId)}
          >
            {pick(r.label)}
          </button>
        ))}
      </div>

      {groups.map((r) => {
        const list = items.filter((item) => item.room === r.id);
        if (!list.length) return null;
        const withVideo = list.filter((item) => item.video).length;
        return (
          <Fragment key={r.id}>
            <div className={s.groupH}>
              <h3>{pick(r.label)}</h3>
              <span>{withVideo ? t.videoCount(withVideo) : ''}</span>
            </div>
            <div className={s.grid}>
              {list.map((item) => (
                <ItemCard key={item.id} item={item} onOpen={onOpen} />
              ))}
            </div>
          </Fragment>
        );
      })}
    </section>
  );
}

function ItemCard({ item, onOpen }: { item: GuideItem; onOpen: (id: string) => void }) {
  const { lang, t, asset, pick } = useGuide();
  const otherTitle = lang === 'fr' ? item.title.en : item.title.fr;

  return (
    <button type="button" className={s.card} onClick={() => onOpen(item.id)}>
      {item.poster ? (
        <span className={s.cover}>
          <Image
            src={asset(item.poster.src)}
            alt=""
            fill
            sizes="(min-width: 812px) 250px, (min-width: 640px) 31vw, 46vw"
          />
          {item.video && (
            <span className={s.dur}>
              <PlayIcon />
              {formatDuration(item.video.duration)}
            </span>
          )}
        </span>
      ) : (
        <span className={cx(s.cover, s.coverText)}>{item.icon === 'lock' ? <LockIcon /> : <BoxIcon />}</span>
      )}
      <span className={s.cardT}>
        <b>{pick(item.title)}</b>
        <small>{otherTitle || (item.video ? '' : t.instructions)}</small>
      </span>
    </button>
  );
}
