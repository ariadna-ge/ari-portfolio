const VARIANTS = ["plain", "dots", "paper", "shadow", "stripes", "plainTwo", "solid"];

export default function NewspaperTitle({ text }: { text: string }) {
  let n = 0;
  return (
    <h2 className="newspaper" aria-label={text}>
      {text.split("").map((char, i) =>
        char === " " ? (
          <span key={i} aria-hidden="true">
            &nbsp;
          </span>
        ) : (
          <span
            key={i}
            aria-hidden="true"
            className={`letter ${VARIANTS[n++ % VARIANTS.length]}`}
          >
            {char}
          </span>
        )
      )}
    </h2>
  );
}
