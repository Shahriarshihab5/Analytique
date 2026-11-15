import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Analytique | Turning Data Into Decisions — Business Analytics & BI Consultancy",
  description: "Bespoke Power BI dashboards, automated Excel systems, SQL analytics, and data operations that transform complex business numbers into clear, profitable decisions.",
  keywords: ["Data Analytics", "Power BI", "Excel Automation", "Business Intelligence", "SQL Analytics", "Analytique", "Syed Shahriar Ahmed"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-[#F8F6F0] text-[#1E201E] selection:bg-[#A66F4F]/20 selection:text-[#242622]">
        {children}
      </body>
    </html>
  );
}
