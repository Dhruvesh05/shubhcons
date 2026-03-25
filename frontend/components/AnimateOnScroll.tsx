"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
};

const desktop = {
  left: { x: -50, opacity: 0 },
  right: { x: 50, opacity: 0 },
  up: { y: 50, opacity: 0 },
  down: { y: -50, opacity: 0 },
};

const mobile = {
  left: { x: -20, opacity: 0 },
  right: { x: 20, opacity: 0 },
  up: { y: 20, opacity: 0 },
  down: { y: -20, opacity: 0 },
};

export default function AnimateOnScroll({
  children,
  direction = "up",
  delay = 0,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // avoids hydration mismatch
  }

  const initialVariant = isDesktop ? desktop[direction] : mobile[direction];

  return (
    <motion.div
      initial={shouldReduceMotion ? false : initialVariant}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration: isDesktop ? 0.7 : 0.4,
        ease: "easeOut",
        delay,
      }}
      viewport={{ once: true }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
