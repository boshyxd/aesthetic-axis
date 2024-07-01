"use client";

import { motion } from "framer-motion";

interface LetterPullupProps {
  className?: string;
  words: string;
  delay?: number;
  fontSize?: string;
}

export default function LetterPullup({
  className,
  words,
  delay,
  fontSize = "4rem",
}: LetterPullupProps) {
  const letters = words.split("");

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * (delay ? delay : 0.05),
      },
    }),
  };

  return (
    <div className="flex flex-row justify-center" style={{ fontSize }}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate="animate"
          custom={i}
          className={className}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}
