import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '유머사이트',
  description: '유머사이트 모음집',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="h-screen">
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  )
}
