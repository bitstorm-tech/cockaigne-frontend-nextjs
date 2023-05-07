import { getUserId } from "@/lib/supabase/auth-service";
import { ReportedDeal } from "@/lib/supabase/public-types";
import { supabase } from "@/lib/supabase/supabase-client";

export async function getReport(dealId: string, userId: string): Promise<ReportedDeal | undefined> {
  if (!userId) {
    console.error("Can't get report without userId");
    return;
  }

  const { data, error } = await supabase.from("reported_deals").select().eq("deal_id", dealId).eq("reporter_id", userId).single();

  if (error) {
    console.error("Can't get report:", error.message);
    return;
  }

  return data;
}

export async function saveReport(dealId: string, userId: string, reason: string) {
  const id = await getUserId();

  if (!userId) {
    console.error("Can't save report without userId");
    return;
  }

  await supabase.from("reported_deals").insert({ deal_id: dealId, reason, reporter_id: userId });
}
