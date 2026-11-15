"use client";

import React, { useState, useTransition } from "react";
import { 
  X, 
  Send, 
  UploadCloud, 
  CheckCircle,
  Mail,
  Copy,
  ExternalLink
} from "lucide-react";
import { SERVICES, Project } from "@/data/content";
import { supabase } from "@/lib/supabase";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProject?: Project | null;
}

export function QuoteModal({ isOpen, onClose, preselectedProject }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceId: preselectedProject ? "power-bi" : "power-bi",
    budget: "$300 - $700",
    timeline: "1 - 2 weeks",
    description: preselectedProject 
      ? `Inquiring about building a customized solution similar to "${preselectedProject.title}".`
      : "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const ref = "ANL-" + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(ref);

    // 1. Dispatch through server-side API endpoint
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceId: ref,
          ...formData,
        }),
      });
    } catch (err) {
      console.warn("Server email dispatch error:", err);
    }

    // 2. Also log to Supabase Cloud
    try {
      await supabase.from("enquiries").insert([
        {
          reference_id: ref,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service_id: formData.serviceId,
          budget: formData.budget,
          timeline: formData.timeline,
          description: formData.description,
          status: "New",
        },
      ]);
    } catch (err) {
      console.warn("Supabase log error:", err);
    }

    // 3. Keep in local storage as reliable fallback
    try {
      const existing = JSON.parse(localStorage.getItem("analytique_leads") || "[]");
      localStorage.setItem("analytique_leads", JSON.stringify([
        {
          ...formData,
          referenceId: ref,
          status: "New",
          timestamp: new Date().toISOString(),
        },
        ...existing
      ]));
    } catch (err) {
      console.warn("Local storage write error:", err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  const mailtoLink = `mailto:analytique.team@gmail.com?subject=${encodeURIComponent(
    `[Quote Inquiry ${referenceId}] - ${formData.name}`
  )}&body=${encodeURIComponent(
    `Client Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nService: ${formData.serviceId}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\n\nProject Brief:\n${formData.description}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-[#161816]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#FAF8F4] border border-[#E0D9CC] rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E1D4] bg-white sticky top-0 z-20">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1E201E]">
              Request a Project Quote
            </h3>
            <p className="text-xs text-[#7A8072]">
              Direct review by Syed Shahriar Ahmed • analytique.team@gmail.com
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D6] text-[#484D42] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#1E201E]">
                Quote Request Logged!
              </h4>
              <p className="text-sm text-[#545A4E] max-w-md mx-auto">
                Thank you, <strong>{formData.name}</strong>. Your enquiry has been registered under reference:
              </p>
              <div className="inline-block px-4 py-2 bg-white border border-[#D5CDC0] rounded-xl font-mono text-base font-bold text-[#1E201E]">
                {referenceId}
              </div>

              {/* Direct Mail trigger for 100% guarantee */}
              <div className="pt-2 max-w-md mx-auto space-y-3">
                <a
                  href={mailtoLink}
                  className="w-full py-3 bg-[#1E201E] hover:bg-[#343831] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4 text-[#A66F4F]" />
                  Open Direct Mail to Syed (One-Click)
                </a>
                <p className="text-[11px] text-[#7A8272]">
                  This guarantees your inquiry reaches Syed immediately via your default mail client.
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAE3D5]">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-[#585E50] hover:text-[#1E201E] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#353931] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      startTransition(() => {
                        setFormData((prev) => ({ ...prev, name: val }));
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2C5] bg-white text-sm text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#A66F4F]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#353931] mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      const val = e.target.value;
                      startTransition(() => {
                        setFormData((prev) => ({ ...prev, email: val }));
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2C5] bg-white text-sm text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#A66F4F]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#353931] mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Northstar Retail"
                    value={formData.company}
                    onChange={(e) => {
                      const val = e.target.value;
                      startTransition(() => {
                        setFormData((prev) => ({ ...prev, company: val }));
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2C5] bg-white text-sm text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#A66F4F]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#353931] mb-1.5">
                    Primary Service Needed *
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => {
                      const val = e.target.value;
                      startTransition(() => {
                        setFormData((prev) => ({ ...prev, serviceId: val }));
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2C5] bg-white text-sm text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#A66F4F]/40"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#353931] mb-1.5">
                    Budget Expectation
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => {
                      const val = e.target.value;
                      startTransition(() => {
                        setFormData((prev) => ({ ...prev, budget: val }));
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2C5] bg-white text-sm text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#A66F4F]/40"
                  >
                    <option value="Under $300">Under $300 (Small Automation / Fix)</option>
                    <option value="$300 - $700">$300 - $700 (Complete Dashboard / ETL)</option>
                    <option value="$700 - $1,500">$700 - $1,500 (Multi-source BI Pipeline)</option>
                    <option value="$1,500+">$1,500+ (Enterprise / Ongoing Retainer)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#353931] mb-1.5">
                    Desired Delivery Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => {
                      const val = e.target.value;
                      startTransition(() => {
                        setFormData((prev) => ({ ...prev, timeline: val }));
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2C5] bg-white text-sm text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#A66F4F]/40"
                  >
                    <option value="Within 5 days">Express (Within 5 days)</option>
                    <option value="1 - 2 weeks">Standard (1 - 2 weeks)</option>
                    <option value="Flexible">Flexible / Ongoing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#353931] mb-1.5">
                  Project Brief & Business Question *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your dataset, current bottlenecks (e.g. manual Excel errors, slow SQL), and the desired deliverables..."
                  value={formData.description}
                  onChange={(e) => {
                    const val = e.target.value;
                    startTransition(() => {
                      setFormData((prev) => ({ ...prev, description: val }));
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2C5] bg-white text-sm text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#A66F4F]/40"
                />
              </div>

              <div className="p-3.5 bg-white border border-dashed border-[#C5BCAD] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <UploadCloud className="w-5 h-5 text-[#A66F4F]" />
                  <div>
                    <span className="text-xs font-semibold text-[#1E201E] block">
                      Optional: Sample Dataset / Brief
                    </span>
                    <span className="text-[11px] text-[#7A8072] block">
                      Anonymized CSV, XLSX, or PDF (can also be emailed after quote)
                    </span>
                  </div>
                </div>
                <label className="px-3 py-1 bg-[#F5F2EB] hover:bg-[#EAE4D7] border border-[#DDD6C8] text-[#343831] text-xs font-medium rounded-lg cursor-pointer">
                  Browse
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider bg-[#1E201E] hover:bg-[#323630] text-white rounded-full transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {loading ? (
                    <span>Processing Submission...</span>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
