import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tran Tuan Dai | Data Management & AI Automator",
  description: "Portfolio of Tran Tuan Dai - Data Engineer, Marketing Analyst, and AI Automator.",
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
