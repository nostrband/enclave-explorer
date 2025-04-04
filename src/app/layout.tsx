import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({
   subsets: ['latin'],
   display: 'swap',
   weight: ['400', '500', '600', '700'],
   variable: '--font-inter-sans',
})

export const metadata: Metadata = {
   title: 'Enclave Explorer',
   description: 'Browse nostr enclaves',
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en" className={`${inter.variable} antialiased h-full`}>
         <body className="flex flex-col h-full w-full">
            <Header />
            <main className="w-full h-full">{children}</main>
         </body>
      </html>
   )
}
