import type { Metadata } from 'next'
import { Syne, Space_Grotesk } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Alex Reeves — Video Editor',
  description: 'Award-winning video editor specializing in cinematic storytelling, short-form content, and commercial productions.',
  keywords: ['video editor', 'cinematic', 'short form content', 'youtube editor', 'motion graphics'],
  openGraph: {
    title: 'Alex Reeves — Video Editor',
    description: 'Cinematic storytelling through expert video editing.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${syne.variable} ${spaceGrotesk.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
