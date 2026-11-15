"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, Sparkles, Bot, ArrowRight } from "lucide-react";

const KNOWLEDGE_BASE = [
  {
    keywords: ["power bi", "dashboard", "dax", "report"],
    answer: "Analytique specializes in production-grade Power BI dashboards: custom star-schema models, advanced DAX measures, automated refreshes, and boardroom-level visual storytelling. Typical delivery is 5 to 10 days."
  },
  {
    keywords: ["excel", "vba", "macro", "pivot", "automation"],
    answer: "We replace manual, error-prone spreadsheets with high-speed automated Power Query pipelines, dynamic PivotTables, and error-proof lookup formulas. Saves teams 10–15 hours every week."
  },
  {
    keywords: ["sql", "database", "query", "postgres", "mysql"],
    answer: "Syed writes and optimizes advanced SQL: multi-table joins, CTEs, window functions, and indexing strategies to reduce query latency and isolate high-value business segments."
  },
  {
    keywords: ["price", "cost", "quote", "rate", "fee"],
    answer: "Pricing is transparent and scope-based. Small automations typically start at under $300, complete Power BI dashboards range from $300 to $700, and full data pipelines are $700–$1,500+. Click 'Request a Quote' for a personalized proposal."
  },
  {
    keywords: ["who", "syed", "founder", "team", "bata"],
    answer: "Analytique is led by Syed Shahriar Ahmed, Data Operations Officer at Bata Shoe Company Bangladesh. He holds a B.Sc. in Computer Science with a 3.56 CGPA and 100% assessment scores in data modeling, DAX, and SQL."
  },
  {
    keywords: ["meeting", "call", "schedule", "talk", "book"],
    answer: "You can book a free 20-minute discovery call directly on the site! Use the 'Book Discovery Call' button at the top or in the menu."
  }
];

export function ChatbotAssistant({ onOpenQuote }: { onOpenQuote: () => void }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([
    {
      sender: "bot",
      text: "Hello! I am the Analytique Assistant. How can I help you today? Ask me about Power BI, Excel automation, pricing, or our client process."
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const updated = [...messages, { sender: "user" as const, text: userText }];
    setMessages(updated);
    setInput("");

    // Look up answer from knowledge base
    const lower = userText.toLowerCase();
    let reply = "Thank you for asking! For specific project timelines or confidential data reviews, Syed offers free discovery calls or direct quotes.";
    
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => lower.includes(kw))) {
        reply = item.answer;
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-3 bg-[#1E201E] hover:bg-[#323630] text-white rounded-full shadow-2xl flex items-center gap-2.5 transition-all group border border-[#3E423B]"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <MessageSquare className="w-4 h-4 text-[#A66F4F]" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Ask Analytique
          </span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-white border border-[#DDD5C7] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#1E201E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2A2E28] flex items-center justify-center border border-[#3A4035]">
                <Bot className="w-4 h-4 text-[#A66F4F]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Analytique Assistant
                </h4>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online • Grounded on Services
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-[#31362E] text-[#B0B6AA]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat history */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 bg-[#FAF8F5] text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-xl leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#1E201E] text-white rounded-br-xs"
                      : "bg-white border border-[#E4DDD0] text-[#343831] rounded-bl-xs shadow-xs"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Suggestions */}
          <div className="p-2 bg-white border-t border-[#ECE6D9] flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => {
                setMessages((prev) => [
                  ...prev,
                  { sender: "user", text: "How much does a Power BI dashboard cost?" },
                  { sender: "bot", text: KNOWLEDGE_BASE[3].answer }
                ]);
              }}
              className="px-2 py-1 bg-[#F5F2EB] hover:bg-[#EAE4D7] text-[#42473D] rounded whitespace-nowrap"
            >
              Pricing info
            </button>
            <button
              onClick={() => {
                setMessages((prev) => [
                  ...prev,
                  { sender: "user", text: "Tell me about Syed's experience" },
                  { sender: "bot", text: KNOWLEDGE_BASE[4].answer }
                ]);
              }}
              className="px-2 py-1 bg-[#F5F2EB] hover:bg-[#EAE4D7] text-[#42473D] rounded whitespace-nowrap"
            >
              Syed's background
            </button>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#ECE6D9] flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about our work..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#F6F4EE] border border-[#DDD5C7] rounded-xl text-xs text-[#1E201E] focus:outline-none focus:ring-1 focus:ring-[#A66F4F]"
            />
            <button
              type="submit"
              className="p-2 bg-[#1E201E] hover:bg-[#343831] text-white rounded-xl transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

