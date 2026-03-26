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
  title: 'Jhon Seno Kompany - Premium Indonesian Export Products',
  description: 'Your trusted partner for premium Indonesian exports product. Spices, biomass, dried insects, coconut briquettes, and specialty coffee.',
  keywords: ['Indonesian export', 'spices', 'biomass', 'coconut briquettes', 'coffee', 'B2B supplier'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
