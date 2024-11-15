import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Palette Generator',
  description: 'Generate beautiful color palettes with various harmony rules',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <main>{children}</main>
      </body>
      <Toaster />
    </html>
  )
}
