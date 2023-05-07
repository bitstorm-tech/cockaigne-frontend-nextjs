import ReportDealModal from "@/app/user/ReportDealModal";
import DealDetailsContainer from "@/components/deal/DealDetailsContainer";
import LikeIcon from "@/components/ui/icons/LikeIcon";
import ReportIcon from "@/components/ui/icons/ReportIcon";
import { toggleLike } from "@/lib/supabase/deal-service";
import { ActiveDeal } from "@/lib/supabase/public-types";
import { formatDate } from "@/lib/utils/date-time.utils";
import { useState } from "react";

type Props = {
  deal: ActiveDeal;
};

export default function UserDealDetails({ deal }: Props) {
  const [showReportDealModal, setShowReportDealModal] = useState(false);

  return (
    <DealDetailsContainer deal={deal}>
      <span className="py-4 text-xs">Endet am {formatDate(deal.start!, +deal.duration! * 60)}</span>
      <div className="flex h-6 justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => toggleLike(deal.id!)}>
            <LikeIcon size={1.3} dislike={deal.isLiked} />
          </button>
          <span className="text-lg">{deal.likes}</span>
        </div>
        <button onClick={() => setShowReportDealModal(true)}>
          <ReportIcon size={1.3} />
        </button>
      </div>
      <ReportDealModal show={showReportDealModal} deal={deal} onClose={() => setShowReportDealModal(false)} />
    </DealDetailsContainer>
  );
}
