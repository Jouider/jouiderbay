import { useGuide } from './GuideContext';
import { CheckIcon } from './icons';
import { SectionHeading } from './SectionHeading';
import type { Localized } from './types';
import s from './JouiderBayGuide.module.css';

export function DepartureSection({ steps }: { steps: Localized[] }) {
  const { t, pick } = useGuide();
  const visible = steps.filter((step) => pick(step));
  if (!visible.length) return null;

  return (
    <section className={s.sec} id="depart" aria-labelledby="jb-h-departure">
      <SectionHeading id="jb-h-departure" kicker={t.departureKicker} title={t.departureTitle} lede={t.departureLede} />
      <ul className={s.checks}>
        {visible.map((step, index) => (
          <li key={index}>
            <CheckIcon />
            <p>{pick(step)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
