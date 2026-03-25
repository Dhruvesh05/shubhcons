"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const SLIDES = [
  {
    image: "Bharat-Talpada_Portrait.webp",
    alt: "Bharat Talpada(Founder)",
    text: "Good buildings come from good people, and all problems are solved by good design",
    name: "Bharat Talpada",
    designation: "Founder",
    phone: "+91 91069 40724",
    email: "j.talpada@shubhconstructions.com",
    direction: "ltr",
  },
  {
    image: "Jagdish-Vaghela_Portrait.webp",
    alt: "Jagdish Vaghela(Billing & Planning Engineer)",
    text: "An idea is salvation by imagination",
    name: "Jagdish Vaghela",
    designation: "Billing & Planning Engineer",
    phone: "+91 99096 83275",
    email: "jagdish@shubhconstructions.com",
    direction: "rtl",
  },
  {
    image: "Amarsinh_Portrait.webp",
    alt: "Amarsinh(Site Incharge)",
    text: "The sun never knew how great it was until it hit the side of a building",
    name: "Amar Singh",
    designation: "Site Incharge",
    phone: "+91 87564 59152",
    email: "amar@shubhconstructions.com",
    direction: "ltr",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Auto Slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: "linear",
      }}
      className="bg-[url('/projects_photo/BG.webp')] bg-center bg-cover bg-no-repeat relative h-[600px] overflow-hidden w-full"
      role="banner"
    >
      {/* Slides */}
      {/* Slides + Content */}
      {SLIDES.map((slide, index) => {
        const isActive = index === current;

        return (
          <div
            key={index}
            className={`
        absolute inset-0
        flex items-center justify-center
        transition-opacity duration-[900ms] ease-in-out
        ${isActive ? "opacity-100 z-20" : "opacity-0 z-10"}
      `}
          >
            {/* MAIN RESPONSIVE WRAPPER */}
            <div
              className="
          w-full h-full
          flex flex-col
          md:flex-row
          items-center
          md:items-center
          md:pt-32
          justify-center
          px-4 sm:px-8 md:px-16
          mt-10
          md:mt-0
          gap-3 sm:gap-4 md:gap-6 lg:gap-8
        "
            >
              {/* IMAGE */}
              <div
                className={`
            transition-transform duration-[1200ms] ease-out
            ${isActive ? "translate-x-0 scale-100" : "translate-x-8 scale-95"}
            flex-shrink-0
          `}
              >
                <div className="w-[220px] sm:w-[280px] md:w-[490px] lg:w-[510px]">
                  <Image
                    src={`/projects_photo/${slide.image}`}
                    alt={slide.alt}
                    width={620}
                    height={720}
                    priority={index === 0}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div
                className={`
            max-w-2xl
            text-left
            transition-transform duration-[900ms] ease-out
            ${
              isActive ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            }
          `}
              >
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-black leading-relaxed">
                  {slide.text}
                </p>

                {/* PERSON INFO */}
                <div className="mt-4">
                  <span className="block font-semibold text-sm text-white">
                    {slide.name}
                  </span>
                  <span className="block text-xs md:text-sm text-gray-300">
                    {slide.designation}
                  </span>
                  <span className="flex items-center md:justify-start gap-2 text-xs md:text-sm text-white">
                    <Phone size={12} /> {slide.phone}
                  </span>
                  <span className="block text-xs md:text-sm text-white mt-1 whitespace-nowrap">
                    ✉ {slide.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Left Arrow */}
      <motion.button
        onClick={prev}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.6,
          ease: "linear",
        }}
        aria-label="Previous slide"
        className="absolute  left-2 sm:left-6 top-1/2  -translate-y-1/2 z-30 w-12 h-12 active:scale-90 transition-all duration-300 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white text-2xl"
      >
        ‹
      </motion.button>

      {/* Right Arrow */}
      <motion.button
        onClick={next}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.6,
          ease: "linear",
        }}
        aria-label="Next slide"
        className="absolute right-2 sm:right-6 top-1/2 active:scale-90 transition-all duration-300 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white text-2xl"
      >
        ›
      </motion.button>

      {/* Indicators */}
      <motion.div
        className="absolute bottom-8  left-1/2 -translate-x-1/2 z-30 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.8,
          ease: "easeOut",
        }}
      >
        {SLIDES.map((_, index) => (
          <button
            key={index}
            aria-current={index === current ? "true" : undefined}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? "w-8 bg-red-500"
                : "w-2 bg-black/50 hover:bg-black"
            }`}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
