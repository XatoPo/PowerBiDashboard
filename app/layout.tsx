import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard Rendimiento Estudiantil",
  description: "Prueba Técnica BI - Rendimiento Estudiantil por Flavio Villanueva Medina",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Dashboard Rendimiento Estudiantil",
    description: "Prueba Técnica BI - Rendimiento Estudiantil por Flavio Villanueva Medina",
    url: "",
    siteName: "Dashboard Rendimiento Estudiantil",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dashboard Rendimiento Estudiantil",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
