'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { MoreVertical, Moon, Sun, Check } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Stylish Vertical Three-Dot Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative flex items-center justify-center h-9 w-9 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#97D7FF] ${
          isOpen
            ? 'bg-cyber-card border-[#97D7FF] text-[#97D7FF] shadow-glow-sky'
            : 'border-cyber-border/70 text-slate-300 hover:text-white hover:border-[#97D7FF]/60 hover:bg-white/5'
        }`}
        aria-label="Theme settings menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Theme settings"
      >
        <MoreVertical className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
        
        {/* Subtle active status indicator dot */}
        <span
          className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full border border-cyber-bg transition-colors ${
            theme === 'dark' ? 'bg-[#97D7FF]' : 'bg-[#F4AC06]'
          }`}
        />
      </button>

      {/* Elegant Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-xl border p-1.5 shadow-2xl backdrop-blur-2xl z-50 transform origin-top-right transition-all duration-200 animate-in fade-in zoom-in-95 ${
            theme === 'dark'
              ? 'bg-[#05131D]/95 border-cyber-border/90 text-slate-200 shadow-[0_12px_40px_rgba(4,19,29,0.9),0_0_25px_rgba(8,98,136,0.25)]'
              : 'bg-[#FDFAF4] border-[#A7CFFF] text-[#05131D] shadow-[0_12px_35px_rgba(167,207,255,0.45)]'
          }`}
          role="menu"
          aria-orientation="vertical"
        >
          {/* Header Tag */}
          <div
            className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest border-b ${
              theme === 'dark'
                ? 'text-[#85A9BE] border-white/10'
                : 'text-[#1E3A5F] border-[#A7CFFF]/40'
            }`}
          >
            SYS // THEME SELECT
          </div>

          <div className="py-1 space-y-1">
            {/* 🌙 Dark Mode Option */}
            <button
              type="button"
              onClick={() => selectTheme('dark')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-150 ${
                theme === 'dark'
                  ? 'bg-[#086288]/30 border border-[#97D7FF]/50 text-[#97D7FF] font-bold shadow-glow-sky'
                  : 'text-slate-600 hover:text-[#05131D] hover:bg-[#C7E5FF]/40'
              }`}
              role="menuitem"
            >
              <div className="flex items-center gap-2.5">
                <Moon className="h-4 w-4 text-[#97D7FF]" />
                <span>🌙 Dark Mode</span>
              </div>
              {theme === 'dark' && (
                <Check className="h-3.5 w-3.5 text-[#97D7FF]" />
              )}
            </button>

            {/* ☀️ Light Mode Option */}
            <button
              type="button"
              onClick={() => selectTheme('light')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-150 ${
                theme === 'light'
                  ? 'bg-[#C7E5FF] border border-[#A7CFFF] text-[#05131D] font-bold shadow-[0_0_15px_rgba(167,207,255,0.6)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              role="menuitem"
            >
              <div className="flex items-center gap-2.5">
                <Sun className="h-4 w-4 text-[#F4AC06]" />
                <span>☀️ Light Mode</span>
              </div>
              {theme === 'light' && (
                <Check className="h-3.5 w-3.5 text-[#05131D]" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
