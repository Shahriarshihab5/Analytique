"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Menu, 
  X, 
  ArrowRight, 
  Calendar, 
  Mail,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenQuote: () => void;
}

export function Navbar({ onOpenBooking, onOpenQuote }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F8F6F0]/90 backdrop-blur-md border-b border-[#E8E3D7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#1E201E] flex items-center justify-center text-white shadow-sm group-hover:bg-[#A66F4F] transition-colors">
              <BarChart3 className="w-5 h-5 text-[#F8F6F0]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1E201E]">
                Analytique<span className="text-[#A66F4F]">.</span>
              </span>
              <p className="text-[10px] tracking-wider text-[#78806B] uppercase font-semibold">
                Data Operations & BI
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#464A42]">
            <Link href="#services" className="hover:text-[#1E201E] transition-colors">
              Services
            </Link>
            <Link href="#work" className="hover:text-[#1E201E] transition-colors">
              Our Work
            </Link>
            <Link href="#demo" className="hover:text-[#1E201E] transition-colors">
              Live Demo
            </Link>
            <Link href="#about" className="hover:text-[#1E201E] transition-colors">
              About
            </Link>
            <Link href="#testimonials" className="hover:text-[#1E201E] transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="hover:text-[#1E201E] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#353932] hover:text-[#1E201E] border border-[#DDD6C8] hover:border-[#1E201E] rounded-full transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#A66F4F]" />
              Book Discovery Call
            </button>
            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#1E201E] hover:bg-[#323630] text-white rounded-full transition-all shadow-sm flex items-center gap-2 group"
            >
              Request a Quote
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#1E201E] hover:bg-[#EAE4D7] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#F8F6F0] border-b border-[#E5E0D5] px-6 py-6 space-y-4">
          <div className="flex flex-col gap-4 text-base font-medium text-[#2E312B]">
            <Link 
              href="#services" 
              onClick={() => setIsOpen(false)} 
              className="py-1 border-b border-[#EFECE4]"
            >
              Services
            </Link>
            <Link 
              href="#work" 
              onClick={() => setIsOpen(false)} 
              className="py-1 border-b border-[#EFECE4]"
            >
              Our Work & Projects
            </Link>
            <Link 
              href="#demo" 
              onClick={() => setIsOpen(false)} 
              className="py-1 border-b border-[#EFECE4]"
            >
              Live Analytics Demo
            </Link>
            <Link 
              href="#about" 
              onClick={() => setIsOpen(false)} 
              className="py-1 border-b border-[#EFECE4]"
            >
              About Syed Shahriar
            </Link>
            <Link 
              href="#testimonials" 
              onClick={() => setIsOpen(false)} 
              className="py-1 border-b border-[#EFECE4]"
            >
              Client Testimonials
            </Link>
            <Link 
              href="#contact" 
              onClick={() => setIsOpen(false)} 
              className="py-1 border-b border-[#EFECE4]"
            >
              Contact
            </Link>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => { setIsOpen(false); onOpenBooking(); }}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-center border border-[#1E201E] rounded-full"
            >
              Book Discovery Call
            </button>
            <button
              onClick={() => { setIsOpen(false); onOpenQuote(); }}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-center bg-[#1E201E] text-white rounded-full flex items-center justify-center gap-2"
            >
              Request a Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

