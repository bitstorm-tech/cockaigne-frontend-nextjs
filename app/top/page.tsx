import TopTabs from "@/app/top/TopTabs";
import EmptyContent from "@/components/ui/EmptyContent";
import { getTopDeals } from "@/lib/supabase/deal-service";
import { getServerSession } from "@/lib/supabase/supabase-client-server";
import Link from "next/link";

export default async function TopPage() {
  const session = await getServerSession();

  if (!session) {
    return (
      <EmptyContent>
        <span>
          Du willst deine ganz persönliche Liste von heißen Deals erstellen? Dann{" "}
          <Link href="/registration">
            <u>registriere</u>
          </Link>{" "}
          dich jetzt kostenlos!
        </span>
      </EmptyContent>
    );
  }

  const topDeals = await getTopDeals(session.userId, 100);

  return <TopTabs deals={topDeals}></TopTabs>;
}
