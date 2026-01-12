import Script from 'next/script'
import "./globals.css";
import Navbar from "../components/navbar";

export const metadata = {
  title: "Specialty Koffie Catering | Menno's Koffiebar",
  description: 'Wij serveren high-end specialty coffee bij jouw bedrijf, event of bruiloft. Omdat je gasten betere koffie verdienen.',
  openGraph: {
    images: ['/L1.png'],
  },
  icons: {
    icon: ['/L1.png'], // favicon
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        {/* Google Ads / gtag.js */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11345241499"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-11345241499');
          `}
        </Script>
      </head>

      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-6 md:pt-10">{children}</main>
        {/* <Footer1 /> */}
      </body>
    </html>
  );
}
