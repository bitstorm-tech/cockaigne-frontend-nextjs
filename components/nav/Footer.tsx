import DealsOverviewIcon from "@/components/ui/icons/DealsOverviewIcon";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import MapIcon from "@/components/ui/icons/MapIcon";
import TopIcon from "@/components/ui/icons/TopIcon";
import { getServerSession } from "@/lib/supabase/supabase-client-server";
import Link from "next/link";

export default async function Footer() {
  const session = await getServerSession();

  return (
    <footer className="btm-nav btm-nav-sm h-12 border-t-[0.01rem] border-t-[#556368] text-[#69828c]">
      {session?.isDealer ? (
        <>
          <Link href="/">
            <HomeIcon outline={false} />
          </Link>
          <Link href="/deals/overview">
            <DealsOverviewIcon />
          </Link>
        </>
      ) : (
        <>
          <Link href="/">
            <HomeIcon outline={false} />
          </Link>
          <Link href="/top">
            <TopIcon outline={false} />
          </Link>
          <Link href="/map">
            <MapIcon outline={false} />
          </Link>
        </>
      )}
    </footer>
  );
}
