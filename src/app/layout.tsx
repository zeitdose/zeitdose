import type { Metadata } from 'next'

import { Open_Sans as FontSans } from 'next/font/google'

import { Toaster } from '~/components/ui/toaster'
import { cn } from '~/lib/utils'

import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  description: 'Generated by create next app',
  title: 'Create Next App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased text-sand-12',
          fontSans.variable,
        )}
      >
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
