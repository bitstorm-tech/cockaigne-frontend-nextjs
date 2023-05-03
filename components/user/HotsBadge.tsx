import FireIcon from "@/components/ui/icons/FireIcon";

export default function HotsBadge({ number = 0 }) {
  return (
    <span className="badge gap-2 border border-[#2c363a] bg-transparent text-[#69828c]">
      <FireIcon size={0.8} />
      {number}
    </span>
  );
}
