"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  Maximize2
} from "lucide-react";
import { Github } from "@/components/GithubIcon";
import { Project } from "@/data/content";

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
  featured?: boolean;
}

export function ProjectCard({ project, onSelect, featured = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out, box-shadow 0.5s ease",
      }}
      className={`group cursor-pointer rounded-2xl bg-white border border-[#E5E0D5] p-6 lg:p-7 shadow-[0_4px_24px_-4px_rgba(30,32,30,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(30,32,30,0.12)] transition-shadow relative overflow-hidden flex flex-col justify-between ${
        featured ? "lg:col-span-2" : "col-span-1"
      }`}
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: "radial-gradient(600px circle at 50% 0%, rgba(166, 111, 79, 0.08), transparent 70%)"
        }}
      />

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F2EB] text-[#555C4A] border border-[#E3DDD1]">
            <Layers className="w-3 h-3 text-[#A66F4F]" />
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <span className="text-xs text-[#78806B] font-medium flex items-center gap-1 group-hover:text-[#1E201E]">
                <Github className="w-3.5 h-3.5" />
                Code Available
              </span>
            )}
            <div className="w-7 h-7 rounded-full bg-[#F5F2EB] group-hover:bg-[#1E201E] group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-4 h-4 text-[#484C43] group-hover:text-white" />
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#161816] border border-[#EBE6DC] shadow-inner">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
          
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
            <Maximize2 className="w-3 h-3" />
            Inspect Case Study
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E201E] tracking-tight group-hover:text-[#A66F4F] transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-[#555A51] line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-[#F0EBE0] space-y-4">
        <div className="grid grid-cols-3 gap-2 py-1">
          {project.metrics.map((metric, i) => (
            <div key={i} className="text-left">
              <span className="block text-[11px] font-medium text-[#7C8274] uppercase tracking-wider">
                {metric.label}
              </span>
              <span className="block text-sm font-bold text-[#1E201E] mt-0.5">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tools.map((tool, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2 py-0.5 bg-[#FAF8F5] border border-[#E9E4D8] rounded text-[#4B5047]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
