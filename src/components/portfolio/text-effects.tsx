"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const scrambleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";

export function TypewriterText({
  text,
  phrases,
  className,
  speed = 34,
  deleteSpeed = 18,
  startDelay = 250,
  holdDelay = 1800,
  swapDelay = 260
}: {
  text: string;
  phrases?: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  startDelay?: number;
  holdDelay?: number;
  swapDelay?: number;
}) {
  const [visibleText, setVisibleText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const phraseList = useMemo(() => {
    const uniquePhrases = [text, ...(phrases ?? [])].filter(
      (phrase, index, allPhrases) =>
        phrase.trim().length > 0 && allPhrases.indexOf(phrase) === index
    );

    return uniquePhrases.length > 0 ? uniquePhrases : [text];
  }, [phrases, text]);
  const activePhrase = phraseList[phraseIndex] ?? text;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [prefersReducedMotion, startDelay]);

  useEffect(() => {
    if (prefersReducedMotion || !hasStarted) {
      return;
    }

    const hasMultiplePhrases = phraseList.length > 1;
    const isPhraseComplete = visibleText === activePhrase;
    const isPhraseDeleted = visibleText.length === 0;
    const delay = isDeleting
      ? deleteSpeed
      : isPhraseComplete && hasMultiplePhrases
        ? holdDelay
        : speed;

    const timeout = setTimeout(() => {
      if (!isDeleting && isPhraseComplete) {
        if (hasMultiplePhrases) {
          setIsDeleting(true);
        }
        return;
      }

      if (isDeleting && isPhraseDeleted) {
        setIsDeleting(false);
        setPhraseIndex((currentIndex) => (currentIndex + 1) % phraseList.length);
        return;
      }

      setVisibleText((currentText) =>
        isDeleting
          ? activePhrase.slice(0, Math.max(0, currentText.length - 1))
          : activePhrase.slice(0, currentText.length + 1)
      );
    }, isDeleting && isPhraseDeleted ? swapDelay : delay);

    return () => clearTimeout(timeout);
  }, [
    activePhrase,
    deleteSpeed,
    hasStarted,
    holdDelay,
    isDeleting,
    phraseList.length,
    prefersReducedMotion,
    speed,
    swapDelay,
    visibleText
  ]);

  const renderedText = prefersReducedMotion ? activePhrase : visibleText;
  const ariaLabel =
    phraseList.length > 1 ? phraseList.join(". ") : activePhrase;

  return (
    <span aria-label={ariaLabel} className={className}>
      <span aria-hidden>{renderedText}</span>
      {!prefersReducedMotion ? (
        <span aria-hidden className="ml-1 inline-block animate-pulse">
          |
        </span>
      ) : null}
    </span>
  );
}

export function ScrambleText({
  text,
  className,
  duration = 680
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [output, setOutput] = useState(text);

  const frames = useMemo(
    () => Math.max(10, Math.round(duration / 32)),
    [duration]
  );

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      return;
    }

    let frame = 0;
    const interval = setInterval(() => {
      frame += 1;
      const progress = frame / frames;
      const next = text
        .split("")
        .map((character, index) => {
          if (character === " ") {
            return " ";
          }

          const revealAt = index / text.length;
          if (progress >= revealAt + 0.22) {
            return character;
          }

          return scrambleCharacters[
            Math.floor(Math.random() * scrambleCharacters.length)
          ];
        })
        .join("");

      setOutput(next);

      if (frame >= frames) {
        clearInterval(interval);
        setOutput(text);
      }
    }, 32);

    return () => clearInterval(interval);
  }, [frames, isInView, prefersReducedMotion, text]);

  return (
    <span ref={ref} aria-label={text} className={className}>
      <span aria-hidden>{output}</span>
    </span>
  );
}
