"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const isAdminRoute = pathname?.startsWith("/admin")

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About us" },
    { href: "/services", label: "Services" },
    { href: "/project", label: "Projects" },
    { href: "/contact-us", label: "Contact us" },
     { href: "/careers", label: "Careers" },
  ]

  useEffect(() => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector(`a[href="${pathname}"]`)
      if (activeLink) {
        const navRect = navRef.current.getBoundingClientRect()
        const linkRect = activeLink.getBoundingClientRect()
        setIndicatorStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        })
      }
    }
  }, [pathname])

  const handleGetQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/contact-us") {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  if (isAdminRoute) {
    return null
  }

  return (
    <header>
      <nav
        aria-label="Main navigation"
        className="bg-[url('/bgc.jpg')] bg-cover bg-top bg-no-repeat text-primary-foreground fixed top-0 left-0 text-white right-0 z-50 shadow-md border-b border-black/20"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-28">
            {/* Logo */}
            <Link
              href="/"
              className="flex whitespace-nowrap shrink-none items-center"
            >
              <div className="h-24 lg:ml-6">
                <img
                  src="/shubh-construction-logo.png"
                  alt="Shubh Construction – Civil & Industrial Construction Company in Gujarat"
                  className="h-full w-auto"
                ></img>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div
              className="hidden md:flex tracking-wide text-black items-center md:whitespace-nowrap lg:space-x-8 md:space-x-6 relative"
              ref={navRef}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative hover:text-red-700 font-sans font-medium pb-1 transition-colors duration-200 ${
                    pathname === link.href ? "text-red-700" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <span
                className="absolute bottom-0 h-0.5 bg-red-700 transition-all duration-500 ease-in-out"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />
              <Link
                href="/contact-us"
                rel="nofollow"
                onClick={handleGetQuoteClick}
                className="inline-block bg-red-600 hover:bg-red-700 shadow-black font-sans whitespace-nowrap text-white px-4 py-2 rounded-md font-medium hover:scale-110 active:scale-95 transition-all duration-300"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-black p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-4 pt-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`hover:text-red-700 text-black transition-colors duration-200 font-medium ${
                      pathname === link.href ? "text-red-700 font-bold" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact-us"
                  onClick={(e) => {
                    handleGetQuoteClick(e);
                    setIsOpen(false);
                  }}
                  rel="nofollow"
                  className="bg-red-600 hover:scale-105 hover:bg-red-700 w-full px-4 py-2 rounded-md font-medium text-center transition-all active:scale-95 duration-300"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}