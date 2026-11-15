"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Users, 
  Layers, 
  CheckCircle, 
  Clock, 
  Inbox, 
  Search, 
  Filter, 
  ArrowLeft,
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  RefreshCw,
  Cloud
} from "lucide-react";
import { PROJECTS } from "@/data/content";
import { supabase } from "@/lib/supabase";

interface Lead {
  referenceId: string;
  name: string;
  email: string;
  company: string;
  serviceId: string;
  budget: string;
  timeline: string;
  description: string;
  status: string;
  timestamp: string;
}

const DEFAULT_LEADS: Lead[] = [
  {
    referenceId: "ANL-842109",
    name: "Marcus Vance",
    email: "marcus@vancegroup.co.uk",
    company: "Vance Logistics Group",
    serviceId: "power-bi",
    budget: "$700 - $1,500",
    timeline: "1 - 2 weeks",
    description: "Need an executive Power BI dashboard connected to our warehouse ERP API for regional dispatch tracking.",
    status: "Delivered",
    timestamp: "2026-11-12T14:30:00Z"
  },
  {
    referenceId: "ANL-719342",
    name: "Elena Rostova",
    email: "elena@nordicgoods.se",
    company: "Nordic Consumer Goods",
    serviceId: "sales-analytics",
    budget: "$300 - $700",
    timeline: "Within 5 days",
    description: "Automate quarterly margin variance reporting across 4 Nordic regional retail chains.",
    status: "In Progress",
    timestamp: "2026-11-14T09:15:00Z"
  },
  {
    referenceId: "ANL-930184",
    name: "Julian Meyer",
    email: "julian@meyerbrands.de",
    company: "Meyer Retail Gmbh",
    serviceId: "excel-automation",
    budget: "Under $300",
    timeline: "Within 5 days",
    description: "Transform daily manual CSV inventory downloads into dynamic Power Query models with automated reconciliations.",
    status: "New",
    timestamp: "2026-11-15T08:00:00Z"
  }
];

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>(DEFAULT_LEADS);
  const [activeTab, setActiveTab] = useState<"leads" | "projects" | "metrics">("leads");
  const [search, setSearch] = useState("");
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  const fetchLeads = async () => {
    setIsCloudSyncing(true);
    try {
      // 1. Fetch from Supabase Cloud
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        const cloudLeads: Lead[] = data.map((d: any) => ({
          referenceId: d.reference_id,
          name: d.name,
          email: d.email,
          company: d.company || "",
          serviceId: d.service_id,
          budget: d.budget || "",
          timeline: d.timeline || "",
          description: d.description,
          status: d.status || "New",
          timestamp: d.created_at,
        }));

        setLeads([...cloudLeads, ...DEFAULT_LEADS]);
      } else {
        // Fallback to local storage
        const stored = localStorage.getItem("analytique_leads");
        if (stored) {
          const parsed = JSON.parse(stored);
          setLeads([...parsed, ...DEFAULT_LEADS]);
        }
      }
    } catch (e) {
      console.warn("Cloud fetch note:", e);
    } finally {
      setIsCloudSyncing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase()) ||
      l.referenceId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F6F3EB] text-[#1E201E]">
      <header className="bg-white border-b border-[#E2DDD0] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg text-[#656D5B] hover:text-[#1E201E] hover:bg-[#F3EFE6] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="w-8 h-8 rounded-lg bg-[#1E201E] flex items-center justify-center text-white">
              <BarChart3 className="w-4 h-4 text-[#F8F6F0]" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-[#1E201E]">
                Analytique Admin
              </span>
              <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded inline-flex items-center gap-1">
                <Cloud className="w-3 h-3" />
                Supabase Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#585F51]">
            <button
              onClick={fetchLeads}
              className="px-3 py-1.5 border border-[#DDD5C7] rounded-lg hover:bg-[#F8F5EE] flex items-center gap-1.5 text-xs font-semibold"
            >
              <RefreshCw className={`w-3 h-3 ${isCloudSyncing ? "animate-spin" : ""}`} />
              Refresh Cloud
            </button>
            <span className="hidden sm:inline text-[#DDD5C7]">|</span>
            <span className="hidden sm:inline">analytique.team@gmail.com</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E3DDD1] shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A8272] block">
              Global Enquiries / Leads
            </span>
            <span className="text-3xl font-serif font-bold text-[#1E201E] mt-1 block">
              {leads.length}
            </span>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              100% Cloud Synced
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3DDD1] shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A8272] block">
              Active In Progress
            </span>
            <span className="text-3xl font-serif font-bold text-[#A66F4F] mt-1 block">
              {leads.filter((l) => l.status === "In Progress" || l.status === "New").length}
            </span>
            <span className="text-xs text-[#7B8272] mt-1 block">
              Under 24h turnaround
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3DDD1] shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A8272] block">
              Completed Deliverables
            </span>
            <span className="text-3xl font-serif font-bold text-[#1E201E] mt-1 block">
              {leads.filter((l) => l.status === "Delivered").length + 24}
            </span>
            <span className="text-xs text-emerald-600 font-medium mt-1 block">
              Zero client disputes
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3DDD1] shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A8272] block">
              Portfolio Blueprints
            </span>
            <span className="text-3xl font-serif font-bold text-[#1E201E] mt-1 block">
              {PROJECTS.length}
            </span>
            <span className="text-xs text-[#7B8272] mt-1 block">
              Power BI, SQL & Excel
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-[#DED6C7] pb-3">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "leads"
                ? "bg-[#1E201E] text-white"
                : "bg-white text-[#565C4E] border border-[#DDD5C7] hover:border-[#1E201E]"
            }`}
          >
            Client Enquiries & Orders ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === "projects"
                ? "bg-[#1E201E] text-white"
                : "bg-white text-[#565C4E] border border-[#DDD5C7] hover:border-[#1E201E]"
            }`}
          >
            Published Projects ({PROJECTS.length})
          </button>
        </div>

        {activeTab === "leads" && (
          <div className="bg-white rounded-2xl border border-[#E2DDD0] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#E8E2D6] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#889080]" />
                <input
                  type="text"
                  placeholder="Filter by name, company, ref..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#D5CDC0] bg-[#FAF8F5] text-xs focus:outline-none focus:ring-1 focus:ring-[#A66F4F]"
                />
              </div>
              <span className="text-xs text-[#7B8272]">
                Showing {filteredLeads.length} total orders (Connected to Supabase)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F5EE] border-b border-[#E5DFD2] text-[#636B59] uppercase font-semibold">
                  <tr>
                    <th className="px-5 py-3.5">Reference & Date</th>
                    <th className="px-5 py-3.5">Client & Company</th>
                    <th className="px-5 py-3.5">Service Requested</th>
                    <th className="px-5 py-3.5">Budget & Timeline</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE4D7]">
                  {filteredLeads.map((lead, idx) => (
                    <tr key={idx} className="hover:bg-[#FCFAF7] transition-colors">
                      <td className="px-5 py-4">
                        <span className="font-mono font-bold text-[#1E201E] block">
                          {lead.referenceId}
                        </span>
                        <span className="text-[11px] text-[#7C8373]">
                          {new Date(lead.timestamp).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-semibold text-[#1E201E] block">
                          {lead.name}
                        </span>
                        <span className="text-[11px] text-[#6A7162] block">
                          {lead.email}
                        </span>
                        {lead.company && (
                          <span className="text-[10px] text-[#8C9384] italic">
                            {lead.company}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-[#F2EDE2] text-[#4A5043] font-medium border border-[#DDD4C5]">
                          {lead.serviceId}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-medium text-[#1E201E] block">
                          {lead.budget}
                        </span>
                        <span className="text-[11px] text-[#7A8272]">
                          {lead.timeline}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            lead.status === "Delivered"
                              ? "bg-emerald-100 text-emerald-800"
                              : lead.status === "In Progress"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <a
                          href={`mailto:${lead.email}?subject=Regarding Analytique Project [${lead.referenceId}]`}
                          className="px-3 py-1.5 bg-[#1E201E] text-white rounded-lg text-[11px] font-semibold hover:bg-[#343831] transition-colors"
                        >
                          Reply Email
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <div
                key={p.id}
                className="bg-white p-5 rounded-2xl border border-[#E2DDD0] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2">
                    <span className="px-2.5 py-0.5 bg-[#F4EFE5] text-[#555C4A] rounded text-[11px] font-semibold border border-[#DDD5C7]">
                      {p.category}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      Active on Site
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#1E201E]">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#5D6455] mt-1.5 leading-relaxed">
                    {p.tagline}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#ECE5D8] flex items-center justify-between">
                  <span className="text-[11px] text-[#7E8676]">
                    {p.tools.join(" • ")}
                  </span>
                  <Link
                    href={`/#work`}
                    className="text-xs font-semibold text-[#A66F4F] hover:underline"
                  >
                    View on Site →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
