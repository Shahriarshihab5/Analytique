"use client";

import React, { useState } from "react";
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  Globe, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string>("Tomorrow at 3:00 PM (GMT+6)");
  const [confirmed, setConfirmed] = useState(false);
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", topic: "" });

  if (!isOpen) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-[#161816]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#DDD5C7] rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2D6] bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5F1E8] border border-[#DDD6C8] flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#A66F4F]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1E201E]">
                Schedule 20-Min Discovery Call
              </h3>
              <p className="text-xs text-[#7B8272]">
                With Syed Shahriar Ahmed • 100% Free Consultation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D6] text-[#484D42] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {confirmed ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#1E201E]">
                Discovery Call Confirmed!
              </h4>
              <p className="text-sm text-[#545A4E]">
                Google Meet link and calendar invitation sent to <strong>{clientInfo.email}</strong>.
              </p>
              <div className="p-3 bg-white border border-[#DDD5C7] rounded-xl text-xs font-semibold text-[#1E201E] inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A66F4F]" />
                {selectedSlot}
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setConfirmed(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#1E201E] text-white rounded-full hover:bg-[#323630]"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-5">
              <div className="bg-white p-4 rounded-xl border border-[#E5DFD2] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#767E6D]">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    Timezone: Dhaka (GMT+6) / Worldwide Compatible
                  </span>
                  <span className="text-[#A66F4F]">20 Minutes</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {[
                    "Tomorrow at 3:00 PM (GMT+6)",
                    "Tomorrow at 6:30 PM (GMT+6)",
                    "Wednesday at 4:00 PM (GMT+6)",
                    "Thursday at 7:00 PM (GMT+6)",
                  ].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-lg text-xs font-medium text-left border transition-all ${
                        selectedSlot === slot
                          ? "bg-[#1E201E] text-white border-[#1E201E]"
                          : "bg-[#FAF8F5] text-[#343831] border-[#DDD5C7] hover:border-[#1E201E]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#353931] mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Miller"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2C5] bg-white text-sm text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#A66F4F]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#353931] mb-1.5">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jordan@company.com"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2C5] bg-white text-sm text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#A66F4F]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#353931] mb-1.5">
                  What would you like to discuss?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Automating our weekly sales deck in Power BI"
                  value={clientInfo.topic}
                  onChange={(e) => setClientInfo({ ...clientInfo, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2C5] bg-white text-sm text-[#1E201E] focus:outline-none focus:ring-2 focus:ring-[#A66F4F]/40"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider bg-[#1E201E] hover:bg-[#343831] text-white rounded-full transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Confirm Discovery Call
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

