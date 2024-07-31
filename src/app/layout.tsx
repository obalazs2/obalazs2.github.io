import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'

const font = Press_Start_2P({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'obalazs.hu',
  description: '↑↑↓↓←→←→BA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={font.className}>
      <body style={{ margin: 0, backgroundColor: '#e94823' }}>{children}</body>
    </html>
  )
}
