import UserDealDetails from "@/app/user/UserDealDetails";
import DealContainer from "@/components/deal/DealContainer";
import FireIcon from "@/components/ui/icons/FireIcon";
import { toggleHotDeal } from "@/lib/supabase/deal-service";
import { ActiveDeal } from "@/lib/supabase/public-types";

type Props = {
  deal: ActiveDeal;
  showDetails: boolean;
  onClick: () => void;
};

export default function UserDeal({ deal, showDetails = false, onClick = () => {} }: Props) {
  const rightAction = (
    <button className="cursor-pointer" onClick={() => toggleHotDeal(deal.id!)}>
      <FireIcon outline={!deal.isHot} />
    </button>
  );

  return (
    <DealContainer deal={deal} onClick={onClick} showDetails={showDetails} rightAction={rightAction}>
      <UserDealDetails deal={deal} />
    </DealContainer>
  );
}
