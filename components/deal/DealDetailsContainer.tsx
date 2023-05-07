import CknImage from "@/components/image/Image";
import ImageZoomModal from "@/components/image/ImageZoomModal";
import { ActiveDeal } from "@/lib/supabase/public-types";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  deal: ActiveDeal;
};

export default function DealDetailsContainer({ children, deal }: Props) {
  const [showImageZoomModal, setShowImageZoomModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  function openImageZoomModal(index: number) {
    setImageIndex(index);
    setShowImageZoomModal(true);
  }

  return (
    <div className="flex flex-col justify-between bg-[#323e42] p-2">
      <p>{deal.description}</p>
      <div className="grid grid-cols-3 gap-1 py-2">
        {deal.imageUrls?.map((imageUrl, index) => (
          <CknImage key={imageUrl} url={imageUrl} smallHeight={true} onZoom={() => openImageZoomModal(index)} />
        ))}
      </div>
      {children}
      <ImageZoomModal
        show={showImageZoomModal}
        title={deal.title || ""}
        imageUrls={deal.imageUrls || []}
        startIndex={imageIndex}
      />
    </div>
  );
}
