"use client";

import React from "react";
import Image from "next/image";
import { 
  X, 
  Layers, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Terminal,
  ExternalLink
} from "lucide-react";
import { Github } from "@/components/GithubIcon";
import { Project } from "@/data/content";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestQuoteForProject: (p: Project) => void;
}

export function ProjectModal({ project, onClose, onRequestQuoteForProject }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-[#141614]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E0DACF] rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2D6] bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F1E8] text-[#5A6350] border border-[#DDD6C8]">
              {project.category}
            </span>
            <span className="text-xs text-[#808876] hidden sm:inline">
              Verified Production Blueprint
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D6] text-[#42463F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#DDD5C7] shadow-sm bg-black">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1000px"
              priority
            />
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E201E]">
              {project.title}
            </h2>
            <p className="mt-2 text-base text-[#565C50] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-[#EAE3D5]">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <span className="block text-xs font-semibold text-[#7C8373] uppercase tracking-wider">
                  {m.label}
                </span>
                <span className="block text-lg font-bold text-[#1E201E] mt-1">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 bg-white p-6 rounded-xl border border-[#EAE3D5]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A66F4F] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              The Business Question & Challenge
            </h4>
            <p className="text-sm text-[#484D42] leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="space-y-3 bg-white p-6 rounded-xl border border-[#EAE3D5]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6351] flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4" />
              Dataset Architecture & ETL
            </h4>
            <p className="text-sm text-[#484D42] leading-relaxed">
              {project.datasetContext}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E201E]">
              Technical Methodology & Implementation Steps
            </h4>
            <ul className="space-y-2.5">
              {project.approach.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#44493F]">
                  <CheckCircle2 className="w-4 h-4 text-[#A66F4F] shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E201E] mb-2">
              Technologies & Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white border border-[#DDD5C7] rounded-md text-xs font-medium text-[#383C34]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t border-[#E8E2D6] flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-20">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#353931] hover:text-[#1E201E] border border-[#D5CDC0] rounded-full flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                View Code on GitHub
              </a>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onRequestQuoteForProject(project);
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#1E201E] hover:bg-[#343831] text-white rounded-full flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            Request Similar Dashboard
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
