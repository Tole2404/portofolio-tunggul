import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import SplashScreen from '@/components/SplashScreen'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Tunggul - Full Stack Developer | Portfolio',
  description: 'Full Stack Developer specializing in React, Next.js, and modern web technologies. Building beautiful, functional, and user-centered digital experiences.',
  keywords: ['Full Stack Developer', 'Web Developer', 'React', 'Next.js', 'TypeScript', 'Portfolio', 'Frontend', 'Backend'],
  authors: [{ name: 'Tunggul Bayu Kusuma' }],
  creator: 'Tunggul Bayu Kusuma',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourwebsite.com',
    title: 'Tunggul - Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Next.js, and modern web technologies.',
    siteName: 'Tunggul Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tunggul - Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Next.js, and modern web technologies.',
    creator: '@tunggulbayu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SplashScreen />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
