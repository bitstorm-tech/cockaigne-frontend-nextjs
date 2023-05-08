import Button from "@/components/ui/Button";
import CrosshairIcon from "@/components/ui/icons/CrosshairIcon";
import FilterIcon from "@/components/ui/icons/FilterIcon";
import LocationIcon from "@/components/ui/icons/LocationIcon";
import { jumpToCurrentLocation } from "@/lib/utils/map-service";

export default function MapPage() {
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
      <div id="map" className="h-[calc(100vh-6rem)] w-screen"></div>
      <LocationSettingsModal />
      <DealFilterModal />
    </>
  );
}
