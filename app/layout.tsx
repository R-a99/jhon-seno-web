import type { Metadata } from 'next'
import { Montserrat, Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Jhon Seno Company - Premium Indonesian Export Products',
  description: 'Your trusted partner for premium Indonesian exports product. Spices, biomass, dried insects, coconut briquettes, and specialty coffee.',
  keywords: ['Indonesian export', 'spices', 'biomass', 'coconut briquettes', 'coffee', 'B2B supplier'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // ✅ FIX 1: Tambah suppressHydrationWarning pada <html>
    // Ini mencegah warning hydration mismatch yang sering terjadi
    // ketika Google Translate memodifikasi atribut di tag <html>
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
         * ✅ FIX 2: Beritahu Google Translate untuk berhati-hati
         * dengan elemen yang ditandai class="notranslate"
         * 
         * CATATAN: Meta tag di bawah ini (yang dikomentari) akan
         * menonaktifkan Google Translate di SELURUH situs.
         * Hanya aktifkan jika kamu tidak ingin situs diterjemahkan sama sekali.
         * 
         * Karena kamu mau Google Translate tetap bisa dipakai user,
         * biarkan baris ini tetap dikomentari — perlindungan sudah
         * cukup dari translate="no" di komponen modal (page.tsx).
         */}
        {/* <meta name="google" content="notranslate" /> */}
      </head>
      {/*
       * ✅ FIX 3: Tambah suppressHydrationWarning pada <body>
       * Google Translate kadang menambahkan atribut ke <body>
       * yang menyebabkan React hydration error saat pertama load.
       */}
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
