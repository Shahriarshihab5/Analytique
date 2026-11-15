"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  BarChart3, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Database, 
  FileSpreadsheet, 
  Layers, 
  TrendingUp, 
  Star, 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  ShieldCheck,
  Award,
  Terminal,
  Zap,
  ChevronRight
} from "lucide-react";
import { Github } from "@/components/GithubIcon";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { QuoteModal } from "@/components/QuoteModal";
import { BookingModal } from "@/components/BookingModal";
import { ChatbotAssistant } from "@/components/ChatbotAssistant";
import { PROJECTS, TESTIMONIALS, SERVICES, Project } from "@/data/content";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [quoteTargetProject, setQuoteTargetProject] = useState<Project | null>(null);

  const categories = ["All", "Power BI", "Excel", "SQL", "Python"];

  const filteredProjects = selectedCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleOpenQuoteWithProject = (project: Project) => {
    setQuoteTargetProject(project);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1E201E] relative selection:bg-[#A66F4F]/20">
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenQuote={() => {
          setQuoteTargetProject(null);
          setIsQuoteOpen(true);
        }}
      />

      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-[#E8E2D6]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#A66F4F]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFECE3] border border-[#DDD5C7] text-xs font-semibold text-[#484E40]">
                <span className="w-2 h-2 rounded-full bg-[#A66F4F] animate-pulse" />
                Data Operations & Business Intelligence Consultancy
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-6xl font-bold tracking-tight text-[#1E201E] leading-[1.12]">
                Turning Raw Data Into <span className="italic font-normal text-[#A66F4F]">Clear Business Decisions.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#52574C] leading-relaxed max-w-2xl font-light">
                High-performance Power BI dashboards, automated Excel systems, and deep SQL analytics engineered by an industry operations specialist. We replace spreadsheet chaos with predictable, boardroom-ready clarity.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setQuoteTargetProject(null);
                    setIsQuoteOpen(true);
                  }}
                  className="px-7 py-3.5 bg-[#1E201E] hover:bg-[#343831] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md flex items-center gap-2 group transition-all"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-6 py-3.5 bg-white hover:bg-[#F2ECE0] text-[#1E201E] border border-[#DDD6C8] text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#A66F4F]" />
                  Book 20-Min Discovery Call
                </button>
              </div>

              <div className="pt-8 border-t border-[#E8E2D6] space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7E8676] block">
                  Core Technical Architecture & Standards
                </span>
                <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#3C4136]">
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-[#A66F4F]" /> Power BI & DAX
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-700" /> Advanced Excel & Power Query
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-blue-700" /> SQL (PostgreSQL / MySQL)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-[#A66F4F]" /> Python Pandas
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="editorial-card rounded-3xl p-6 sm:p-8 bg-white border border-[#E0D9CB] shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-[#EFEBE1]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A66F4F]">
                      Featured Production System
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1E201E]">
                      Commercial Sales Engine
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                    Live Verified
                  </span>
                </div>

                <div className="relative w-full aspect-[16/10] my-4 rounded-xl overflow-hidden border border-[#DDD5C7] shadow-inner bg-black">
                  <Image
                    src="/images/projects/sales-performance-2026.jpg"
                    alt="Sales Performance Dashboard"
                    fill
                    className="object-cover"
                    sizes="500px"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 bg-[#FAF7F2] rounded-xl border border-[#EDE7DB] text-center">
                  <div>
                    <span className="text-[10px] text-[#7A8272] uppercase font-bold block">Revenue</span>
                    <span className="text-sm font-bold text-[#1E201E]">$7.0M+</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A8272] uppercase font-bold block">Avg Order</span>
                    <span className="text-sm font-bold text-[#1E201E]">$10.79K</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A8272] uppercase font-bold block">High-Margin</span>
                    <span className="text-sm font-bold text-[#1E201E]">57.95%</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveProject(PROJECTS[2])}
                  className="w-full mt-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#FAF7F2] hover:bg-[#1E201E] hover:text-white text-[#2C3028] border border-[#DDD5C7] rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  Inspect Complete Case Study
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#F1EDE3] border-b border-[#E5DFD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center sm:text-left">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1E201E] block">
                100%
              </span>
              <span className="text-xs font-medium text-[#646B5C] mt-1 block">
                Assessment Score in Live DAX & SQL Modeling
              </span>
            </div>
            <div className="text-center sm:text-left">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1E201E] block">
                1,470+
              </span>
              <span className="text-xs font-medium text-[#646B5C] mt-1 block">
                Records Sanitized in Deep Python Pipelines
              </span>
            </div>
            <div className="text-center sm:text-left">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1E201E] block">
                10+ Hrs
              </span>
              <span className="text-xs font-medium text-[#646B5C] mt-1 block">
                Saved Per Team Weekly with Excel Automation
              </span>
            </div>
            <div className="text-center sm:text-left">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1E201E] block">
                &lt; 24h
              </span>
              <span className="text-xs font-medium text-[#646B5C] mt-1 block">
                Direct Founder Response & Discovery Call
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A66F4F]">
            Capabilities & Engagement Models
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E201E]">
            Data Solutions Built For Business Owners
          </h2>
          <p className="text-sm text-[#5B6153]">
            Practical reporting and business intelligence designed to answer critical commercial questions without technical friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="editorial-card bg-white p-7 rounded-2xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4F0E6] border border-[#DDD6C8] flex items-center justify-center text-[#A66F4F]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1E201E]">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#575C50] leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A8272] block">
                    What You Receive:
                  </span>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((d, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#44493E]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A66F4F] shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0EBE0] flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#7C8273]">
                  {service.turnaround}
                </span>
                <button
                  onClick={() => {
                    setQuoteTargetProject(null);
                    setIsQuoteOpen(true);
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-[#1E201E] hover:text-[#A66F4F] flex items-center gap-1 transition-colors"
                >
                  Request Quote →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="py-20 bg-[#F3EFE6] border-y border-[#E2DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A66F4F]">
                Verified Portfolio & Code
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E201E] mt-2">
                Interactive Project Showcase
              </h2>
              <p className="text-sm text-[#5C6354] mt-1 max-w-xl">
                Hover to experience 3D spatial depth. Each project includes transparent methodology, dataset schemas, and verifiable code.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-full border border-[#DDD6C8] shadow-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    selectedCategory === cat
                      ? "bg-[#1E201E] text-white shadow-sm"
                      : "text-[#585E50] hover:text-[#1E201E]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setActiveProject(p)}
                featured={project.featured}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A66F4F]">
            Interactive Demonstration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E201E]">
            Test The Live Analytics Engine
          </h2>
          <p className="text-sm text-[#5B6253]">
            Toggle regions and view how our dynamic KPI models transform raw transactional metrics into executive dashboards.
          </p>
        </div>

        <InteractiveDemo />
      </section>

      <section id="about" className="py-20 bg-[#F2EDE3] border-y border-[#E2DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-7 rounded-3xl border border-[#DDD5C7] shadow-lg space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#1E201E] flex items-center justify-center text-white font-serif text-2xl font-bold">
                    SA
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1E201E]">
                      Syed Shahriar Ahmed
                    </h3>
                    <p className="text-xs text-[#7A8272] font-medium">
                      Data Operations Officer, Bata Shoe Company
                    </p>
                    <p className="text-xs text-[#A66F4F] font-semibold mt-0.5">
                      Founder, Analytique
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-[#484D42] border-t border-[#EDE7DB]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A8272]">Education</span>
                    <span className="font-semibold text-right">B.Sc. in CSE, Daffodil Intl Univ (3.56 CGPA)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A8272]">English Proficiency</span>
                    <span className="font-semibold text-emerald-800">C1 Advanced (EF SET Certified)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A8272]">Assessment Standard</span>
                    <span className="font-semibold">100% Score in Live Tests & DAX Modeling</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A8272]">Location</span>
                    <span className="font-semibold">Uttara, Bangladesh (Serving Worldwide)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://github.com/syedshahriarahmed0"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-[#FAF8F4] hover:bg-[#1E201E] hover:text-white border border-[#DDD5C7] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 text-[#353931]"
                  >
                    <Github className="w-4 h-4" />
                    Review GitHub Repositories
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A66F4F]">
                Leadership & Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E201E] leading-tight">
                Practical Analytics Rooted In Real Corporate Operations
              </h2>
              <p className="text-sm sm:text-base text-[#52584B] leading-relaxed">
                Most businesses don&apos;t need bloated enterprise software—they need reliable, automated reporting that tells them where margin is leaking and which product lines are driving growth.
              </p>
              <p className="text-sm sm:text-base text-[#52584B] leading-relaxed">
                Currently managing high-volume data operations and MIS reporting in Bata&apos;s Local Sourcing Department, I bring disciplined validation, automated ETL pipelines, and executive-level DAX models to growing global companies.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white rounded-xl border border-[#DDD5C7]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E201E]">
                    Zero Guesswork
                  </h4>
                  <p className="text-xs text-[#5D6355] mt-1">
                    Every measure, join, and calculation is documented and auditable.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#DDD5C7]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E201E]">
                    Rapid Turnaround
                  </h4>
                  <p className="text-xs text-[#5D6355] mt-1">
                    Direct access to the consultant without layers of agency account managers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A66F4F]">
            Client Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E201E]">
            What Global Operators Say
          </h2>
          <p className="text-sm text-[#5B6253]">
            From European retail groups to North American supply chain directors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="editorial-card bg-white p-7 rounded-2xl border border-[#E0D9CB] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-[#3E4338] italic leading-relaxed">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0EBE0]">
                <h4 className="font-serif font-bold text-sm text-[#1E201E]">
                  {t.name}
                </h4>
                <p className="text-xs text-[#7A8272]">
                  {t.role}, {t.company}
                </p>
                <span className="text-[11px] text-[#A66F4F] font-semibold mt-0.5 block">
                  {t.country}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-20 bg-[#1E201E] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A66F4F]">
                Start Your Project
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Ready To Transform Your Data Operations?
              </h2>
              <p className="text-sm sm:text-base text-[#B3B9AC] leading-relaxed max-w-xl">
                Describe your current reporting bottlenecks or send your project brief. We provide clear scoping and transparent estimates within 24 hours.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setQuoteTargetProject(null);
                    setIsQuoteOpen(true);
                  }}
                  className="px-7 py-3.5 bg-[#A66F4F] hover:bg-[#B87D5B] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-2 transition-all"
                >
                  Request a Formal Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-6 py-3.5 bg-[#2B2F2A] hover:bg-[#383D36] text-white border border-[#444A3F] text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#A66F4F]" />
                  Schedule Discovery Call
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#282C27] p-7 rounded-3xl border border-[#3E443A] space-y-5">
              <h3 className="font-serif text-lg font-bold text-white">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-xs text-[#C4CABE]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#333831] flex items-center justify-center text-[#A66F4F]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#838A7C]">Consultancy Email</span>
                    <a href="mailto:analytique.team@gmail.com" className="font-mono text-sm text-white hover:underline">
                      analytique.team@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#333831] flex items-center justify-center text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#838A7C]">Direct / WhatsApp</span>
                    <span className="font-mono text-sm text-white">+880 1737 712021</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#333831] flex items-center justify-center text-[#A66F4F]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#838A7C]">Headquarters</span>
                    <span className="text-white">Uttara, Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#3B4237] text-[11px] text-[#868D80]">
                Strict NDA & confidentiality protocols observed for all submitted datasets.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#141614] text-[#858C7F] py-12 border-t border-[#262A24] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-lg text-white">
                Analytique<span className="text-[#A66F4F]">.</span>
              </span>
              <span className="text-[11px] text-[#697063]">
                © 2026 Analytique. All rights reserved.
              </span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/admin" className="hover:text-white transition-colors underline">
                Admin Workspace
              </Link>
              <a
                href="https://github.com/syedshahriarahmed0"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub Profile
              </a>
              <a
                href="mailto:analytique.team@gmail.com"
                className="hover:text-white transition-colors"
              >
                analytique.team@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onRequestQuoteForProject={handleOpenQuoteWithProject}
      />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedProject={quoteTargetProject}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <ChatbotAssistant
        onOpenQuote={() => {
          setQuoteTargetProject(null);
          setIsQuoteOpen(true);
        }}
      />
    </div>
  );
}
