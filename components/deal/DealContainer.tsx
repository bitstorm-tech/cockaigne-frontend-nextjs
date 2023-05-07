import CategoryIcon from "@/components/ui/icons/categories/CategoryIcon";
import { FutureActivePastDeal } from "@/lib/supabase/public-types";
import Link from "next/link";

function ignoreClick(event: MouseEvent) {
  event.stopPropagation();
  event.preventDefault();
}

type Props = {
  deal: FutureActivePastDeal;
  showDetails?: boolean;
  showCompanyName?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
};

export default function DealContainer({
  deal,
  showDetails = false,
  showCompanyName = true,
  onClick,
  children,
  rightAction
}: Props) {
  return (
    <div className="flex items-center">
      <div className="flex grow flex-col">
        {showCompanyName && (
          <div className="flex justify-between bg-[#232b2e] px-2 py-0.5">
            <Link href={`/dealer/${deal.dealer_id}`} className="flex items-center text-[#b2b2b2]">
              {deal.username}
            </Link>
            <Link href={`/dealer/${deal.dealer_id}`} className="text-[#617780]">
              {">>"}
            </Link>
          </div>
        )}
        <div className="flex items-center justify-between bg-[#2c363a]" onClick={onClick}>
          <div className="flex items-center gap-2">
            <CategoryIcon categoryId={deal.category_id || 0} />
            <div className="text-[#fff4eb]">{deal.title}</div>
          </div>
          {/* @ts-ignore */}
          <div onClick={ignoreClick} className="mr-3">
            {rightAction}
          </div>
        </div>
        {showDetails && children}
      </div>
    </div>
  );
}
