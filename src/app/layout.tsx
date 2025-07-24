import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";
import ScrollToTopButton from "@/components/ui/button-scroll-to-top";
import dynamic from "next/dynamic";
import Footer from "@/components/ui/footer";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientWrapper } from "@/components/provider/query-client-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const TopProgressBar = dynamic(
  () => import("@/components/ui/top-progress-bar")
);

const beVietNam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title:
    "Spart Work: Nền tảng kết nối sinh viên với các công việc bán thời gian tại Việt Nam",
  description:
    "Spart Work - Nền tảng kết nối sinh viên với các công việc bán thời gian tại Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${beVietNam.className} antialiased font-sans bg-white dark:bg-gray-950 text-gray-950 dark:text-zinc-50`}
      >
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientWrapper>
            <Header />
            <TopProgressBar />
            {children}
            <Toaster
              toastOptions={{
                unstyled: true,
                duration: 3000,
                classNames: {
                  success:
                    "flex items-center gap-2 px-4 py-2 bg-green-500 text-white",
                  info: "flex items-center gap-2 px-4 py-2 bg-blue-500 text-white",
                  warning:
                    "flex items-center gap-2 px-4 py-2 bg-yellow-500 text-gray-950",
                  error:
                    "flex items-center gap-2 px-4 py-2 bg-red-500 text-white",
                },
              }}
            />
            <ScrollToTopButton />
            <Footer />
          </QueryClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
