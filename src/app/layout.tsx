import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: {
    default: "Tran Tuan Dai | Data Engineer & AI Automation Specialist",
    template: "%s | Tran Tuan Dai",
  },
  description: "Expert Data Engineer, Marketing Analyst, and AI Automator specializing in Python, Dagster ETL, and business intelligence. Transforming data into actionable insights.",
  keywords: [
    "Tran Tuan Dai",
    "Data Engineer",
    "Marketing Analyst",
    "AI Automation",
    "Python Developer",
    "Dagster ETL",
    "Business Intelligence",
    "Data Analytics",
    "AI Automator",
    "Vietnam Data Engineer",
  ],
  authors: [{ name: "Tran Tuan Dai" }],
  creator: "Tran Tuan Dai",
  publisher: "Tran Tuan Dai",
  metadataBase: new URL("https://personal.daidataly.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://personal.daidataly.online",
    title: "Tran Tuan Dai | Data Engineer & AI Automation Specialist",
    description: "Expert Data Engineer, Marketing Analyst, and AI Automator specializing in Python, Dagster ETL, and business intelligence. Transforming data into actionable insights.",
    siteName: "Tran Tuan Dai Portfolio",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "Tran Tuan Dai - Data Engineer & AI Automation Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tran Tuan Dai | Data Engineer & AI Automation Specialist",
    description: "Expert Data Engineer, Marketing Analyst, and AI Automator specializing in Python, Dagster ETL, and business intelligence.",
    images: ["/og-image.jpg"], // You'll need to create this
    creator: "@TranTuanDai", // Replace with your actual Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "bpnIgq5WdHZqK0kyKylx_wieu5Aqwm7zrIGuStw9iwg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "font-inter" // Use class names that map to the CSS variables if needed, or just rely on global font settings
        )}
      >
        <StructuredData />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>{children}</SmoothScroll>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
