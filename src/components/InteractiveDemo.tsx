"use client";

import React, { useState, useMemo } from "react";
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

type RegionKey = "All" | "East" | "West" | "North" | "South";

interface RegionalData {
  runRate: string;
  yoyGrowth: string;
  fulfilledOrders: string;
  ordersTarget: string;
  avgOrderValue: string;
  marginIndex: string;
  monthly: { month: string; revenue: number; orders: number }[];
  categories: { name: string; value: number; color: string }[];
}

const REGION_DATA_MAP: Record<RegionKey, RegionalData> = {
  All: {
    runRate: "$786,000",
    yoyGrowth: "+14.2% YoY Growth",
    fulfilledOrders: "1,720",
    ordersTarget: "+8.6% vs Target",
    avgOrderValue: "$456.90",
    marginIndex: "57.95%",
    monthly: [
      { month: "Jan", revenue: 59000, orders: 120 },
      { month: "Feb", revenue: 64000, orders: 135 },
      { month: "Mar", revenue: 68000, orders: 142 },
      { month: "Apr", revenue: 67000, orders: 138 },
      { month: "May", revenue: 59000, orders: 118 },
      { month: "Jun", revenue: 66000, orders: 144 },
      { month: "Jul", revenue: 71000, orders: 156 },
      { month: "Aug", revenue: 69000, orders: 150 },
      { month: "Sep", revenue: 68000, orders: 149 },
      { month: "Oct", revenue: 66000, orders: 142 },
      { month: "Nov", revenue: 66000, orders: 145 },
      { month: "Dec", revenue: 78000, orders: 172 },
    ],
    categories: [
      { name: "Electronics & Laptops", value: 58, color: "#1E201E" },
      { name: "Smart Devices", value: 32, color: "#A66F4F" },
      { name: "Peripherals & Audio", value: 10, color: "#78806B" },
    ],
  },
  East: {
    runRate: "$214,000",
    yoyGrowth: "+18.4% Regional Top",
    fulfilledOrders: "468",
    ordersTarget: "+12.1% vs Target",
    avgOrderValue: "$457.26",
    marginIndex: "61.20%",
    monthly: [
      { month: "Jan", revenue: 16000, orders: 35 },
      { month: "Feb", revenue: 17500, orders: 38 },
      { month: "Mar", revenue: 19000, orders: 41 },
      { month: "Apr", revenue: 18200, orders: 39 },
      { month: "May", revenue: 16500, orders: 36 },
      { month: "Jun", revenue: 18000, orders: 39 },
      { month: "Jul", revenue: 19800, orders: 43 },
      { month: "Aug", revenue: 19200, orders: 42 },
      { month: "Sep", revenue: 18900, orders: 41 },
      { month: "Oct", revenue: 18500, orders: 40 },
      { month: "Nov", revenue: 19100, orders: 42 },
      { month: "Dec", revenue: 22800, orders: 50 },
    ],
    categories: [
      { name: "Electronics & Laptops", value: 64, color: "#1E201E" },
      { name: "Smart Devices", value: 26, color: "#A66F4F" },
      { name: "Peripherals & Audio", value: 10, color: "#78806B" },
    ],
  },
  West: {
    runRate: "$198,500",
    yoyGrowth: "+13.1% Consistent",
    fulfilledOrders: "432",
    ordersTarget: "+7.4% vs Target",
    avgOrderValue: "$459.49",
    marginIndex: "58.40%",
    monthly: [
      { month: "Jan", revenue: 15000, orders: 32 },
      { month: "Feb", revenue: 16200, orders: 35 },
      { month: "Mar", revenue: 17100, orders: 37 },
      { month: "Apr", revenue: 16800, orders: 36 },
      { month: "May", revenue: 14800, orders: 31 },
      { month: "Jun", revenue: 16500, orders: 36 },
      { month: "Jul", revenue: 17900, orders: 39 },
      { month: "Aug", revenue: 17400, orders: 38 },
      { month: "Sep", revenue: 17200, orders: 37 },
      { month: "Oct", revenue: 16700, orders: 36 },
      { month: "Nov", revenue: 16900, orders: 37 },
      { month: "Dec", revenue: 19500, orders: 43 },
    ],
    categories: [
      { name: "Electronics & Laptops", value: 55, color: "#1E201E" },
      { name: "Smart Devices", value: 35, color: "#A66F4F" },
      { name: "Peripherals & Audio", value: 10, color: "#78806B" },
    ],
  },
  North: {
    runRate: "$192,000",
    yoyGrowth: "+11.8% Expansion",
    fulfilledOrders: "420",
    ordersTarget: "+6.5% vs Target",
    avgOrderValue: "$457.14",
    marginIndex: "55.80%",
    monthly: [
      { month: "Jan", revenue: 14200, orders: 31 },
      { month: "Feb", revenue: 15500, orders: 34 },
      { month: "Mar", revenue: 16600, orders: 36 },
      { month: "Apr", revenue: 16400, orders: 35 },
      { month: "May", revenue: 14200, orders: 30 },
      { month: "Jun", revenue: 16100, orders: 35 },
      { month: "Jul", revenue: 17200, orders: 37 },
      { month: "Aug", revenue: 16800, orders: 36 },
      { month: "Sep", revenue: 16500, orders: 36 },
      { month: "Oct", revenue: 16000, orders: 35 },
      { month: "Nov", revenue: 15800, orders: 34 },
      { month: "Dec", revenue: 18900, orders: 41 },
    ],
    categories: [
      { name: "Electronics & Laptops", value: 52, color: "#1E201E" },
      { name: "Smart Devices", value: 36, color: "#A66F4F" },
      { name: "Peripherals & Audio", value: 12, color: "#78806B" },
    ],
  },
  South: {
    runRate: "$181,500",
    yoyGrowth: "+9.5% Steady Demand",
    fulfilledOrders: "400",
    ordersTarget: "+5.2% vs Target",
    avgOrderValue: "$453.75",
    marginIndex: "54.10%",
    monthly: [
      { month: "Jan", revenue: 13800, orders: 22 },
      { month: "Feb", revenue: 14800, orders: 28 },
      { month: "Mar", revenue: 15300, orders: 28 },
      { month: "Apr", revenue: 15600, orders: 28 },
      { month: "May", revenue: 13500, orders: 21 },
      { month: "Jun", revenue: 15400, orders: 34 },
      { month: "Jul", revenue: 16100, orders: 37 },
      { month: "Aug", revenue: 15600, orders: 34 },
      { month: "Sep", revenue: 15400, orders: 35 },
      { month: "Oct", revenue: 14800, orders: 31 },
      { month: "Nov", revenue: 14200, orders: 32 },
      { month: "Dec", revenue: 16800, orders: 38 },
    ],
    categories: [
      { name: "Electronics & Laptops", value: 48, color: "#1E201E" },
      { name: "Smart Devices", value: 39, color: "#A66F4F" },
      { name: "Peripherals & Audio", value: 13, color: "#78806B" },
    ],
  },
};

