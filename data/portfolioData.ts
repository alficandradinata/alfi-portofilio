export interface Project {
  id: string;
  title: string;
  category: "web" | "mobile" | "data" | "system";
  tagline: string;
  description: string;
  longDescription: string;
  year: string;
  featured: boolean;
  tags: string[];
  metrics?: string;
  highlights: string[];
  demoUrl?: string;
  githubUrl?: string;
  colorScheme: {
    accent: string;
    gradient: string;
    badge: string;
  };
  visualType: "orbit" | "code" | "mobile" | "analytics";
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "mobile" | "data" | "tools";
  level: number; // 0 - 100
  icon: string;
  experience: string;
  description: string;
  color: string;
}

export interface TimelineItem {
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
  type: "work" | "education" | "project";
}

export const PERSONAL_INFO = {
  name: "Alfi Candra Dinata",
  nickname: "Alfi",
  handle: "alfi_candra",
  role: "Full-Stack Software Engineer & Builder",
  subRole: "Web Architect • Mobile Dev • Python & Data Explorer",
  location: "Pekanbaru & Medan, Indonesia",
  timezone: "Asia/Jakarta (WIB • UTC+7)",
  email: "alfichandra2003@gmail.com",
  phone: "+62 823-2137-6752",
  status: "Available for Work & Collaborations",
  skripsiStatus: "Final Year Student & Software Engineer",
  bio: "Seorang software engineer dan builder yang berfokus menciptakan website modern berkinerja tinggi, aplikasi mobile responsif, serta sistem berbasis data interaktif. Menggabungkan estetika visual high-tech dengan arsitektur kode yang bersih dan scalable.",
  stats: [
    { label: "Tahun Pengalaman", value: "3+", suffix: "" },
    { label: "Proyek Selesai", value: "15+", suffix: "" },
    { label: "Kepuasan Klien / User", value: "100%", suffix: "" },
    { label: "Code Commits", value: "650+", suffix: "" },
  ],
  socials: {
    github: "https://github.com/alficandradinata",
    linkedin: "https://linkedin.com/in/alficandradinata",
    instagram: "https://www.instagram.com/alficandra_20",
    whatsapp: "https://wa.me/6282321376752?text=Halo%20Alfi,%20saya%20tertarik%20bekerja%20sama%20denganmu!",
    email: "mailto:alfichandra2003@gmail.com",
  },
};

