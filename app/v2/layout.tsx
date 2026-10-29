import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tunggul Bayu Kusuma — Full Stack Software Engineer | dev.tol3.ai.id',
  description:
    'Cybernetic & 3D Engineering Portfolio of Tunggul Bayu Kusuma (IPK 3.86). Specialized in MERN Stack, Laravel, CodeIgniter 4, and IoT Embedded Systems.',
  keywords: [
    'Tunggul Bayu Kusuma',
    'Tole',
    'tol3',
    'dev.tol3.ai.id',
    'Full Stack Developer',
    'MERN Stack',
    'Laravel',
    'CodeIgniter 4',
    'React',
    'Next.js',
    'Portfolio'
  ],
  authors: [{ name: 'Tunggul Bayu Kusuma' }],
  themeColor: '#07070b',
  icons: {
    icon: '/assets/images/pp-nobg.png',
  }
}

export default function V2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#07070b] text-white min-h-screen selection:bg-[#ff5b2e] selection:text-white">
      {children}
    </div>
  )
}
