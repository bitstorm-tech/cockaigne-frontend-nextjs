"use client";
import UserDealList from "@/app/user/UserDealList";
import EmptyContent from "@/components/ui/EmptyContent";
import { ActiveDeal } from "@/lib/supabase/public-types";
import { useState } from "react";

type Props = {
  deals: ActiveDeal[];
};

export default function TopTabs({ deals }: Props) {
  const [tabIndex, setTabIndex] = useState(10);

  const emptyContent = <EmptyContent>In deiner Umgebung gibt es leider noch keine Top-Deals :(</EmptyContent>;

  return (
    <>
      <p className="my-4 text-center">TOP-Deals in deiner Nähe</p>
      <div className="tabs mb-1 flex max-h-8">
        <button onClick={() => setTabIndex(10)} className={`tab-bordered tab grow ${tabIndex === 10 && "tab-active"}`}>
          Top 10
        </button>
        <button onClick={() => setTabIndex(25)} className={`tab-bordered tab grow ${tabIndex === 25 && "tab-active"}`}>
          Top 25
        </button>
        <button onClick={() => setTabIndex(50)} className={`tab-bordered tab grow ${tabIndex === 50 && "tab-active"}`}>
          Top 50
        </button>
        <button onClick={() => setTabIndex(100)} className={`tab-bordered tab grow ${tabIndex === 1000 && "tab-active"}`}>
          Top 100
        </button>
      </div>
      <UserDealList deals={deals} emptyContent={emptyContent} />
    </>
  );
}
