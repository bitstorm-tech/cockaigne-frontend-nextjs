import StarIcon from "@/components/ui/icons/StarIcon";

export default function DealsBadge({ number = 0 }) {
  return (
    <span className="badge gap-2 border border-[#2c363a] bg-transparent text-[#69828c]">
      <StarIcon size={0.8} />
      {number}
    </span>
  );
}
