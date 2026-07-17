import { useCallback, useEffect, useState } from "react";

/** Presenter-safe step index with optional autoplay loop. */
export function useAutoplayStep(length: number, intervalMs = 2200) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || length <= 1) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [playing, length, intervalMs]);

  const go = useCallback(
    (i: number) => {
      setStep(((i % length) + length) % length);
      setPlaying(false);
    },
    [length],
  );

  const next = useCallback(() => {
    setStep((s) => (s + 1) % length);
    setPlaying(false);
  }, [length]);

  const toggle = useCallback(() => setPlaying((p) => !p), []);

  return { step, setStep: go, next, playing, toggle, setPlaying };
}
