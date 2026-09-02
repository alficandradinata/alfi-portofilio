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
  visualType: "orbit" | "code" | "mobile" | "analytics";
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "mobile" | "data" | "tools";
  level: number; // 0 - 100
  icon: string;
  experience: string;
  description: string;
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

/** Label kategori proyek untuk ditampilkan di antarmuka. */
export const CATEGORY_LABELS: Record<Project["category"], string> = {
  web: "Aplikasi Web",
  mobile: "Aplikasi Mobile",
  data: "Data & Analitik",
  system: "Sistem",
};

export const PERSONAL_INFO = {
  name: "Alfi Candra Dinata",
  nickname: "Alfi",
  handle: "alfi_candra",
  role: "Full-Stack Software Engineer",
  subRole: "Pengembangan Web • Aplikasi Mobile • Analitik Data",
  location: "Pekanbaru, Indonesia",
  timezone: "Asia/Jakarta (WIB • UTC+7)",
  email: "alfichandra2003@gmail.com",
  phone: "+62 823-2137-6752",
  status: "Terbuka untuk pekerjaan dan kolaborasi",
  skripsiStatus: "Mahasiswa tingkat akhir & software engineer",
  bio: "Software engineer yang berfokus membangun aplikasi web berkinerja tinggi, aplikasi mobile lintas platform, dan sistem berbasis data. Mengutamakan arsitektur kode yang bersih, terukur, dan mudah dirawat dalam jangka panjang.",
  stats: [
    { label: "Tahun pengalaman", value: "3+", suffix: "" },
    { label: "Proyek diselesaikan", value: "15+", suffix: "" },
    { label: "Bidang keahlian", value: "3", suffix: "" },
    { label: "Kontribusi kode", value: "650+", suffix: "" },
  ],
  socials: {
    github: "https://github.com/alficandradinata",
    linkedin: "https://linkedin.com/in/alficandradinata",
    instagram: "https://www.instagram.com/alficandra_20",
    whatsapp:
      "https://wa.me/6282321376752?text=Halo%20Alfi,%20saya%20tertarik%20bekerja%20sama%20denganmu!",
    email: "mailto:alfichandra2003@gmail.com",
  },
};

