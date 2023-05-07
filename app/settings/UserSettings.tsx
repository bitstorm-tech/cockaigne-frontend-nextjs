"use client";
import AccountSettings from "@/app/settings/AccountSettings";
import ProfileImageSettings from "@/app/settings/ProfileImageSettings";
import { Account } from "@/lib/supabase/public-types";
import { useEffect, useState } from "react";

type UserSettingsProps = {
  account: Account;
  profileImageUrl: string;
};

export default function UserSettings({ account, profileImageUrl }: UserSettingsProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(profileImageUrl);
  const [username, setUsername] = useState(account.username);

  useEffect(() => setUsername(account.username), [account]);

  return (
    <>
      <div className="tabs">
        <button onClick={() => setTabIndex(0)} className={`tab-bordered tab grow ${tabIndex === 0 && "tab-active"}`}>
          Allgemein
        </button>
        <button onClick={() => setTabIndex(1)} className={`tab-bordered tab grow ${tabIndex === 1 && "tab-active"}`}>
          Profilbild
        </button>
      </div>
      {tabIndex === 0 ? (
        <AccountSettings account={account} />
      ) : (
        <ProfileImageSettings profileImageUrl={profileImageUrl} userId={account.id} />
      )}
    </>
  );
}
