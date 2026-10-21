import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";

const boldonse = localFont({
  src: "../public/fonts/Boldonse-Regular.ttf",
  variable: "--font-boldonse",
  weight: "400",
  display: "swap",
});

const instrumentSerif = localFont({
  src: "../public/fonts/InstrumentSerif-Regular.ttf",
  variable: "--font-instrument-serif",
  weight: "400",
  display: "swap",
});

const fahkwang = localFont({
  src: "../public/fonts/Fahkwang-Light.ttf",
  variable: "--font-fahkwang",
  weight: "300",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ariadna García | Desarrolladora de Software · Software Developer",
  description:
    "Portafolio de Ariadna García, ingeniera en computación y desarrolladora de software (frontend, backend y datos). Proyectos web, móviles y de escritorio. · Portfolio of Ariadna García, computer engineer and software developer.",
  authors: [{ name: "Ariadna García" }],
  openGraph: {
    title: "Ariadna García | Desarrolladora de Software",
    description:
      "Proyectos, habilidades y contacto. · Projects, skills and contact.",
    type: "website",
    locale: "es_MX",
    alternateLocale: ["en_US"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${boldonse.variable} ${instrumentSerif.variable} ${fahkwang.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* Aplica el tema guardado (o el del sistema) antes de pintar, sin parpadeo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col"><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
