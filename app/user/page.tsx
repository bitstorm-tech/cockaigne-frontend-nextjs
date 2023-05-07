import UserHeader from "@/components/user/UserHeader";
import UserTabs from "@/components/user/UserTabs";
import { getServerSession, getSupabaseServerClient } from "@/lib/supabase/supabase-client-server";

export default async function UserPage() {
  const username = await getUsername();

  return (
    <>
      <UserHeader username={username} />
      <UserTabs />
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
