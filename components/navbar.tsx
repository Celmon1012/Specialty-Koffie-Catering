"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const NavLink = ({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const isActive: (href: string) => boolean = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const active = isActive(href);
  return (
    <button
      type="button"
      onClick={(e) => {
        if (onClick) onClick(e);
        router.push(href);
      }}
      className={`cursor-pointer transition ${active ? "text-[#395cff]" : "text-black"} ${className || ""}`}
    >
      <span className="relative inline-flex items-center cursor-pointer">
        <span className="relative">{children}</span>
      </span>
    </button>
  );
};

export default function Navbar() {
  const dienstenRef = useRef<HTMLLIElement | null>(null);
  const [dienstenOpen, setDienstenOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [mobileOpen]);

  const pathname = usePathname() || "/";
  const isActive: (href: string) => boolean = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const router = useRouter();
  const [mobileDienstenOpen, setMobileDienstenOpen] = useState(false);

  const handleDienstenBlur = (e: React.FocusEvent) => {
    const related = e.relatedTarget as HTMLElement | null;
    if (!dienstenRef.current) {
      setDienstenOpen(false);
      return;
    }
    if (!related || !dienstenRef.current.contains(related)) {
      setDienstenOpen(false);
    }
  };

  // Close mobile menu on nav link click
  const handleNavClick = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] bg-white">
      {/* Border line */}
      <div
        className="absolute left-0 right-0 bottom-0 border-b border-black pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between relative h-16 md:h-20">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          id="nav-logo"
          aria-label="Ga naar de homepagina"
          className="inline-block transform origin-left scale-150 md:scale-100 md:ml-0 lg:scale-150 lg:-ml-16"
          onClick={handleNavClick}
        >
          <Image
            src="/L1.png"
            alt="MENNO'S Koffiebar Logo"
            width={160}
            height={48}
            className="w-20 h-auto md:w-28 lg:w-32 object-contain"
            priority
          />
        </Link>

        {/* Hamburger for mobile/tablet */}
        <button
          className="lg:hidden ml-auto p-2 rounded focus:outline-none focus:ring-2 focus:ring-black z-[230]"
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-1 items-center justify-center lg:ml-8">
          <ul className="flex items-center gap-6 xl:gap-10 text-base xl:text-lg">
            <li>
              <NavLink href="/tarieven" onClick={handleNavClick} className="hover:text-[#395cff] cursor-pointer">
                Tarieven
              </NavLink>
            </li>
            <li>
              <NavLink href="/menu" onClick={handleNavClick} className="hover:text-[#395cff] cursor-pointer">
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink href="/galerij" onClick={handleNavClick} className="hover:text-[#395cff] cursor-pointer">
                Galerij
              </NavLink>
            </li>
            <li
              className="relative"
              ref={dienstenRef}
              onMouseEnter={() => {
                if (closeTimeoutRef.current) {
                  window.clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = null;
                }
                setDienstenOpen(true);
              }}
              onMouseLeave={() => {
                closeTimeoutRef.current = window.setTimeout(() => {
                  setDienstenOpen(false);
                  closeTimeoutRef.current = null;
                }, 200);
              }}
              onFocus={() => {
                if (closeTimeoutRef.current) {
                  window.clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = null;
                }
                setDienstenOpen(true);
              }}
              onBlur={handleDienstenBlur}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1 hover:text-[#395cff] cursor-pointer transition ${isActive("/diensten") ? "text-[#395cff]" : "text-black"}`}
                aria-haspopup="true"
                aria-expanded={dienstenOpen || isActive("/diensten")}
                onClick={() => setDienstenOpen((prev) => !prev)}
              >
                <span className="relative inline-flex items-center cursor-pointer">
                  <span className="relative flex items-center gap-1">
                    Diensten
                    <svg
                      className={`w-4 h-4 text-black opacity-75 transform transition-transform duration-200 ease-in-out ${dienstenOpen ? 'rotate-180' : 'rotate-0'}`}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </button>

              <div
                className={
                  `absolute left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg transition-all duration-150 ease-out z-50 ` +
                  (dienstenOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 translate-y-1 scale-95 pointer-events-none")
                }
                role="menu"
              >
                <ul className="py-2">
                  <li>
                    <button
                      type="button"
                      className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => { router.push("/diensten/koffie-catering"); handleNavClick(); }}
                    >
                      Specialty Koffie Catering
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <NavLink href="/contact" onClick={handleNavClick} className="hover:text-[#395cff] cursor-pointer">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right: CTA Button - Desktop only */}
        <div className="hidden lg:flex ml-4 xl:ml-8 flex-shrink-0">
          <Link
            href="/offerte"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition text-sm xl:text-base whitespace-nowrap"
            onClick={handleNavClick}
          >
            Offerte Aanvragen
          </Link>
        </div>

        {/* Mobile Nav Drawer */}
        <div
          className={`fixed inset-0 z-[210] bg-transparent transition-opacity duration-200 ${mobileOpen ? "block" : "hidden"}`}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`fixed top-0 right-0 z-[220] w-4/5 sm:w-80 max-w-sm h-full bg-white shadow-xl transform transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-neutral-200">
            <Link
              href="/"
              aria-label="Ga naar de homepagina"
              className="inline-flex items-center justify-center w-auto h-auto cursor-pointer"
              onClick={handleNavClick}
            >
              <Image
                src="/L1.png"
                alt="Logo"
                width={96}
                height={28}
                className="w-20 h-auto object-contain transform origin-left scale-150 md:scale-150 lg:scale-150"
                priority
              />
            </Link>
            <button
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-black hover:bg-neutral-100 transition-colors"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col gap-1 px-4 md:px-6 py-6 overflow-y-auto overscroll-contain h-[calc(100vh-80px)]">
            <li>
              <NavLink href="/tarieven" onClick={handleNavClick} className="hover:text-[#395cff] py-3 px-2 block text-base md:text-lg font-medium">
                Tarieven
              </NavLink>
            </li>
            <li>
              <NavLink href="/menu" onClick={handleNavClick} className="hover:text-[#395cff] py-3 px-2 block text-base md:text-lg font-medium">
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink href="/galerij" onClick={handleNavClick} className="hover:text-[#395cff] py-3 px-2 block text-base md:text-lg font-medium">
                Galerij
              </NavLink>
            </li>
            <li>
              <div>
                <div className="w-full flex items-center justify-between py-3 px-2">
                  <button
                    type="button"
                    className="text-left flex-1 hover:text-[#395cff] text-base md:text-lg font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileDienstenOpen((v) => !v);
                    }}
                  >
                    <span className="block">Diensten</span>
                  </button>
                  <button
                    type="button"
                    className="p-1 ml-2 hover:bg-neutral-100 rounded transition-colors"
                    aria-label={mobileDienstenOpen ? 'Sluit submenu' : 'Open submenu'}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileDienstenOpen((v) => !v);
                    }}
                  >
                    <svg className={`w-5 h-5 text-black transform transition-transform duration-200 ease-in-out ${mobileDienstenOpen ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                {mobileDienstenOpen && (
                  <ul className="pl-4 mt-1 space-y-1">
                    <li>
                      <button
                        type="button"
                        className="cursor-pointer block w-full text-left py-2 px-2 text-sm md:text-base text-neutral-600 hover:text-[#395cff] hover:bg-neutral-50 rounded transition-colors"
                        onClick={() => { router.push("/diensten/koffie-catering"); handleNavClick(); }}
                      >
                        Specialty Koffie Catering
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <NavLink href="/contact" onClick={handleNavClick} className="hover:text-[#395cff] py-3 px-2 block text-base md:text-lg font-medium">
                Contact
              </NavLink>
            </li>
            <li className="mt-4 pt-4 border-t border-neutral-200">
              <Link
                href="/offerte"
                className="inline-flex items-center justify-center w-full py-3 px-4 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition text-base md:text-lg font-medium"
                style={{ textDecoration: "none" }}
                onClick={handleNavClick}
              >
                Offerte Aanvragen
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
