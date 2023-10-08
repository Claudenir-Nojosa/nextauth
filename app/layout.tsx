import "@/styles/globals.css";
import type { Metadata } from "next";
import {
  AuthProvider,
  QueryProvider,
  ThemeProviders,
} from "@/components/providers/providers";
import { Navbar } from "@/components/shared/Navbar";
import { Toaster } from "sonner";
import { fontSans } from "@/config/fonts";
import { EdgeStoreProvider } from "@/lib/edgestore";

export const metadata: Metadata = {
  title: ".nextEvery",
  description: "A full Nextjs application using NextAuth",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <Toaster richColors />
        <body className={fontSans.variable}>
          <ThemeProviders>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 mt-7 flex flex-col items-center justify-center">
                  <EdgeStoreProvider>{children}</EdgeStoreProvider>
                </main>
              </div>
            </AuthProvider>
          </ThemeProviders>
        </body>
      </QueryProvider>
    </html>
  );
}
