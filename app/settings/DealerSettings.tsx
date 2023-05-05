"use client";

import AddressSettings from "@/app/settings/AddressSettings";
import CategorySelect from "@/components/ui/CategorySelect";
import ImagePicker from "@/components/ui/ImagePicker";
import Input from "@/components/ui/Input";
import { Account, Category } from "@/lib/supabase/public-types";
import { useState } from "react";

type DealerSettingsProps = {
  account: Account;
  onProfileImageChange: (file: File) => void;
  categories: Category[];
};

export default function DealerSettings({ account, onProfileImageChange, categories }: DealerSettingsProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const [username, setUsername] = useState(account.username);
  const [email, setEmail] = useState(account.email);
  const [phone, setPhone] = useState(account.phone || "");
  const [taxId, setTaxId] = useState(account.tax_id || "");
  const [defaultCategory, setDefaultCategory] = useState(account.default_category || 0);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  function handleProfileImageChange(image: File, imageUrl: string) {
    setImagePreviewUrl(imageUrl);
    onProfileImageChange(image);
  }

  return (
    <>
      <div className="tabs">
        <button onClick={() => setTabIndex(0)} className={`tab-bordered tab grow ${tabIndex === 0 && "tab-active"}`}>
          Allgemein
        </button>
        <button onClick={() => setTabIndex(1)} className={`tab-bordered tab grow ${tabIndex === 1 && "tab-active"}`}>
          Adresse
        </button>
        <button onClick={() => setTabIndex(2)} className={`tab-bordered tab grow ${tabIndex === 2 && "tab-active"}`}>
          Profilbild
        </button>
      </div>
      {tabIndex === 0 && (
        <div className="flex flex-col gap-3">
          <Input label="Firmenname" value={username} onChange={(value) => setUsername(value)} />
          <Input label="E-Mail" value={email} disabled />
          <Input label="Telefonnummer" type="tel" value={phone} onChange={(value) => setPhone(value)} />
          <Input label="Umsatzsteuer ID" value={taxId} onChange={(value) => setTaxId(value)} />
          <CategorySelect
            label="Branche"
            categories={categories}
            selected={defaultCategory}
            onSelect={(value) => setDefaultCategory(value)}
          />
        </div>
      )}
      {tabIndex === 1 && <AddressSettings account={account} />}
      {tabIndex === 2 && (
        <ImagePicker
          imagePreviewUrl={imagePreviewUrl}
          onImageSelected={handleProfileImageChange}
          buttonText="Profilbild ändern"
        />
      )}
    </>
  );
}
