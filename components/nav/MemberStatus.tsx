import { Session } from "@/lib/supabase/auth-service";

export default function MemberStatus({ session }: { session: Session }) {
  return <span className="badge badge-xs bg-primary p-3 text-xs text-[#dde3e4]">{session.userId ? "PRO" : "BASIC"}</span>;
}
