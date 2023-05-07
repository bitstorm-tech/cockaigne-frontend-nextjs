import { getServerSession } from "@/lib/supabase/supabase-client-server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const session = await getServerSession();

  session?.isDealer ? redirect("/dealer/") : redirect("/user");
}
