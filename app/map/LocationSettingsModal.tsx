import AddressSearch, { SearchResult } from "@/components/ui/AddressSearch";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Modal from "@/components/ui/Modal";
import { addressToString, getAddress } from "@/lib/geo/address-service";
import { startLocationWatching, stopLocationWatching } from "@/lib/geo/location-watcher";
import { getLocation, getUseCurrentLocation, saveLocation, saveUseCurrentLocation } from "@/lib/supabase/location-service";
import { useState } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
};

export default function LocationSettingsModal({ show, onClose }: Props) {
  const [address, setAddress] = useState("");
  const [useCurLocation, setUseCurLocation] = useState(false);

  const button = <Button onClick={onClose}>Übernehmen</Button>;

  async function onShow() {
    setUseCurLocation(await getUseCurrentLocation());
    const location = await getLocation();
    const newAddress = await getAddress(location);

    if (newAddress) {
      setAddress(addressToString(newAddress));
    }
  }

  async function searchCurrentLocation(checked: boolean) {
    setUseCurLocation(checked);
    saveUseCurrentLocation(checked).then();
    checked ? startLocationWatching() : stopLocationWatching();
  }

  async function selectAddress(searchResult: SearchResult) {
    setAddress(searchResult.address);
    // setLocation(searchResult.location);
    await saveLocation(searchResult.location);
  }

  return (
    <Modal show={show} onShow={onShow} onClose={onClose} buttons={button}>
      <div className="m-2 flex flex-col gap-3">
        <AddressSearch address={address} onAddressSelected={selectAddress} disabled={useCurLocation} />
        <Checkbox label="Aktuellen Standort verwenden" checked={useCurLocation} onChange={searchCurrentLocation} />
      </div>
    </Modal>
  );
}
