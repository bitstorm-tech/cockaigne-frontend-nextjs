"use client";

import AddressSettings from "@/app/settings/AddressSettings";
import Input from "@/components/ui/Input";
import { Account } from "@/lib/supabase/public-types";
import { useState } from "react";

export default function DealerSettings({ accountCopy }: { accountCopy: Account }) {
  const [tabIndex, setTabIndex] = useState(0);
  // const [profileImageUrl] = createResource(() => getProfileImage({ isDealer: true }), { initialValue: "" });

  return (
    <>
      <div className="tabs">
        <button onClick={() => setTabIndex(0)} className="tab-bordered tab grow" class:tab-active={tabIndex() === 0}>
          Allgemein
        </button>
        <button onClick={() => setTabIndex(1)} className="tab-bordered tab grow" class:tab-active={tabIndex() === 1}>
          Adresse
        </button>
        <button onClick={() => setTabIndex(2)} className="tab-bordered tab grow" class:tab-active={tabIndex() === 2}>
          Profilbild
        </button>
      </div>
      {tabIndex === 0 && (
        <div className="flex flex-col gap-3">
          <Input label="Firmenname" value={accountCopy.username} onChange={(value) => setAccountCopy("username", value)} />
          <Input label="E-Mail" value={accountCopy.email} disabled />
          <Input
            label="Telefonnummer"
            type="tel"
            value={accountCopy.phone}
            onChange={(value) => setAccountCopy("phone", value)}
          />
          <Input label="Umsatzsteuer ID" value={accountCopy.tax_id} onChange={(value) => setAccountCopy("tax_id", value)} />
          <CategorySelect label="Branche" onSelect={(value) => setAccountCopy("default_category", value)} />
        </div>
      )}
      {tabIndex === 1 && <AddressSettings />}
      {tabIndex === 2 && (
        <ImagePicker imagePreview={profileImageUrl()} onImageSelected={setNewProfileImage} buttonText="Profilbild ändern" />
      )}
    </>
  );
}
