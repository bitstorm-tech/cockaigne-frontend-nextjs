"use client";
import Button from "@/components/ui/Button";
import ImagePicker from "@/components/ui/ImagePicker";
import Input from "@/components/ui/Input";
import { Account } from "@/lib/supabase/public-types";
import { useState } from "react";

type UserSettingsProps = {
  account: Account;
  onProfileImageChange: (file: File) => void;
};

export default function UserSettings({ account, onProfileImageChange }: UserSettingsProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [username, setUsername] = useState(account.username);

  async function changePassword() {}

  function handleProfileImageChange(image: File, imageUrl: string) {
    setImagePreviewUrl(imageUrl);
    onProfileImageChange(image);
  }

  async function notify() {
    await Notification.requestPermission();
    new Notification("Hallo Cockaigne User!");
  }

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
        <>
          <Input label="Benutzername" value={username} onChange={setUsername} />
          <Input label="E-Mail" value={account.email} disabled />
          <Button onClick={changePassword}>Passwort ändern</Button>
          <Button onClick={notify}>Notification Test</Button>
        </>
      ) : (
        <ImagePicker
          imagePreviewUrl={imagePreviewUrl}
          onImageSelected={handleProfileImageChange}
          buttonText="Profilbild ändern"
        />
      )}
    </>
  );
}
