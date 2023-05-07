import { supabase } from "@/lib/supabase/supabase-client";
import { translateError } from "@/lib/utils/error-utils";

export interface Session {
  userId?: string;
  isDealer: boolean;
}

export async function getSession(): Promise<Session | undefined> {
  const { error, data } = await supabase.auth.getSession();

  if (error || !data.session) {
    if (error) {
      console.error("Can't get session:", error?.message);
    }

    return;
  }

  return {
    userId: data.session.user.id,
    isDealer: data.session.user.user_metadata.isDealer
  };
}

export async function login(email: string, password: string): Promise<string | undefined> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("Can't login:", error.message);
    return translateError(error);
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Can't logout:", error.message);
  }
}

export async function getUserId(): Promise<string | undefined> {
  const session = await getSession();
  return session?.userId;
}
