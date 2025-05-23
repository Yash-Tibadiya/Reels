import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ReelsPro",
  description: "A video sharing platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <div className="flex flex-col h-screen overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