export function InteractiveDemo() {
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>("All");
  const [selectedMetric, setSelectedMetric] = useState<"revenue" | "orders">("revenue");

  // Dynamically compute current metrics based on selected region
  const currentData = useMemo(() => {
    return REGION_DATA_MAP[selectedRegion] || REGION_DATA_MAP.All;
  }, [selectedRegion]);

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
            {(["All", "East", "West", "North", "South"] as RegionKey[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRegion(r)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedRegion === r
                    ? "bg-[#A66F4F] text-white shadow-md scale-105"
                    : "text-[#8F9489] hover:text-white hover:bg-[#252823]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="bg-[#141614] p-1 rounded-xl border border-[#343831] flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setSelectedMetric("revenue")}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                selectedMetric === "revenue"
                  ? "bg-[#323730] text-white shadow-sm"
                  : "text-[#7F8678] hover:text-white"
              }`}
            >
              Revenue ($)
            </button>
            <button
              type="button"
              onClick={() => setSelectedMetric("orders")}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                selectedMetric === "orders"
                  ? "bg-[#323730] text-white shadow-sm"
                  : "text-[#7F8678] hover:text-white"
              }`}
            >
              Orders (Qty)
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip - Dynamically updating */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6">
        <div className="bg-[#242723] p-4 rounded-xl border border-[#343930] transition-all">
          <span className="text-[11px] font-medium text-[#8F9688] uppercase tracking-wider block">
            {selectedRegion === "All" ? "Annual Run-Rate" : `${selectedRegion} Region Run-Rate`}
          </span>
          <span className="text-2xl font-bold text-white mt-1 block">
            {currentData.runRate}
          </span>
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            {currentData.yoyGrowth}
          </span>
        </div>

        <div className="bg-[#242723] p-4 rounded-xl border border-[#343930] transition-all">
          <span className="text-[11px] font-medium text-[#8F9688] uppercase tracking-wider block">
            Fulfilled Orders
          </span>
          <span className="text-2xl font-bold text-white mt-1 block">
            {currentData.fulfilledOrders}
          </span>
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            {currentData.ordersTarget}
          </span>
        </div>

        <div className="bg-[#242723] p-4 rounded-xl border border-[#343930] transition-all">
          <span className="text-[11px] font-medium text-[#8F9688] uppercase tracking-wider block">
            Avg Order Value
          </span>
          <span className="text-2xl font-bold text-white mt-1 block">
            {currentData.avgOrderValue}
          </span>
          <span className="text-xs text-[#A66F4F] font-medium block mt-1">
            Top tier: High Margin
          </span>
        </div>

        <div className="bg-[#242723] p-4 rounded-xl border border-[#343930] transition-all">
          <span className="text-[11px] font-medium text-[#8F9688] uppercase tracking-wider block">
            Gross Margin Index
          </span>
          <span className="text-2xl font-bold text-white mt-1 block">
            {currentData.marginIndex}
          </span>
          <span className="text-xs text-emerald-400 font-medium block mt-1">
            Optimal allocation
          </span>
        </div>
      </div>

      {/* Main Charts Row - Dynamically reacting to selectedRegion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Trend Area Chart (Span 2) */}
        <div className="lg:col-span-2 bg-[#242723] p-5 rounded-2xl border border-[#343930]">
          <div className="flex items-center justify-between pb-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D5CDBC]">
              {selectedRegion === "All" ? "Global" : `${selectedRegion} Region`} {selectedMetric === "revenue" ? "Monthly Revenue ($)" : "Monthly Orders (Qty)"}
            </h4>
            <span className="text-[11px] text-[#A66F4F] font-semibold">
              Filter Active: {selectedRegion}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData.monthly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDynamicRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A66F4F" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#A66F4F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#363A32" />
                <XAxis dataKey="month" stroke="#7E8578" fontSize={11} tickLine={false} />
                <YAxis stroke="#7E8578" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [
                    selectedMetric === "revenue" ? `$${Number(val).toLocaleString()}` : `${val} Orders`,
                    selectedMetric === "revenue" ? "Revenue" : "Orders"
                  ]}
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
                  fill="url(#colorDynamicRev)"
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Mix Pie Chart */}
        <div className="bg-[#242723] p-5 rounded-2xl border border-[#343930] flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D5CDBC] pb-1">
              {selectedRegion} Category Mix
            </h4>
            <p className="text-[11px] text-[#808876]">
              Share of high-margin product inventory
            </p>
          </div>

          <div className="h-44 w-full flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                  isAnimationActive={true}
                >
                  {currentData.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#242723" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value}%`, "Mix Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#31362D]">
            {currentData.categories.map((item, idx) => (
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
