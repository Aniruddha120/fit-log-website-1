import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { FitLogProvider } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: {
    default: "FitLog — Workout Library",
    template: "%s | FitLog",
  },
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export const viewport: Viewport = {
  themeColor: "#0c0d10",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <FitLogProvider>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}
