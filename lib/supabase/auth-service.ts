import { supabase, translateError } from "@/lib/supabase/supabase-client";

const JWT_KEY = new TextEncoder().encode(process.env.NEXT_PUBLIC_SUPABASE_JWT_KEY);

export interface Session {
  userId?: string;
  isDealer: boolean;
}

export async function getSession(): Promise<Session> {
  const { error, data } = await supabase.auth.getSession();

  if (error || !data.session) {
    if (error) {
      console.error("Can't get session:", error?.message);
    }

    return {
      isDealer: false
    };
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
  return session.userId;
}

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_OUT") {
    const expires = new Date(0).toUTCString();
    document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    // sessionStore.userId = undefined;
  } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    const maxAge = 5 * 24 * 60 * 60; // 5 days
    document.cookie = `my-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    document.cookie = `my-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    // sessionStore.userId = session?.user.id;
    // sessionStore.isDealer = session?.user.user_metadata.isDealer;
  }
});
