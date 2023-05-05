import Input from "@/components/ui/Input";
import { Account } from "@/lib/supabase/public-types";
import { useState } from "react";

type AddressSettingsProps = {
  account: Account;
};

export default function AddressSettings({ account }: AddressSettingsProps) {
  const [street, setStreet] = useState(account.street || "");
  const [houseNumber, setHouseNumber] = useState(account.house_number || "");
  const [city, setCity] = useState(account.city || "");
  const [zip, setZip] = useState(account.zip || 0);

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Input label="Straße" value={street} onChange={(value) => setStreet(value)} />
        </div>
        <Input label="Hausnummer" value={houseNumber} onChange={(value) => setHouseNumber(value)} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Input label="Ort" value={city} onChange={(value) => setCity(value)} />
        </div>
        <Input label="PLZ" type="number" value={zip.toString()} onChange={(value) => setZip(+value)} />
      </div>
    </>
  );
}
