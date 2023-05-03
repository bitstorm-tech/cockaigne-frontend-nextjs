import Footer from "@/components/nav/Footer";
import Header from "@/components/nav/Header";
import { getSession } from "@/lib/supabase/auth-service";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const font = Ubuntu({ weight: "300", subsets: ["latin"] });

export const metadata = {
  title: "Cockaigne"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html>
      <body className={font.className}>
        <Header session={session} />
        {children}
        <Footer session={session} />
      </body>
    </html>
  );
}
