import s from './JouiderBayGuide.module.css';

interface SectionHeadingProps {
  id: string;
  kicker: string;
  title: string;
  lede?: string | undefined;
}

export function SectionHeading({ id, kicker, title, lede }: SectionHeadingProps) {
  return (
    <>
      <p className={s.kicker}>{kicker}</p>
      <h2 id={id}>{title}</h2>
      {lede && <p className={s.secLede}>{lede}</p>}
    </>
  );
}