export const PROJECTS: Project[] = [
  {
    id: "sales-inventory",
    title: "Sales & Inventory Tracking System",
    category: "web",
    tagline: "Platform Manajemen Stok & Kasir Cerdas dengan Integrasi Barcode Scanner",
    description: "Sistem inventaris dan penjualan modern dengan pemindaian barcode instan, manajemen multi-outlet, dan analitik laporan laba-rugi realtime.",
    longDescription: "Aplikasi enterprise web-based yang dirancang khusus untuk mempermudah operasional retail dan gudang. Mendukung pencatatan transaksi kasir kilat, pelacakan stok otomatis dengan barcode scanning via camera/hardware scanner, manajemen pemasok, peringatan stok menipis, serta ekspor laporan keuangan otomatis.",
    year: "2026",
    featured: true,
    tags: ["React JS", "Next.js", "Node.js", "MongoDB", "Barcode API", "TailwindCSS"],
    metrics: "+60% Efisiensi Transaksi",
    highlights: [
      "Pemindaian barcode real-time dengan kamera atau scanner USB",
      "Laporan penjualan harian, mingguan, dan bulanan interaktif",
      "Sistem role access (Admin, Kasir, Manager Gudang)",
      "Pencetakan struk otomatis (Thermal Printer Support)"
    ],
    demoUrl: "https://sales-system-preview.demo",
    githubUrl: "https://github.com/alficandradinata/sales-inventory-system",
    colorScheme: {
      accent: "#e13535",
      gradient: "from-red-600 via-rose-500 to-amber-500",
      badge: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    visualType: "orbit",
  },
  {
    id: "pln-doc-mgmt",
    title: "PLN Simpang 3 Document System",
    category: "mobile",
    tagline: "Aplikasi Mobile Manajemen Dokumen & Arsip Operasional PLN",
    description: "Aplikasi mobile React Native untuk pengarsipan digital, verifikasi berkas lapangan, dan tracking approval dokumen instansi PLN.",
    longDescription: "Solusi digitalisasi dokumen untuk kantor PLN Simpang 3 yang menggantikan sistem arsip manual. Petugas lapangan dapat mengambil foto dokumen, memberi watermarking GPS/Waktu otomatis, mengunggah ke cloud storage, serta memantau status persetujuan pimpinan secara real-time.",
    year: "2025",
    featured: true,
    tags: ["React Native", "Expo", "FastAPI", "PostgreSQL", "Cloud Storage", "JWT Auth"],
    metrics: "1,200+ Dokumen Terkelola",
    highlights: [
      "Pemindaian dan kompresi dokumen PDF & gambar otomatis",
      "Pelacakan riwayat dokumen dengan timeline persetujuan digital",
      "Notifikasi push status pengajuan berkas",
      "Mode offline dengan sinkronisasi otomatis saat online"
    ],
    demoUrl: "https://pln-doc-preview.demo",
    githubUrl: "https://github.com/alficandradinata/pln-doc-management",
    colorScheme: {
      accent: "#2f6eea",
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    visualType: "mobile",
  },
  {
    id: "covid-analytics",
    title: "Data Analytics & COVID-19 Insight",
    category: "data",
    tagline: "Dashboard Analisis Tren & Visualisasi Prediksi Data Interaktif",
    description: "Dashboard eksplorasi data komprehensif menggunakan Python, Pandas, dan Streamlit dengan visualisasi spasial interaktif.",
    longDescription: "Platform analitik data epidemiologi dan penjualan yang menyajikan analisis statistik mendalam, peramalan tren menggunakan regresi, pengelompokan wilayah berisiko tinggi (clustering), dan grafik distribusi dinamis.",
    year: "2026",
    featured: true,
    tags: ["Python", "Streamlit", "Pandas", "Plotly", "Scikit-Learn", "Data Viz"],
    metrics: "98% Akurasi Parsing Data",
    highlights: [
      "Visualisasi peta spasial interaktif dengan heatmaps",
      "Filter rentang tanggal, wilayah, dan kategori metrik dinamis",
      "Model peramalan tren sederhana berbasis time-series",
      "Ekspor visualisasi ke format PDF dan PNG resolusi tinggi"
    ],
    demoUrl: "https://data-analytics-preview.demo",
    githubUrl: "https://github.com/alficandradinata/data-exploration-analytics",
    colorScheme: {
      accent: "#00f0ff",
      gradient: "from-cyan-500 via-sky-500 to-indigo-600",
      badge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    },
    visualType: "analytics",
  },
  {
    id: "smart-portfolio",
    title: "Spider-Verse Interactive Portfolio",
    category: "web",
    tagline: "Portofolio Cyberpunk Spider-Verse dengan Interactive Terminal & 3D Web Canvas",
    description: "Portfolio web interaktif dengan tema Spider-Verse, terminal emulator terintegrasi, sound synthesis, dan efek canvas responsif.",
    longDescription: "Didesain dengan perhatian mendalam pada pengalaman pengguna, micro-interactions, responsive design, audio feedback via Web Audio API, serta estetika visual cyberpunk yang memukau.",
    year: "2026",
    featured: false,
    tags: ["Next.js", "React", "TailwindCSS v4", "Canvas API", "Web Audio", "TypeScript"],
    metrics: "100/100 Lighthouse Perf",
    highlights: [
      "Interactive Developer Terminal dengan custom commands",
      "Interactive Spider-Web Particle Canvas background",
      "Multiverse Theme Switcher (Miles, Peter, Gwen, 2099)",
      "Sound effects synth yang dapat dinyalakan/dimatikan"
    ],
    demoUrl: "https://alficandra.dev",
    githubUrl: "https://github.com/alficandradinata/alfi-portofilio",
    colorScheme: {
      accent: "#f59e0b",
      gradient: "from-amber-500 via-rose-500 to-red-600",
      badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    },
    visualType: "code",
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React JS / Next.js", category: "frontend", level: 92, icon: "Code2", experience: "3 tahun", description: "SSR, Server Components, Hooks, State Management & Modern UI Architecture", color: "#61dafb" },
  { name: "TypeScript / JavaScript", category: "frontend", level: 88, icon: "Terminal", experience: "3 tahun", description: "Type safety, ESNext, Asynchronous Programming, clean code principles", color: "#3178c6" },
  { name: "Tailwind CSS & Modern UI", category: "frontend", level: 95, icon: "Palette", experience: "2.5 tahun", description: "Responsive layouts, micro-animations, glassmorphism & design systems", color: "#38bdf8" },
  
  // Mobile
  { name: "React Native / Expo", category: "mobile", level: 85, icon: "Smartphone", experience: "2 tahun", description: "Cross-platform mobile apps for Android & iOS with native hardware APIs", color: "#60a5fa" },

  // Backend & DB
  { name: "Python & FastAPI", category: "backend", level: 86, icon: "Server", experience: "2.5 tahun", description: "RESTful API development, data pipelines, backend services & automation", color: "#3776ab" },
  { name: "MongoDB & PostgreSQL", category: "backend", level: 82, icon: "Database", experience: "2 tahun", description: "Schema design, relational/non-relational queries, indexing, and data modeling", color: "#47a248" },
  
  // Data
  { name: "Pandas & Streamlit", category: "data", level: 80, icon: "BarChart3", experience: "1.5 tahun", description: "Data exploration, cleaning, interactive statistical dashboards & analytics", color: "#ff4b4b" },

  // Tools
  { name: "Git & Version Control", category: "tools", level: 90, icon: "GitBranch", experience: "3 tahun", description: "Git flow, collaborative workflows, CI/CD, and repository management", color: "#f05032" },
  { name: "REST APIs & Architecture", category: "tools", level: 88, icon: "Cpu", experience: "3 tahun", description: "API integration, JWT/OAuth authentication, async processing & scalability", color: "#a855f7" },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2026",
    period: "2025 - Sekarang",
    role: "Full-Stack Software Engineer & Final Year Student",
    company: "Independent / Capstone Project",
    location: "Medan / Pekanbaru, ID",
    description: "Mengerjakan sistem inventaris canggih, penelitian skripsi software engineering, dan mengeksplorasi arsitektur web modern Next.js & Python.",
    achievements: [
      "Mengembangkan Sales & Inventory Tracking System dengan Barcode Integration",
      "Membuat dashboard analitik data berbasis Python & Streamlit",
      "Mempersiapkan rilis portofolio interaktif berstandar industri"
    ],
    skills: ["Next.js", "React", "Python", "MongoDB", "TailwindCSS"],
    type: "work"
  },
  {
    year: "2025",
    period: "2024 - 2025",
    role: "Mobile App Developer (Project Lead)",
    company: "PLN Simpang 3 Project",
    location: "Pekanbaru, ID",
    description: "Merancang dan membangun aplikasi mobile manajemen arsip digital untuk staf operasional PLN Simpang 3.",
    achievements: [
      "Mendigitalkan alur persetujuan dokumen dokumen fisik menjadi terstruktur",
      "Mengintegrasikan fitur kamera cerdas dengan watermark lokasi GPS & waktu",
      "Meningkatkan kecepatan pencarian arsip hingga 70%"
    ],
    skills: ["React Native", "Expo", "FastAPI", "PostgreSQL", "Cloud Storage"],
    type: "work"
  },
  {
    year: "2023",
    period: "2022 - Sekarang",
    role: "Teknik Informatika / Computer Science",
    company: "University Studies",
    location: "Indonesia",
    description: "Fokus pada Rekayasa Perangkat Lunak, Struktur Data & Algoritma, Basis Data, dan Artificial Intelligence / Data Science.",
    achievements: [
      "Partisipan & kontributor project showcase software kampus",
      "Menyelesaikan 10+ studi kasus perangkat lunak skala web & mobile",
      "Aktif mengeksplorasi teknologi open-source terbaru"
    ],
    skills: ["Algorithms", "Data Structures", "OOP", "Software Architecture"],
    type: "education"
  }
];

export const THEMES = [
  {
    id: "loki",
    name: "Loki",
    tag: "Asgardian Green Magic",
    accent: "#4ade80",
    accentGlow: "rgba(74, 222, 128, 0.45)",
    secondary: "#d1fae5",
    class: "theme-loki",
  },
  {
    id: "miles",
    name: "Emerald Echo",
    tag: "Mystic Green / Dark Glass",
    accent: "#4ade80",
    accentGlow: "rgba(74, 222, 128, 0.45)",
    secondary: "#d1fae5",
    class: "theme-miles",
  },
  {
    id: "peter",
    name: "Forest Rune",
    tag: "Ancient Green / Shadow Steel",
    accent: "#22c55e",
    accentGlow: "rgba(34, 197, 94, 0.42)",
    secondary: "#a7f3d0",
    class: "theme-peter",
  },
  {
    id: "gwen",
    name: "Verdant Veil",
    tag: "Emerald Mist / Stone Glow",
    accent: "#86efac",
    accentGlow: "rgba(134, 239, 172, 0.45)",
    secondary: "#dcfce7",
    class: "theme-gwen",
  },
  {
    id: "spidey2099",
    name: "Jade Sigil",
    tag: "Neo Forest / Soft Lime",
    accent: "#bbf7d0",
    accentGlow: "rgba(187, 247, 208, 0.45)",
    secondary: "#ecfccb",
    class: "theme-2099",
  }
];
