import type { Metadata } from 'next'

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
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#CB372D' }}>{children}</body>
    </html>
  )
}
