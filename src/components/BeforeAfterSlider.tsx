import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface Props {
  before: string;
  after: string;
  alt: string;
  initial?: number;
  beforeLabel?: string;
  afterLabel?: string;
}

const STEP = 5;
const clamp = (n: number) => Math.min(100, Math.max(0, n));

export default function BeforeAfterSlider({
  before,
  after,
  alt,
  initial = 50,
  beforeLabel = "ANTES",
  afterLabel = "DESPUÉS",
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const pos = useRef(initial);
  const [missing, setMissing] = useState(false);

  // La posición vive en una variable CSS: arrastrar no re-renderiza React.
  const set = (value: number) => {
    pos.current = clamp(value);
    box.current?.style.setProperty("--pos", `${pos.current}%`);
    handle.current?.setAttribute("aria-valuenow", String(Math.round(pos.current)));
  };

  const fromPointer = (e: PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    set(((e.clientX - r.left) / r.width) * 100);
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    fromPointer(e);
    handle.current?.focus({ preventScroll: true });
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e);
  };

  const onKey = (e: KeyboardEvent) => {
    const k: Record<string, number> = {
      ArrowLeft: pos.current - STEP,
      ArrowDown: pos.current - STEP,
      ArrowRight: pos.current + STEP,
      ArrowUp: pos.current + STEP,
      Home: 0,
      End: 100,
    };
    if (!(e.key in k)) return;
    e.preventDefault();
    set(k[e.key]);
  };

  if (missing) {
    return (
      <div className="ba ba-missing" role="img" aria-label={alt}>
        <span>Fotografías pendientes</span>
      </div>
    );
  }

  return (
    <div
      className="ba"
      ref={box}
      style={{ ["--pos" as string]: `${initial}%` }}
      onPointerDown={onDown}
      onPointerMove={onMove}
    >
      <img
        src={before}
        alt={`${alt}: antes`}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setMissing(true)}
      />
      <img
        className="ba-after"
        src={after}
        alt={`${alt}: después`}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setMissing(true)}
      />
      <span className="ba-tag l">{beforeLabel}</span>
      <span className="ba-tag r">{afterLabel}</span>
      <div className="ba-line" aria-hidden="true" />
      <div
        className="ba-knob"
        ref={handle}
        role="slider"
        tabIndex={0}
        aria-label={`Comparar ${alt}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={initial}
        aria-valuetext="Desliza para comparar antes y después"
        onKeyDown={onKey}
      >
        <CaretLeft size={14} weight="bold" aria-hidden="true" />
        <CaretRight size={14} weight="bold" aria-hidden="true" />
      </div>
    </div>
  );
}
