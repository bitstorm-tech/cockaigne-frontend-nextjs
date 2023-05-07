"use client";
import UserDealList from "@/app/user/UserDealList";
import UserFavoriteDealerList from "@/app/user/UserFavoriteDealerList";
import UserHotDealList from "@/app/user/UserHotDealList";
import EmptyContent from "@/components/ui/EmptyContent";
import FireIcon from "@/components/ui/icons/FireIcon";
import HeartIcon from "@/components/ui/icons/HeartIcon";
import StarIcon from "@/components/ui/icons/StarIcon";
import { ActiveDeal } from "@/lib/supabase/public-types";
import { Session } from "@/lib/supabase/supabase-client-server";
import Link from "next/link";
import { useState } from "react";

type Props = {
  session?: Session;
  deals: ActiveDeal[];
  hotDeals: ActiveDeal[];
};

export default function UserTabs({ session, deals, hotDeals }: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
      <div className="tabs mb-1 mt-6 flex max-h-8">
        <button onClick={() => setTabIndex(0)} className={`tab-bordered tab grow ${tabIndex === 0 && "tab-active"}`}>
          <StarIcon outline={tabIndex !== 0} />
        </button>
        <button onClick={() => setTabIndex(1)} className={`tab-bordered tab grow ${tabIndex === 1 && "tab-active"}`}>
          <FireIcon outline={tabIndex !== 1} />
        </button>
        <button onClick={() => setTabIndex(2)} className={`tab-bordered tab grow ${tabIndex === 2 && "tab-active"}`}>
          <HeartIcon outline={tabIndex !== 2} />
        </button>
      </div>
      {tabIndex === 0 && <UserDealList deals={deals} emptyContent={emptyContent} />}
      {tabIndex === 1 && <UserHotDealList hotDeals={hotDeals} isLoggedIn={!!session} />}
      {tabIndex === 2 && <UserFavoriteDealerList isLoggedIn={!!session} />}
    </>
  );
}

const emptyContent = (
  <EmptyContent>
    <p>Aktuell gibt es leider keine Deals in deiner Nähe :(</p>
    <p>
      <Link href="/map?showFilter=true">
        <u>Filter anpassen</u>
      </Link>
      {" oder "}
      <Link href="/map">
        <u>Standort ändern</u>
      </Link>
      !
    </p>
  </EmptyContent>
);