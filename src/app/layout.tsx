import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import Background from "@/components/canvas/Background";
import { PageTransitionProvider } from "@/components/transition/PageTransitionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Harshit Harlalka | Futuristic Developer Portfolio",
  description: "Portfolio of Harshit Harlalka - Full Stack Developer, AI Enthusiast, and Machine Learning Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ scrollBehavior: 'smooth' }}>
      <body
        className={`${inter.variable} ${cinzel.variable} antialiased bg-transparent text-foreground relative min-h-screen font-sans`}
      >
        <Background />
        <PageTransitionProvider>
          <main className="relative z-10 w-full">
            {children}
          </main>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
