"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const TopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to top"
      className={`fixed bottom-4 md:bottom-10 md:right-10 right-4 z-50 rounded-full bg-red-600 p-3 hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-red-700
        ${show ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"}
      `}
    >
      <ArrowUp className="w-5 h-5 text-white stroke-[3]" />
    </button>
  );
};

export default TopButton;
