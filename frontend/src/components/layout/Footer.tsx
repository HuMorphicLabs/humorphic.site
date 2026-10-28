'use client';

import React from 'react';
import Link from 'next/link';

export interface FooterProps {
  onOpenNeuralLink?: () => void;
}

export const Footer = ({ onOpenNeuralLink }: FooterProps) => {
  return (
    <footer className="relative border-t border-[#4E4F56] bg-[#393A3F] pt-12 pb-10 overflow-hidden transition-colors duration-300">
      {/* Background ambient micro-grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            1. HORIZONTAL THREE-SECTION ROW (DESKTOP: SIDE-BY-SIDE IN ONE ROW)
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 max-w-3xl mx-auto">
          
          {/* Section 1: About Us */}
          <div className="flex flex-col items-center sm:items-start space-y-3">
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-white flex items-center gap-2">
              <span className="footer-heading-dot h-1.5 w-1.5 rounded-full bg-[#97D7FF] shadow-[0_0_8px_rgba(151,215,255,0.8)]" />
              About Us
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about-us"
                  className="footer-nav-link font-sans text-sm text-[#E2E8F0] hover:text-[#97D7FF] transition-colors duration-200 inline-flex items-center gap-1.5 group font-medium"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 2: Services */}
          <div className="flex flex-col items-center sm:items-start space-y-3">
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-white flex items-center gap-2">
              <span className="footer-heading-dot h-1.5 w-1.5 rounded-full bg-[#97D7FF] shadow-[0_0_8px_rgba(151,215,255,0.8)]" />
              Services
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#application"
                  className="footer-nav-link font-sans text-sm text-[#E2E8F0] hover:text-[#97D7FF] transition-colors duration-200 inline-flex items-center gap-1.5 group font-medium"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Application</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="footer-nav-link font-sans text-sm text-[#E2E8F0] hover:text-[#97D7FF] transition-colors duration-200 inline-flex items-center gap-1.5 group font-medium"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Robot Features</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact Us */}
          <div className="flex flex-col items-center sm:items-start space-y-3">
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-white flex items-center gap-2">
              <span className="footer-heading-dot h-1.5 w-1.5 rounded-full bg-[#97D7FF] shadow-[0_0_8px_rgba(151,215,255,0.8)]" />
              Contact Us
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#contact"
                  className="footer-nav-link font-sans text-sm text-[#E2E8F0] hover:text-[#97D7FF] transition-colors duration-200 inline-flex items-center gap-1.5 group font-medium"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            2. SUBTLE DIVIDER
            ========================================================================= */}
        <div className="footer-divider w-full max-w-3xl mx-auto my-8 border-t border-white/15 transition-colors duration-300" />

        {/* =========================================================================
            3. SOCIAL MEDIA ROW (CENTERED, HORIZONTALLY ALIGNED WITH ACTUAL LINKS)
            ========================================================================= */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-center gap-5 sm:gap-6">
            
            {/* Instagram */}
            <a
              href="https://www.instagram.com/humorphic.labs?dlrf=ZW04dnM0cHFpZXJo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="footer-social-icon p-2 rounded-xl border border-black/10 dark:border-white/20 bg-white/70 dark:bg-white/[0.08] hover:scale-110 active:scale-95 transition-all duration-200 inline-flex items-center justify-center shadow-sm"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    id="instagram-brand-gradient"
                    cx="30%"
                    cy="107%"
                    r="130%"
                    fx="30%"
                    fy="107%"
                  >
                    <stop offset="0%" stopColor="#fdf497" />
                    <stop offset="5%" stopColor="#fdf497" />
                    <stop offset="45%" stopColor="#fd5949" />
                    <stop offset="60%" stopColor="#d6249f" />
                    <stop offset="90%" stopColor="#285AEB" />
                  </radialGradient>
                </defs>
                <rect width="24" height="24" rx="5.5" fill="url(#instagram-brand-gradient)" />
                <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.6" fill="none" />
                <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.6" fill="none" />
                <circle cx="15.8" cy="8.2" r="0.9" fill="#FFFFFF" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/humorphic-labs/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="footer-social-icon p-2 rounded-xl border border-black/10 dark:border-white/20 bg-white/70 dark:bg-white/[0.08] hover:scale-110 active:scale-95 transition-all duration-200 inline-flex items-center justify-center shadow-sm"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4.5" fill="#0A66C2" />
                <path
                  d="M7.119 9.297h-2.74v8.837h2.74V9.297zM5.748 5.867c-.878 0-1.588.71-1.588 1.587 0 .878.71 1.588 1.588 1.588.877 0 1.587-.71 1.587-1.588 0-.877-.71-1.587-1.587-1.587zm13.385 7.643c0-2.887-1.54-4.229-3.593-4.229-1.656 0-2.398.912-2.812 1.55v-1.334H9.988c.036.773 0 8.837 0 8.837h2.74v-4.935c0-.264.019-.527.097-.716.213-.528.699-1.074 1.514-1.074 1.067 0 1.494.813 1.494 2.004v5.721h2.74v-5.28c.001-.226.001-.453.001-.453z"
                  fill="#FFFFFF"
                />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@humorphiclabs?si=ogTkyoUYuXuZNySE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="footer-social-icon p-2 rounded-xl border border-black/10 dark:border-white/20 bg-white/70 dark:bg-white/[0.08] hover:scale-110 active:scale-95 transition-all duration-200 inline-flex items-center justify-center shadow-sm"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
                  fill="#FF0000"
                />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#FFFFFF" />
              </svg>
            </a>

          </div>

          <div className="footer-copyright text-[11px] font-mono text-[#CBD5E1] text-center tracking-wider transition-colors duration-200">
            HUMORPHIC LABS © 2026 • ALL RIGHTS RESERVED
          </div>
        </div>

      </div>
    </footer>
  );
};
