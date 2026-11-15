export interface Project {
  id: string;
  title: string;
  category: "Power BI" | "Excel" | "SQL" | "Python" | "Business Analytics";
  tagline: string;
  problem: string;
  datasetContext: string;
  approach: string[];
  tools: string[];
  image: string;
  metrics: { label: string; value: string }[];
  githubUrl?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "weather-intelligence",
    title: "Real-Time Weather Intelligence Platform",
    category: "Power BI",
    tagline: "Live WeatherAPI pipeline with DAX-driven Air Quality Index (AQI) tracking across major regional hubs.",
    problem: "Operational and logistics teams require real-time ambient and air quality data to anticipate delivery delays and protect supply chain labor during extreme conditions.",
    datasetContext: "Integrated live REST API data from WeatherAPI transformed and parsed via automated Power Query JSON connectors.",
    approach: [
      "Engineered automated API endpoint ingestion inside Power Query with robust schema normalization.",
      "Developed custom DAX measures for dynamic multi-city temperature, humidity, and AQI severity indexes.",
      "Crafted an executive dark-mode UI with radial gauges, trend lines, and forecast cards."
    ],
    tools: ["Power BI", "Power Query", "DAX", "REST API", "JSON ETL"],
    image: "/images/projects/weather-intelligence.jpg",
    metrics: [
      { label: "Data Freshness", value: "Real-Time" },
      { label: "Regional Hubs", value: "Multi-City" },
      { label: "Index Precision", value: "99.4%" }
    ],
    githubUrl: "https://github.com/syedshahriarahmed0",
    featured: true
  },
  {
    id: "hr-attrition-intelligence",
    title: "HR Analytics & Employee Attrition Model",
    category: "Python",
    tagline: "Comprehensive workforce attrition diagnostic leveraging Python pre-processing and Power BI DAX modeling.",
    problem: "Rising turnover across technical and research roles required identifying underlying compensation, tenure, and department retention drivers.",
    datasetContext: "1,470 employee records analyzed after deep cleaning and feature engineering in Python (Pandas).",
    approach: [
      "Processed raw records in Python: managed nulls, engineered categorical tenure groups, and prepped feature matrix.",
      "Identified critical 16.12% department-level termination rate and surfaced work-life balance correlations.",
      "Engineered DAX measures for Average Monthly Rate cross-referenced by tenure and compensation tier."
    ],
    tools: ["Python", "Pandas", "Power BI", "DAX", "Data Modeling"],
    image: "/images/projects/hr-analytics.jpg",
    metrics: [
      { label: "Analyzed Records", value: "1,470" },
      { label: "Attrition Rate", value: "16.12%" },
      { label: "Avg Salary Analyzed", value: "$6.3K/mo" }
    ],
    githubUrl: "https://github.com/syedshahriarahmed0",
    featured: false
  },
  {
    id: "sales-performance-2026",
    title: "Enterprise Sales & Revenue Performance Engine",
    category: "Power BI",
    tagline: "Dynamic regional sales tracking, quarterly summaries, and high-value product segmentation.",
    problem: "Lack of consolidated executive visibility across sales regions (North, South, East, West) led to reactive stocking and missed quarterly targets.",
    datasetContext: "Transactional multi-category sales database featuring regional breakdowns, unit economics, and quarterly sales status tiers.",
    approach: [
      "Constructed a multi-dimensional star schema linking regional sales, product lines, and order calendars.",
      "Created dynamic visual drill-downs for high-margin products and monthly trend variance.",
      "Implemented sales status tiering (High/Mid/Low) to isolate revenue opportunities instantly."
    ],
    tools: ["Power BI", "Data Modeling", "DAX", "Business Intelligence"],
    image: "/images/projects/sales-performance-2026.jpg",
    metrics: [
      { label: "Total Revenue Tracked", value: "$7.0M" },
      { label: "Avg Order Value", value: "$10.79K" },
      { label: "High-Margin Share", value: "57.95%" }
    ],
    githubUrl: "https://github.com/syedshahriarahmed0",
    featured: true
  },
  {
    id: "executive-excel-suite",
    title: "Executive Sales Performance & Business Dashboard",
    category: "Excel",
    tagline: "High-speed Excel automation model with dynamic PivotTables, calculated fields, and interactive slicers.",
    problem: "Operational leadership was spending 10+ hours weekly stitching transactional exports by hand to evaluate regional order fulfillment.",
    datasetContext: "Transactional retail distribution dataset structured across hardware products, quarters, and regional sales hubs.",
    approach: [
      "Cleaned and normalized messy CSV transactions using Excel Power Query and robust XLOOKUP logic.",
      "Engineered automated dynamic PivotTable models with custom calculated fields.",
      "Built an intuitive executive layout with interconnected slicers and timeline selectors for zero-lag filtering."
    ],
    tools: ["Advanced Excel", "Power Query", "PivotTables", "Data Modeling"],
    image: "/images/projects/executive-sales-excel.png",
    metrics: [
      { label: "Weekly Hours Saved", value: "10+ Hrs" },
      { label: "Max Order Value", value: "$12,000" },
      { label: "Reporting Speed", value: "< 2 Sec" }
    ],
    githubUrl: "https://github.com/syedshahriarahmed0",
    featured: false
  },
  {
    id: "sql-relational-analytics",
    title: "Multi-Table SQL Analytics & Performance Optimization",
    category: "SQL",
    tagline: "Relational database querying, recursive CTEs, and execution plan optimization on PostgreSQL/MySQL.",
    problem: "Inefficient subqueries on multi-table schemas caused high database latency and blocked real-time customer segmentation.",
    datasetContext: "Normalized 11-table schema covering customer behavior, regional invoices, product catalogs, and transactional order histories.",
    approach: [
      "Constructed multi-table JOINs, subqueries, and window functions (ROW_NUMBER() OVER(PARTITION BY...)).",
      "Refactored nested subqueries into direct indexed filtering, eliminating redundant full table scans.",
      "Audited customer spend tiers and isolated regional high-value purchasers for targeted marketing."
    ],
    tools: ["PostgreSQL", "MySQL", "Window Functions", "Query Optimization"],
    image: "/images/projects/sales-performance-2026.jpg",
    metrics: [
      { label: "Relational Tables", value: "11 Tables" },
      { label: "Subquery Latency", value: "Optimized" },
      { label: "Top Customer Segment", value: "Top 5 Isol." }
    ],
    githubUrl: "https://github.com/syedshahriarahmed0",
    featured: false
  }
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  review: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Marcus Vance",
    role: "Chief Operating Officer",
    company: "Vance Logistics Group",
    country: "United Kingdom",
    review: "Syed turned weeks of chaotic Excel spreadsheets into an automated Power BI dashboard that our board reviews daily. His background in supply chain operations clearly shines through.",
    rating: 5
  },
  {
    id: "2",
    name: "Elena Rostova",
    role: "Head of Commercial Finance",
    company: "Nordic Consumer Goods",
    country: "Sweden",
    review: "The speed and rigor Analytique brought to our reporting cadence was exceptional. Complex DAX measures and clean UI let our sales leads spot regional margin dips immediately.",
    rating: 5
  },
  {
    id: "3",
    name: "David H. Sterling",
    role: "Managing Director",
    company: "Sterling & Bay Retail",
    country: "Canada",
    review: "Outstanding work on our retail inventory and sales models. He not only cleaned our messy legacy data but engineered an automated workflow that saves us over 15 hours every single week.",
    rating: 5
  }
];

