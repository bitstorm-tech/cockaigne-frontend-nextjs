import UserSettings from "@/app/settings/UserSettings";
import { Account } from "@/lib/supabase/public-types";
import { getProfileImage } from "@/lib/supabase/storage-service";
import { getServerSession, getSupabaseServerClient } from "@/lib/supabase/supabase-client-server";
import { logError } from "@/lib/utils/error-utils";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SettingsPage() {
  const session = await getServerSession();
  const account = await getAccount(session?.userId);

  if (!session || !account || !session.userId) {
    return redirect("/error");
  }

  const profileImageUrl = await getProfileImage({ userId: session.userId, isDealer: account?.is_dealer });

  return account.is_dealer ? (
    // <DealerSettings accountCopy={account} />
    <h1>Dealer Settings</h1>
  ) : (
    <UserSettings account={account} profileImageUrl={profileImageUrl} />
  );
}

async function getAccount(userId?: string): Promise<Account | undefined> {
  console.log("CALL getAccount (SettingsPage)");
  const { data, error } = await getSupabaseServerClient().from("accounts").select().eq("id", userId).single();

  if (error) {
    return logError(error, "Can't get account");
  }

  return data;
}