export const PROJECTS: Project[] = [
  {
    id: "sales-inventory",
    title: "Sales & Inventory Tracking System",
    category: "web",
    tagline: "Platform manajemen stok dan kasir dengan integrasi barcode scanner",
    description:
      "Sistem inventaris dan penjualan dengan pemindaian barcode, manajemen multi-outlet, serta laporan laba-rugi real-time.",
    longDescription:
      "Aplikasi web untuk operasional retail dan gudang. Mendukung pencatatan transaksi kasir, pelacakan stok otomatis melalui barcode scanning (kamera maupun scanner USB), manajemen pemasok, peringatan stok menipis, serta ekspor laporan keuangan.",
    year: "2026",
    featured: true,
    tags: ["React", "Next.js", "Node.js", "MongoDB", "Barcode API", "Tailwind CSS"],
    metrics: "Efisiensi transaksi +60%",
    highlights: [
      "Pemindaian barcode real-time via kamera atau scanner USB",
      "Laporan penjualan harian, mingguan, dan bulanan",
      "Kontrol akses berbasis peran (admin, kasir, manajer gudang)",
      "Pencetakan struk otomatis dengan dukungan thermal printer",
    ],
    demoUrl: "https://sales-system-preview.demo",
    githubUrl: "https://github.com/alficandradinata/sales-inventory-system",
    visualType: "orbit",
  },
  {
    id: "pln-doc-mgmt",
    title: "PLN Simpang 3 Document System",
    category: "mobile",
    tagline: "Aplikasi mobile untuk manajemen dokumen dan arsip operasional",
    description:
      "Aplikasi React Native untuk pengarsipan digital, verifikasi berkas lapangan, dan pelacakan persetujuan dokumen.",
    longDescription:
      "Solusi digitalisasi dokumen untuk kantor PLN Simpang 3 yang menggantikan sistem arsip manual. Petugas lapangan dapat memindai dokumen, menambahkan watermark lokasi dan waktu secara otomatis, mengunggah ke penyimpanan cloud, serta memantau status persetujuan secara real-time.",
    year: "2025",
    featured: true,
    tags: ["React Native", "Expo", "FastAPI", "PostgreSQL", "Cloud Storage", "JWT"],
    metrics: "1.200+ dokumen terkelola",
    highlights: [
      "Pemindaian dan kompresi dokumen PDF serta gambar",
      "Riwayat dokumen dengan lini masa persetujuan digital",
      "Notifikasi push untuk status pengajuan berkas",
      "Mode offline dengan sinkronisasi otomatis saat kembali online",
    ],
    demoUrl: "https://pln-doc-preview.demo",
    githubUrl: "https://github.com/alficandradinata/pln-doc-management",
    visualType: "mobile",
  },
  {
    id: "covid-analytics",
    title: "Data Analytics & COVID-19 Insight",
    category: "data",
    tagline: "Dasbor analisis tren dan visualisasi data interaktif",
    description:
      "Dasbor eksplorasi data menggunakan Python, Pandas, dan Streamlit dengan visualisasi spasial interaktif.",
    longDescription:
      "Platform analitik yang menyajikan analisis statistik, peramalan tren menggunakan regresi, pengelompokan wilayah berisiko tinggi, serta grafik distribusi dinamis yang dapat difilter secara langsung.",
    year: "2026",
    featured: true,
    tags: ["Python", "Streamlit", "Pandas", "Plotly", "scikit-learn"],
    metrics: "Akurasi parsing data 98%",
    highlights: [
      "Visualisasi peta spasial interaktif dengan heatmap",
      "Filter rentang tanggal, wilayah, dan metrik secara dinamis",
      "Model peramalan tren berbasis time-series",
      "Ekspor visualisasi ke format PDF dan PNG resolusi tinggi",
    ],
    demoUrl: "https://data-analytics-preview.demo",
    githubUrl: "https://github.com/alficandradinata/data-exploration-analytics",
    visualType: "analytics",
  },
  {
    id: "personal-portfolio",
    title: "Portofolio Pribadi",
    category: "web",
    tagline: "Situs profil satu halaman dengan fokus pada keterbacaan dan performa",
    description:
      "Portofolio yang dibangun dengan Next.js App Router, sistem token warna terpusat, dan terminal interaktif untuk menelusuri profil.",
    longDescription:
      "Situs ini dirancang dengan prinsip yang sama seperti proyek klien: hierarki tipografi yang jelas, kontras warna yang memenuhi standar aksesibilitas WCAG AA, serta komponen yang seluruhnya bersumber dari satu berkas data. Interaksi dibuat seperlunya agar isi tetap menjadi fokus utama.",
    year: "2026",
    featured: false,
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS v4"],
    metrics: "Kontras teks lulus WCAG AA",
    highlights: [
      "Terminal interaktif untuk menelusuri profil lewat perintah",
      "Sistem token desain terpusat pada satu berkas CSS",
      "Konten sepenuhnya dikelola dari satu sumber data",
      "Mendukung preferensi pengurangan animasi dan navigasi keyboard",
    ],
    demoUrl: "https://alficandra.dev",
    githubUrl: "https://github.com/alficandradinata/alfi-portofilio",
    visualType: "code",
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  {
    name: "React & Next.js",
    category: "frontend",
    level: 92,
    icon: "Code2",
    experience: "3 tahun",
    description:
      "Server Components, rendering sisi server, hooks, dan manajemen state aplikasi berskala besar.",
  },
  {
    name: "TypeScript & JavaScript",
    category: "frontend",
    level: 88,
    icon: "Terminal",
    experience: "3 tahun",
    description:
      "Type safety, ECMAScript modern, pemrograman asinkron, dan penerapan prinsip clean code.",
  },
  {
    name: "Tailwind CSS & UI Modern",
    category: "frontend",
    level: 95,
    icon: "Palette",
    experience: "2,5 tahun",
    description:
      "Tata letak responsif, sistem desain, aksesibilitas, dan konsistensi antarmuka.",
  },

  // Mobile
  {
    name: "React Native & Expo",
    category: "mobile",
    level: 85,
    icon: "Smartphone",
    experience: "2 tahun",
    description:
      "Aplikasi lintas platform untuk Android dan iOS, termasuk integrasi API perangkat keras.",
  },

  // Backend & basis data
  {
    name: "Python & FastAPI",
    category: "backend",
    level: 86,
    icon: "Server",
    experience: "2,5 tahun",
    description:
      "Pengembangan REST API, pipeline data, layanan backend, dan otomasi proses.",
  },
  {
    name: "MongoDB & PostgreSQL",
    category: "backend",
    level: 82,
    icon: "Database",
    experience: "2 tahun",
    description:
      "Perancangan skema, kueri relasional dan non-relasional, indexing, serta pemodelan data.",
  },

  // Data
  {
    name: "Pandas & Streamlit",
    category: "data",
    level: 80,
    icon: "BarChart3",
    experience: "1,5 tahun",
    description:
      "Eksplorasi dan pembersihan data, analisis statistik, serta dasbor interaktif.",
  },

  // Tools
  {
    name: "Git & Version Control",
    category: "tools",
    level: 90,
    icon: "GitBranch",
    experience: "3 tahun",
    description:
      "Git flow, alur kerja kolaboratif, CI/CD, dan pengelolaan repositori tim.",
  },
  {
    name: "REST API & Arsitektur",
    category: "tools",
    level: 88,
    icon: "Cpu",
    experience: "3 tahun",
    description:
      "Integrasi API, autentikasi JWT/OAuth, pemrosesan asinkron, dan skalabilitas layanan.",
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2026",
    period: "2025 — Sekarang",
    role: "Full-Stack Software Engineer & Mahasiswa Tingkat Akhir",
    company: "Independen / Proyek Tugas Akhir",
    location: "Pekanbaru, Indonesia",
    description:
      "Mengembangkan sistem inventaris, menjalankan penelitian tugas akhir di bidang rekayasa perangkat lunak, serta mendalami arsitektur web modern dengan Next.js dan Python.",
    achievements: [
      "Mengembangkan Sales & Inventory Tracking System dengan integrasi barcode",
      "Membangun dasbor analitik data berbasis Python dan Streamlit",
      "Menyiapkan rilis portofolio profesional berstandar industri",
    ],
    skills: ["Next.js", "React", "Python", "MongoDB", "Tailwind CSS"],
    type: "work",
  },
  {
    year: "2025",
    period: "2024 — 2025",
    role: "Mobile App Developer (Ketua Proyek)",
    company: "Proyek PLN Simpang 3",
    location: "Pekanbaru, Indonesia",
    description:
      "Merancang dan membangun aplikasi mobile manajemen arsip digital untuk staf operasional PLN Simpang 3.",
    achievements: [
      "Mengubah alur persetujuan dokumen fisik menjadi proses digital terstruktur",
      "Mengintegrasikan kamera dengan watermark lokasi GPS dan waktu otomatis",
      "Meningkatkan kecepatan pencarian arsip hingga 70%",
    ],
    skills: ["React Native", "Expo", "FastAPI", "PostgreSQL", "Cloud Storage"],
    type: "work",
  },
  {
    year: "2023",
    period: "2022 — Sekarang",
    role: "Teknik Informatika",
    company: "Program Sarjana",
    location: "Indonesia",
    description:
      "Berfokus pada rekayasa perangkat lunak, struktur data dan algoritma, sistem basis data, serta kecerdasan buatan dan sains data.",
    achievements: [
      "Kontributor pada showcase proyek perangkat lunak kampus",
      "Menyelesaikan lebih dari 10 studi kasus perangkat lunak web dan mobile",
      "Aktif mendalami teknologi open-source terkini",
    ],
    skills: ["Algoritma", "Struktur Data", "OOP", "Arsitektur Perangkat Lunak"],
    type: "education",
  },
];