export const SERVICES = [
  {
    id: "power-bi",
    title: "Power BI Dashboard Development",
    shortDesc: "Interactive, boardroom-ready dashboards engineered with robust DAX models and automated refreshes.",
    deliverables: ["Star-schema data model", "Custom DAX measures & KPIs", "Executive UI design", "Scheduled refresh setup"],
    turnaround: "5-10 business days"
  },
  {
    id: "excel-automation",
    title: "Excel Reporting & Automation",
    shortDesc: "Transform manual, repetitive spreadsheets into zero-error dynamic systems with Power Query and calculated models.",
    deliverables: ["Automated Power Query ETL", "Dynamic Pivot models & slicers", "Error-proof XLOOKUP formulas", "Executive KPI summary"],
    turnaround: "3-5 business days"
  },
  {
    id: "sql-analysis",
    title: "SQL Querying & Database Analytics",
    shortDesc: "Complex multi-table relational analysis, window functions, and query optimization for PostgreSQL & MySQL.",
    deliverables: ["Audited multi-table joins", "Optimized execution plans", "Cohort & retention queries", "Automated view creation"],
    turnaround: "3-7 business days"
  },
  {
    id: "data-cleaning",
    title: "Data Cleaning & Python Pre-processing",
    shortDesc: "Turn noisy, unstructured datasets into sanitized, high-integrity data assets using Python Pandas.",
    deliverables: ["Missing value imputation", "Outlier & duplicate removal", "Feature engineering", "Audit log & summary stats"],
    turnaround: "2-4 business days"
  },
  {
    id: "sales-analytics",
    title: "Sales & Performance Analytics",
    shortDesc: "Identify revenue drivers, customer lifetime value, and regional variances to guide profitable growth.",
    deliverables: ["Product margin matrix", "Regional sales heatmaps", "Customer tier segmentation", "Quarterly growth forecasts"],
    turnaround: "5-8 business days"
  },
  {
    id: "recurring-bi",
    title: "Weekly / Monthly MIS Reporting",
    shortDesc: "End-to-end management of your ongoing departmental reporting with strict accuracy checks.",
    deliverables: ["Weekly KPI snapshot", "Cross-departmental reconciliation", "Variance commentary", "Automated stakeholder delivery"],
    turnaround: "Ongoing retainer"
  }
];

