import UserHeader from "@/components/user/UserHeader";
import UserTabs from "@/components/user/UserTabs";
import { getDealsByFilter, getHotDeals, getLikes } from "@/lib/supabase/deal-service";
import { createFilterByCurrentLocationAndSelectedCategories } from "@/lib/supabase/location-service";
import { ActiveDeal } from "@/lib/supabase/public-types";
import { getServerSession, getSupabaseServerClient } from "@/lib/supabase/supabase-client-server";

export default async function UserPage() {
  const username = await getUsername();
  const deals = await getDeals();

  return (
    <>
      <UserHeader username={username} />
      <UserTabs deals={deals} />
    </>
  );
}

async function getUsername(): Promise<string> {
  console.log("CALL getUsername (UserPage)");
  const session = await getServerSession();
  const { data, error } = await getSupabaseServerClient().from("accounts").select("username").eq("id", session?.userId).single();

  if (error) {
    console.error("ERROR: can't get username:", error.message);
  }

  return data?.username || "";
}

async function getDeals(): Promise<ActiveDeal[]> {
  const session = await getServerSession();
  const userId = session?.userId || "";
  const filter = await createFilterByCurrentLocationAndSelectedCategories(userId);
  const [deals, hotDeals, likes] = await Promise.all([getDealsByFilter(filter), getHotDeals(userId), getLikes()]);

  return deals;
}
