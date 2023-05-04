import UserHeader from "@/components/user/UserHeader";
import UserTabs from "@/components/user/UserTabs";
import { createSupabaseServerClient } from "@/lib/supabase/supabase-client-server";

export default async function UserPage() {
  return (
    <>
      <UserHeader username={await getUsername()} />
      <UserTabs />
    </>
  );
}

async function getUsername(): Promise<string> {
  const { data, error } = await createSupabaseServerClient().from("accounts").select("username").single();

  if (error) {
    console.error("ERROR: can't get username:", error.message);
  }

  return data?.username || "";
}
