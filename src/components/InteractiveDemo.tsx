"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Filter,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const MONTHLY_SALES = [
  { month: "Jan", revenue: 59000, orders: 120, target: 50000 },
  { month: "Feb", revenue: 64000, orders: 135, target: 55000 },
  { month: "Mar", revenue: 68000, orders: 142, target: 60000 },
  { month: "Apr", revenue: 67000, orders: 138, target: 62000 },
  { month: "May", revenue: 59000, orders: 118, target: 63000 },
  { month: "Jun", revenue: 66000, orders: 144, target: 65000 },
  { month: "Jul", revenue: 71000, orders: 156, target: 67000 },
  { month: "Aug", revenue: 69000, orders: 150, target: 68000 },
  { month: "Sep", revenue: 68000, orders: 149, target: 68000 },
  { month: "Oct", revenue: 66000, orders: 142, target: 69000 },
  { month: "Nov", revenue: 66000, orders: 145, target: 70000 },
  { month: "Dec", revenue: 78000, orders: 172, target: 72000 },
];

const REGIONAL_PERFORMANCE = [
  { region: "East", sales: 189000, margin: "24.5%" },
  { region: "West", sales: 185000, margin: "22.8%" },
  { region: "North", sales: 183000, margin: "21.4%" },
  { region: "South", sales: 179000, margin: "19.8%" },
];

const PRODUCT_DISTRIBUTION = [
  { name: "Electronics & Laptops", value: 58, color: "#1E201E" },
  { name: "Smart Devices", value: 32, color: "#A66F4F" },
  { name: "Peripherals & Audio", value: 10, color: "#78806B" },
];

export function InteractiveDemo() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedMetric, setSelectedMetric] = useState<"revenue" | "orders">("revenue");

  return (
    <div className="rounded-3xl bg-[#1E201E] text-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-[#343831] relative overflow-hidden">
      {/* Decorative gradient aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A66F4F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#30332D]">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#2A2E28] text-[#D8CEBE] border border-[#3D4238]">
              <Sparkles className="w-3 h-3 text-[#A66F4F]" />
              Real-Time Analytics Simulator
            </span>
            <span className="text-xs text-[#8F9489]">
              Live DAX Engine & Aggregations
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold tracking-tight text-white mt-2">
            Commercial Performance Intelligence
          </h3>
          <p className="text-xs text-[#A2A89C] mt-1">
            Simulated Power BI executive layer tracking revenue cadence and regional conversion.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-[#141614] p-1 rounded-xl border border-[#343831] flex items-center gap-1 text-xs">
            <span className="px-2 text-[#7F8678] font-medium flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Region:
            </span>
            {["All", "East", "West", "North", "South"].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedRegion === r
                    ? "bg-[#A66F4F] text-white shadow-sm"
                    : "text-[#8F9489] hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="bg-[#141614] p-1 rounded-xl border border-[#343831] flex items-center gap-1 text-xs">
            <button
              onClick={() => setSelectedMetric("revenue")}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedMetric === "revenue"
                  ? "bg-[#323730] text-white"
                  : "text-[#7F8678] hover:text-white"
              }`}
            >
              Revenue ($)
            </button>
            <button
              onClick={() => setSelectedMetric("orders")}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedMetric === "orders"
                  ? "bg-[#323730] text-white"
                  : "text-[#7F8678] hover:text-white"
              }`}
            >
              Orders (Qty)
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6">
        <div className="bg-[#242723] p-4 rounded-xl border border-[#343930]">
          <span className="text-[11px] font-medium text-[#8F9688] uppercase tracking-wider block">
            Annual Run-Rate
          </span>
          <span className="text-2xl font-bold text-white mt-1 block">
            $786,000
          </span>
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            +14.2% YoY Growth
          </span>
        </div>

        <div className="bg-[#242723] p-4 rounded-xl border border-[#343930]">
          <span className="text-[11px] font-medium text-[#8F9688] uppercase tracking-wider block">
            Fulfilled Orders
          </span>
          <span className="text-2xl font-bold text-white mt-1 block">
            1,720
          </span>
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            +8.6% vs Target
          </span>
        </div>

        <div className="bg-[#242723] p-4 rounded-xl border border-[#343930]">
          <span className="text-[11px] font-medium text-[#8F9688] uppercase tracking-wider block">
            Avg Order Value
          </span>
          <span className="text-2xl font-bold text-white mt-1 block">
            $456.90
          </span>
          <span className="text-xs text-[#A66F4F] font-medium block mt-1">
            Top tier: High Margin
          </span>
        </div>

        <div className="bg-[#242723] p-4 rounded-xl border border-[#343930]">
          <span className="text-[11px] font-medium text-[#8F9688] uppercase tracking-wider block">
            Gross Margin Index
          </span>
          <span className="text-2xl font-bold text-white mt-1 block">
            57.95%
          </span>
          <span className="text-xs text-emerald-400 font-medium block mt-1">
            Optimal allocation
          </span>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Trend Area Chart (Span 2) */}
        <div className="lg:col-span-2 bg-[#242723] p-5 rounded-2xl border border-[#343930]">
          <div className="flex items-center justify-between pb-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D5CDBC]">
              Monthly {selectedMetric === "revenue" ? "Revenue Momentum" : "Order Velocity"}
            </h4>
            <span className="text-[11px] text-[#7F8678]">
              Target benchmarked
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_SALES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A66F4F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#A66F4F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#363A32" />
                <XAxis dataKey="month" stroke="#7E8578" fontSize={11} tickLine={false} />
                <YAxis stroke="#7E8578" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#161816",
                    borderColor: "#3A3E36",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#FFF"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#A66F4F"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Mix Pie Chart */}
        <div className="bg-[#242723] p-5 rounded-2xl border border-[#343930] flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D5CDBC] pb-2">
              Revenue By Category Mix
            </h4>
            <p className="text-[11px] text-[#808876]">
              Share of high-margin product inventory
            </p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PRODUCT_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {PRODUCT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#242723" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#31362D]">
            {PRODUCT_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#C8CEBF]">{item.name}</span>
                </div>
                <span className="font-semibold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

