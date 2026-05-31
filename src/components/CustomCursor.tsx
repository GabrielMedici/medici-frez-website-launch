import { useEffect, useRef, useState } from "react";
import cursorImg from "../assets/cursor-direito.png";
/**
 * CustomCursor — Premium interactive cursor.
 *
 * - Dot (8px, gold): follows mouse exactly, no lag.
 * - Ring (36px, gold border): trails via lerp for a spring-like feel.
 * - On hover over interactive elements: ring expands (lerped scale),
 *   border turns navy, dot fades out.
 * - Completely disabled on touch / coarse-pointer devices.
 */
export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  // Live positions (not state — no re-renders)
  const mouse    = useRef({ x: -300, y: -300 });
  const ringPos  = useRef({ x: -300, y: -300 });
  const ringScale = useRef(1);

  const hovering = useRef(false);
  const rafId    = useRef<number | null>(null);

  // Whether to mount the elements at all
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse / trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);

    // ── Lerp factor — controls ring "stickiness" ──────────────────
    const POS_LERP   = 0.10;  // position amortecimento
    const SCALE_LERP = 0.12;  // scale amortecimento

    // ── Event handlers ─────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Atualiza a imagem imediatamente (0 input lag)
      // Ajuste percentual (-42% X, -20% Y) foca exatamente na ponta esquerda/superior da flecha na imagem enviada
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(calc(${e.clientX}px - 42%), calc(${e.clientY}px - 20%))`;
        dotRef.current.style.opacity = "1";
        dotRef.current.style.visibility = "visible";
      }
    };

    const CLICKABLE_SELECTOR =
      "a, button, [role='button'], input, select, textarea, label, [tabindex]";

    const onOver = (e: MouseEvent) => {
      hovering.current = !!(e.target as HTMLElement).closest(CLICKABLE_SELECTOR);
    };

    // ── rAF animation loop ─────────────────────────────────────────
    const tick = () => {
      const { x: mx, y: my } = mouse.current;
      const h = hovering.current;

      // --- Lerp ring position ---
      ringPos.current.x += (mx - ringPos.current.x) * POS_LERP;
      ringPos.current.y += (my - ringPos.current.y) * POS_LERP;
      const { x: rx, y: ry } = ringPos.current;

      // --- Lerp ring scale ---
      const targetScale = h ? 1.6 : 1;
      ringScale.current += (targetScale - ringScale.current) * SCALE_LERP;
      const s = ringScale.current;

      // A imagem (dotRef) agora é atualizada instantaneamente no onMove para zero lag
      
      // --- Apply ring (Animação de amortecimento continua suave) ---
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(calc(${rx}px - 50%), calc(${ry}px - 50%)) scale(${s})`;
        // Colour + opacity switch via CSS transition (set in styles.css)
        ringRef.current.style.borderColor = h ? "#0F172A" : "#C5A059";
        ringRef.current.style.opacity     = h ? "0.80"   : "0.50";
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* ── Imagem do Cursor Anexado ───────────────────────── */}
      <img
        ref={dotRef as any}
        src={cursorImg}
        alt=""
        className="cursor-image"
        style={{ opacity: 1, visibility: "visible", display: "block" }}
        aria-hidden
      />

      {/* ── Trailing ring ───────────────────────── */}
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
