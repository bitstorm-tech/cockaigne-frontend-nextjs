export default function MemberStatus({ isPro = false }) {
  return <span className="badge badge-xs bg-primary p-3 text-xs text-[#dde3e4]">{isPro ? "CCC" : "BASIC"}</span>;
}
