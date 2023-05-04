"use client";

import { Database } from "@/lib/supabase/generated-types";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  session: MaybeSession;
};

// @ts-ignore
const Context = createContext<SupabaseContext>();

export default function SupabaseProvider({ children, session }: { children: React.ReactNode; session: MaybeSession }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => useContext(Context);
