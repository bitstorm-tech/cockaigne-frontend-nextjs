"use client";
import EmptyContent from "@/components/ui/EmptyContent";
import FireIcon from "@/components/ui/icons/FireIcon";
import HeartIcon from "@/components/ui/icons/HeartIcon";
import StarIcon from "@/components/ui/icons/StarIcon";
import Link from "next/link";
import { useState } from "react";

export default function UserTabs() {
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
      {/*{tabIndex === 0 && <UserDealList deals={deals()} emptyContent={emptyContent} />}*/}
      {/*{tabIndex === 1 && <UserHotDealList />}*/}
      {/*{tabIndex === 2 && <UserFavoriteDealerList />}*/}
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
