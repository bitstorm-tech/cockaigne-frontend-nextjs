import Settings from "@/components/ui/Settings";
import { Account } from "@/lib/supabase/public-types";
import { getServerSession, getSupabaseServerClient } from "@/lib/supabase/supabase-client-server";
import { logError } from "@/lib/utils/error-utils";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession();
  const account = await getAccount();

  if (!session || !account) {
    return redirect("/error");
  }

  return <Settings isDealer={session.isDealer} account={account}></Settings>;
}

async function getAccount(): Promise<Account | undefined> {
  const { data, error } = await getSupabaseServerClient().from("accounts").select().single();

  if (error) {
    return logError(error, "Can't get account");
  }

  return data;
}
