import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "./_components/Header";
import "./globals.css";
import Footer from "./_components/Footer";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ez Stock Analysis",
  description: "A simple stock analysis app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.svg" type="image/svg+xml"></link>
      <body
        className={`${montserrat.className} antialiased h-screen flex flex-col`}
      >
        <Header />
        <main className="grow overflow-y-auto text-on-surface bg-surface">
          <div className="container mx-auto p-3">{children}</div>
        </main>
        <Footer />

        <Toaster
          position="bottom-center"
          gutter={12}
          reverseOrder={false}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              zIndex: 20,
              fontSize: "16px",
              fontWeight: 500,
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-primary-container)",
              color: "var(--color-on-primary-container)",
            },
            iconTheme: {
              primary: "var(--color-on-primary-container)",
              secondary: "#FFFAEE",
            },
          }}
        />
      </body>
    </html>
  );
}
