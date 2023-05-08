"use client";
import DealFilterModal from "@/app/map/DealFilterModal";
import LocationSettingsModal from "@/app/map/LocationSettingsModal";
import Button from "@/components/ui/Button";
import CrosshairIcon from "@/components/ui/icons/CrosshairIcon";
import FilterIcon from "@/components/ui/icons/FilterIcon";
import LocationIcon from "@/components/ui/icons/LocationIcon";
import { Category } from "@/lib/supabase/public-types";
import { jumpToCurrentLocation } from "@/lib/utils/map-service";
import { useState } from "react";

type Props = {
  categories: Category[];
};

export default function LocationAndFilter({ categories }: Props) {
  const [showLocationSettingsModal, setShowLocationSettingsModal] = useState(false);
  const [showDealFilterModal, setShowDealFilterModal] = useState(false);

  return (
    <>
      <div className="fixed right-1 top-12 z-10 m-3 grid grid-cols-3 gap-2">
        <Button circle onClick={() => setShowLocationSettingsModal(true)}>
          <LocationIcon />
        </Button>
        <Button circle onClick={() => setShowDealFilterModal(true)}>
          <FilterIcon />
        </Button>
        <Button circle onClick={jumpToCurrentLocation}>
          <CrosshairIcon />
        </Button>
      </div>
      <LocationSettingsModal show={showLocationSettingsModal} onClose={() => setShowLocationSettingsModal(false)} />
      <DealFilterModal show={showDealFilterModal} categories={categories} onClose={() => setShowDealFilterModal(false)} />
    </>
  );
}
