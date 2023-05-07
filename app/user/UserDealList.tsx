import UserDeal from "@/app/user/UserDeal";
import DealListContainer from "@/components/deal/DealListContainer";
import EmptyContent from "@/components/ui/EmptyContent";
import LoadingSpinner from "@/components/ui/icons/LoadingSpinner";
import { ActiveDeal } from "@/lib/supabase/public-types";
import { useState } from "react";

const loading = (
  <EmptyContent>
    <LoadingSpinner size={3} />
    <span>Mal sehen welche Deals es hier so gibt ...</span>
  </EmptyContent>
);

type Props = {
  deals: ActiveDeal[];
  emptyContent: React.ReactNode;
};

export default function UserDealList({ deals = [], emptyContent }: Props) {
  const [openDetailsIndex, setOpenDetailsIndex] = useState(-1);

  return (
    <DealListContainer>
      {deals.length === 0
        ? emptyContent
        : deals.map((deal, index) => (
            <UserDeal
              key={deal.id}
              deal={deal}
              onClick={() => setOpenDetailsIndex(openDetailsIndex === index ? -1 : index)}
              showDetails={openDetailsIndex === index}
            />
          ))}
    </DealListContainer>
  );
}
