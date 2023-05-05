import { Database } from "@/lib/supabase/generated-types";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export function getSupabaseServerClient() {
  return createServerComponentSupabaseClient<Database>({ headers, cookies });
}

export interface Session {
  userId?: string;
  isDealer: boolean;
}

export async function getServerSession(): Promise<Session | undefined> {
  const { error, data } = await getSupabaseServerClient().auth.getSession();

  if (error || !data.session) {
    if (error) {
      console.error("Can't get server session:", error?.message);
    }

    return;
  }

  return {
    userId: data.session.user.id,
    isDealer: data.session.user.user_metadata.isDealer
  };
}
