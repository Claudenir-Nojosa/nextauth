import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  AuthProvider,
  QueryProvider,
  ThemeProviders,
} from "@/components/providers/providers";
import { Navbar } from "@/components/shared/Navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <Toaster richColors/>
        <body className={inter.className}>
          <ThemeProviders>
            <AuthProvider>
              <Navbar />
              <main className=" h-screen flex flex-col justify-center items-center">
                {children}
              </main>
            </AuthProvider>
          </ThemeProviders>
        </body>
      </QueryProvider>
    </html>
  );
}
