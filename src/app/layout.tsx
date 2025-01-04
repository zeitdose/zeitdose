import type { Metadata } from 'next'

import { Open_Sans } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'

import { Toaster } from '~/components/ui/toaster'
import { cn } from '~/lib/utils'

import './globals.css'

const fontSans = Open_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  description: 'Your app description',
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Your App',
    template: '%s | Your App',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
        >
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  )
}
