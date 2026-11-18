/**
 * Renders a title where the words wrapped in *asterisks* become an italic
 * accent, e.g. "Vos vacances, *les pieds dans l'eau*." — the accent style is
 * passed by the caller so each section can pick its colour.
 */
export default function Accent({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className={className}>
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        ),
      )}
    </>
  );
}
