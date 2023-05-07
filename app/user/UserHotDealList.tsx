import UserDealList from "@/app/user/UserDealList";
import EmptyContent from "@/components/ui/EmptyContent";
import { ActiveDeal } from "@/lib/supabase/public-types";
import Link from "next/link";

type Props = {
  hotDeals: ActiveDeal[];
  isLoggedIn: boolean;
};

export default function UserHotDealList({ hotDeals, isLoggedIn }: Props) {
  const emptyContent = (
    <EmptyContent>
      {isLoggedIn ? (
        <span>Hier gibt es noch keine heißen Deals.</span>
      ) : (
        <span>
          Du willst deine ganz persönliche Liste von heißen Deals erstellen? Dann{" "}
          <Link href="/registration">
            <u>registriere</u>
          </Link>{" "}
          dich jetzt kostenlos!
        </span>
      )}
    </EmptyContent>
  );

  return <UserDealList deals={hotDeals} emptyContent={emptyContent} />;
}
