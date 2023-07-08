import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ["400", "500", "700"] })

export const metadata: Metadata = {
  title: 'Geracao de images com inteligencia artificial de forma gratuita',
  description: 'Imagens geradas com inteligencia artificial de forma gratuita',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
          <script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8436534269018722"
            crossOrigin="anonymous"
          ></script>
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
