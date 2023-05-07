import Footer from "@/components/nav/Footer";
import Header from "@/components/nav/Header";
import SupabaseListener from "@/components/supabase/supabase-listener";
import SupabaseProvider from "@/components/supabase/supabase-provider";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Ubuntu } from "next/font/google";
import { cookies, headers } from "next/headers";
import "./globals.css";

const font = Ubuntu({ weight: "300", subsets: ["latin"] });

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Cockaigne"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });
  const { data } = await supabase.auth.getSession();

  return (
    <html>
      <head>
        <link rel="icon" href="/images/logo.svg" type="image/svg+xml"></link>
      </head>
      <body className={font.className}>
        <SupabaseProvider session={data.session}>
          <SupabaseListener serverAccessToken={data.session?.access_token} />
          {/* @ts-expect-error Server Component */}
          <Header />
          {children}
          {/* @ts-expect-error Server Component */}
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}
