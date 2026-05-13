import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Background from "@/components/canvas/Background";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-transparent text-foreground relative min-h-screen`}
      >
        <Background />
        <main className="relative z-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
