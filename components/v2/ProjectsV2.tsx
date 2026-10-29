'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight, Star, Layers, Cpu, Smartphone, Globe, Shield } from 'lucide-react'
import Image from 'next/image'
import { sound } from './AudioEngine'
import ProjectModalV2, { ProjectDetail } from './ProjectModalV2'

export default function ProjectsV2() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const projects: ProjectDetail[] = [
    {
      id: 'sarassingkat',
      title: 'SarasSingkat — Book Summary Platform',
      tagline: 'Platform ringkasan buku interaktif berbasis MERN Stack untuk mengatasi krisis literasi nasional.',
      category: 'MERN STACK',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'RESTful API', 'JWT'],
      github: 'https://github.com/Tole2404/Capstone-SarasSingkat',
      demo: 'https://frontend-saras-singkat.vercel.app/',
      featured: true,
      role: 'Full Stack Developer',
      timeline: 'Feb 2024 — Jun 2024',
      teamSize: '4 Orang (Capstone SIB Dicoding)',
      fullDescription:
        'SarasSingkat dikembangkan sebagai Capstone Project program Studi Independen Dicoding bertema "Enhancing Quality Human Resources". Mengingat skor literasi Indonesia yang berada di peringkat 70 dari 81 negara (PISA), SarasSingkat hadir sebagai inovasi agar masyarakat dapat menyerap intisari buku bermutu dalam waktu singkat.',
      features: [
        'Ringkasan buku ringkas dengan visualisasi poin-poin esensial',
        'Katalog beraneka genre: teknologi, sains, self-help, hingga novel',
        'Sistem rekomendasi buku adaptif berdasarkan preferensi pembaca',
        'Fitur Bookmark / Save for Later dengan local & cloud synchronization',
        'Otentikasi aman berbasis JSON Web Token (JWT)',
        'Antarmuka responsif ramah perangkat mobile'
      ],
      challenges:
        'Mendesain alur rekomendasi buku yang relevan serta memastikan latency API seminimal mungkin saat menyajikan konten ringkasan yang kaya teks.',
      solutions:
        'Menerapkan skema NoSQL yang ter-indeks di MongoDB, caching respons Express.js, dan arsitektur komponen React yang modular.'
    },
    {
      id: 'recruitment-ptk',
      title: 'Recruitment Flow & Approval PTK',
      tagline: 'Sistem otomasi rekrutmen karyawan & alur persetujuan multi-level berbasis CodeIgniter 4.',
      category: 'ENTERPRISE PHP',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      tags: ['CodeIgniter 4', 'PHP', 'MySQL', 'Bootstrap', 'RESTful API'],
      github: 'https://github.com/Tole2404/recruitment-system',
      demo: 'https://github.com/Tole2404/recruitment-system',
      featured: true,
      role: 'Full Stack Web Developer Intern',
      timeline: 'Nov 2024 — Des 2024',
      teamSize: 'Solo Project (PT Kansai Prakarsa Coatings)',
      fullDescription:
        'Aplikasi web terintegrasi untuk mengotomasi 2 alur vital HR: Alur Pengajuan & Approval PTK (Permintaan Tenaga Kerja) dan Alur Pendaftaran & Seleksi Pelamar Kerja secara online dengan multi-tier authorization.',
      features: [
        'Multi-level approval workflow: Department Head → Director → HR/GA',
        'Formulir aplikasi pelamar online dengan validasi dan upload berkas',
        'Dashboard metrik status approval real-time',
        'Integrasi notifikasi email otomatis saat status kandidat berubah',
        'Ekspor berkas laporan seleksi ke format PDF & Excel',
        'Role-Based Access Control (RBAC) yang ketat'
      ],
      challenges:
        'Mengelola alur persetujuan bertingkat yang rawan inkonsistensi status antar departemen serta menjaga integritas data pelamar.',
      solutions:
        'Mengimplementasikan State Machine pattern, middleware otorisasi, dan database transaction pada database MySQL.'
    },
    {
      id: 'dinoku',
      title: 'Dinoku — Jurnal Pemantauan Karakter TK',
      tagline: 'Aplikasi pemantauan 7 kebiasaan baik anak usia dini berbasis Laravel 11 dengan multi-role dashboard.',
      category: 'LARAVEL',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
      tags: ['Laravel 11', 'MySQL', 'TailwindCSS', 'Alpine.js', 'Chart.js'],
      github: 'https://github.com/Tole2404/jurnal-dinoku',
      demo: 'https://github.com/Tole2404/jurnal-dinoku',
      featured: true,
      role: 'Full Stack Developer',
      timeline: '3 Bulan',
      teamSize: 'Solo Project',
      fullDescription:
        'Aplikasi web terstruktur untuk membantu pendidik dan orang tua memantau perkembangan karakter dan 7 Kebiasaan Baik anak Taman Kanak-Kanak secara kolaboratif.',
      features: [
        'Multi-role login: Admin Sekolah, Guru Kelas, dan Orang Tua Siswa',
        'Pencatatan evaluasi jurnal harian anak dengan antarmuka ceria',
        'Visualisasi grafik perkembangan karakter berkala menggunakan Chart.js',
        'Ekspor rapor habit anak ke dokumen PDF siap cetak',
        'Analisis capaian per anak atau per rombongan belajar'
      ],
      challenges:
        'Membuat sistem multi-authentication yang aman dan terisolasi dengan hak akses data yang berbeda bagi orang tua dan guru.',
      solutions:
        'Memanfaatkan custom guard Laravel, model policy, dan pemisahan sub-routing untuk tiap role.'
    },
    {
      id: 'smart-kandang',
      title: 'Smart Kandang Ayam — IoT Automation',
      tagline: 'Perangkat kendali kandang otomatis berbasis Arduino Uno dengan pakan, air, dan suhu stabil.',
      category: 'IOT & EMBEDDED',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      tags: ['Arduino', 'IoT', 'C++', 'Embedded System', 'Hardware'],
      github: 'https://github.com/Tole2404/Smart-kandang-ayam',
      demo: 'https://tole2404.github.io/portofolio.github.io/project-2.html',
      featured: true,
      role: 'IoT & Embedded Engineer',
      timeline: 'Tugas Pemrograman Sistem Kendali',
      teamSize: 'Solo Project (Pameran FTI FAIR Kampus)',
      fullDescription:
        'Sistem kendali kandang ayam otomatis berbasis mikrokontroler Arduino Uno. Dilengkapi aktuator servo untuk distribusi pakan, water pump otomatis, sensor DHT11 untuk stabilisasi suhu, dan penjadwalan real-time dengan RTC. Dipamerkan di ajang FTI FAIR kampus.',
      features: [
        'Pemberian pakan otomatis terjadwal menggunakan motor servo',
        'Pompa pengisian air minum otomatis dengan water-level sensor',
        'Monitoring suhu lingkungan real-time via sensor DHT11',
        'Penjadwalan presisi dengan modul Real-Time Clock (RTC)',
        'Kontrol proteksi beban listrik via relay circuit module'
      ],
      challenges:
        'Menjaga sinkronisasi timing sensor dan aktuator tanpa blocking loop agar stabilitas suhu kandang tetap terjaga konsisten.',
      solutions:
        'Menerapkan state-machine timing tanpa delay() yang mengunci CPU, serta wiring proteksi relay untuk keandalan catu daya.'
    },
    {
      id: 'eponstore',
      title: 'EponStore — Apple E-Commerce Ecosystem',
      tagline: 'Aplikasi belanja mobile Apple store berbasis Flutter dengan backend API Laravel.',
      category: 'MOBILE & LARAVEL',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
      tags: ['Flutter', 'Laravel', 'MySQL', 'REST API', 'Dart'],
      github: 'https://github.com/Tole2404/EponStore',
      demo: 'https://tole2404.github.io/portofolio.github.io/project-1.html',
      featured: false,
      role: 'Full Stack Mobile & Web Developer',
      timeline: 'Tugas Mobile Programming',
      teamSize: 'Solo Project',
      fullDescription:
        'Toko daring produk Apple yang memadukan keindahan antarmuka mobile Flutter dengan keandalan manajemen produk web admin berbasis Laravel.',
      features: [
        'Katalog produk Apple terstruktur (iPhone, iPad, MacBook, Watch)',
        'Fitur pencarian dan filter harga/spesifikasi',
        'Keranjang belanja (cart) dengan kalkulasi harga seketika',
        'Web admin Laravel untuk manajemen inventaris & pesanan masuk'
      ],
      challenges:
        'Mengintegrasikan state management Flutter dengan REST API Laravel secara mulus.',
      solutions:
        'Membangun API controller yang terstruktur dengan format JSON standar dan validasi error komprehensif.'
    },
    {
      id: 'bob-marley-ai',
      title: 'Bob Marley Tribute & AI Chatbot',
      tagline: 'Website tribute legenda reggae dengan persona AI Chatbot "Curhat Om Bob" & Spotify API.',
      category: 'AI & FRONTEND',
      image: '/images/projects/bob-marley-tribute.jpg',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'AI Chatbot', 'Spotify API'],
      github: 'https://github.com/Tole2404/chatbot-bobmarley',
      demo: 'https://tole2404.github.io/chatbot-bobmarley',
      featured: false,
      role: 'Frontend Developer',
      timeline: '1 Bulan',
      teamSize: 'Solo Project',
      fullDescription:
        'Website tribute interaktif mengenang Bob Marley dengan biografi interaktif, pemutar musik Spotify terintegrasi, dan chatbot cerdas yang menirukan persona filosofis sang legenda reggae.',
      features: [
        'AI Chatbot interaktif "Curhat Om Bob"',
        'Integrasi Spotify Web Player',
        'Arsip kutipan inspiratif terbagi dalam 6 kategori',
        'Penyimpanan riwayat dialog di localStorage'
      ],
      challenges:
        'Melakukan prompting kepribadian AI agar respon percakapan tetap autentik dan berbobot ala gaya bicara Bob Marley.',
      solutions:
        'Menyusun custom system prompt AI dan mengintegrasikan Web Audio & Spotify Embed API.'
    },
    {
      id: 'kain-lap-majun',
      title: 'Kain Lap Majun — Full Stack E-Commerce',
      tagline: 'Platform penjualan online kain lap industri dengan keranjang belanja & dashboard admin.',
      category: 'LARAVEL',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      tags: ['Laravel 11', 'TailwindCSS', 'MySQL', 'Sanctum', 'Vite'],
      github: 'https://github.com/Tole2404/darmin-majun',
      featured: false,
      role: 'Full Stack Developer',
      timeline: '3 Bulan',
      teamSize: 'Solo Project',
      fullDescription:
        'Platform e-commerce end-to-end untuk penjualan produk kain majun industri dengan sistem otentikasi Sanctum dan manajemen stok produk.',
      features: [
        'Katalog produk terorganisir per kategori',
        'Session-based shopping cart',
        'Admin dashboard statistik transaksi',
        'Desain modern responsif dengan TailwindCSS'
      ],
      challenges: 'Mengelola sinkronisasi session cart dan file upload gambar produk.',
      solutions: 'Memanfaatkan Laravel Storage API dan validasi relasi database yang ketat.'
    },
    {
      id: 'umkm-ngandong',
      title: 'UMKM Ngandong — Digital Business',
      tagline: 'Platform katalog digital dan inventori online untuk UMKM lokal.',
      category: 'PHP',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      tags: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
      github: 'https://github.com/Tole2404/umkm-ngandong',
      featured: false,
      role: 'Full Stack Developer',
      timeline: '2 Bulan',
      teamSize: 'Solo Project',
      fullDescription:
        'Aplikasi web untuk membantu pelaku usaha mikro dalam mempublikasikan produk dan mengelola stok dagangan secara mandiri.',
      features: [
        'Katalog produk dengan pencarian cepat',
        'Pemesanan online sederhana',
        'Panel admin pencatatan persediaan barang'
      ],
      challenges: 'Merancang antarmuka yang sangat mudah dipahami oleh pengguna non-teknis.',
      solutions: 'Mendesain tata letak ringkas dengan elemen aksi yang kontras dan jelas.'
    },
    {
      id: 'pergimmikan',
      title: 'Pergimmikan — Academic Data System',
      tagline: 'Aplikasi manajemen akademik kampus untuk pengelolaan data mahasiswa & jadwal.',
      category: 'PHP',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      tags: ['PHP', 'MySQL', 'Bootstrap', 'jQuery'],
      github: 'https://github.com/Tole2404/pergimmikan',
      featured: false,
      role: 'Backend Developer',
      timeline: '2 Bulan',
      teamSize: '2 Orang',
      fullDescription:
        'Sistem administrasi akademik perguruan tinggi untuk mengelola relasi data antara mahasiswa, dosen, mata kuliah, jadwal kuliah, dan rekapitulasi nilai.',
      features: [
        'Manajemen database mahasiswa & dosen',
        'Penjadwalan ruang & mata kuliah',
        'Transkrip nilai mahasiswa terpadu'
      ],
      challenges: 'Mengoptimalkan query database relasional pada jadwal perkuliahan yang kompleks.',
      solutions: 'Menerapkan normalisasi 3NF dan query optimization dengan foreign key constraints.'
    }
  ]

  const filterTabs = [
    { label: 'ALL SYSTEMS', value: 'ALL' },
    { label: 'FEATURED', value: 'FEATURED' },
    { label: 'MERN & FULL STACK', value: 'MERN' },
    { label: 'PHP & LARAVEL', value: 'LARAVEL' },
    { label: 'IOT & HARDWARE', value: 'IOT' }
  ]

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'ALL') return true
    if (activeFilter === 'FEATURED') return p.featured
    if (activeFilter === 'MERN') return p.category.includes('MERN') || p.tags.includes('React')
    if (activeFilter === 'LARAVEL') return p.category.includes('LARAVEL') || p.category.includes('PHP')
    if (activeFilter === 'IOT') return p.category.includes('IOT')
    return true
  })

  const openDossier = (proj: ProjectDetail) => {
    sound.playOpen()
    setSelectedProject(proj)
    setModalOpen(true)
  }

  return (
    <section id="projects" className="py-28 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff5b2e] shadow-[0_0_8px_#ff5b2e]" />
              <span className="text-[#ff5b2e] text-xs tracking-[0.25em] font-semibold uppercase">
                04 / 06 SELECTED WORK & ENGINEERING
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-sans tracking-tight">
              DEPLOYED SYSTEMS
            </h2>
            <p className="text-gray-400 text-sm font-sans mt-2 max-w-xl">
              Portofolio aplikasi nyata: dari platform MERN skala capstone, sistem persetujuan korporasi, hingga otomasi perangkat cerdas IoT.
            </p>
          </div>

          <div className="text-xs text-gray-500 font-mono">
            COUNT: <span className="text-[#ff5b2e] font-bold">{filteredProjects.length}</span> / {projects.length} SYSTEMS
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                sound.playClick()
                setActiveFilter(tab.value)
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs tracking-wider transition-all ${
                activeFilter === tab.value
                  ? 'bg-[#ff5b2e] text-white shadow-[0_0_15px_rgba(255,91,46,0.4)] font-semibold'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group rounded-2xl bg-[#0c0c16] border border-white/10 hover:border-[#ff5b2e]/60 transition-all shadow-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c16] via-[#0c0c16]/30 to-transparent" />

                    {/* Featured Star Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#ff5b2e]/50 text-[10px] text-[#ff5b2e] flex items-center gap-1 font-mono">
                        <Star className="w-3 h-3 fill-[#ff5b2e]" />
                        <span>FEATURED</span>
                      </div>
                    )}

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-gray-300 font-mono">
                      {project.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white font-sans group-hover:text-[#ff5b2e] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed mt-2 line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.slice(0, 4).map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[11px] bg-white/5 border border-white/10 text-gray-300 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[11px] text-gray-500 font-mono py-0.5">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openDossier(project)}
                    className="text-xs text-[#00f0ff] hover:text-white font-mono flex items-center gap-1 group/btn"
                  >
                    <span>DOSSIER (STAR)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="p-2 rounded-lg bg-[#ff5b2e]/10 hover:bg-[#ff5b2e] text-[#ff5b2e] hover:text-white border border-[#ff5b2e]/30 transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Detail Modal Component */}
      <ProjectModalV2
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  )
}
