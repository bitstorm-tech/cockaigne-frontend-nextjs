"use client";
import UserSettings from "@/app/settings/UserSettings";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { updateAccount } from "@/lib/supabase/account-service";
import { Account } from "@/lib/supabase/public-types";
import { saveProfileImage } from "@/lib/supabase/storage-service";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SettingsProps = {
  isDealer: boolean;
  account: Account;
};

export default function Settings({ isDealer, account }: SettingsProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [newProfileImageFile, setNewProfileImageFile] = useState<File>();

  async function save() {
    setSaving(true);
    await saveImage();
    const error = await updateAccount(account);

    if (error) {
      setErrorMessage(error);
    }

    setSaving(false);
  }

  async function saveImage() {
    if (!newProfileImageFile) {
      return;
    }

    const profileImageUrl = await saveProfileImage(newProfileImageFile);

    if (profileImageUrl) {
      setNewProfileImageFile(undefined);
      return;
    }

    setErrorMessage("Kann Profilbild gerade nicht speichern");
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <p>{errorMessage}</p>
      {isDealer ? (
        // <DealerSettings accountCopy={account} />
        <h1>Dealer Settings</h1>
      ) : (
        <UserSettings account={account} onProfileImageChange={(image) => setNewProfileImageFile(image)} />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={save} loading={saving}>
          Speichern
        </Button>
        <Button onClick={() => router.push("/")}>Abbrechen</Button>
      </div>
      {/* @ts-expect-error Server Component */}
      <Alert show={errorMessage.length > 0} onConfirm={() => setErrorMessage("")}>
        {errorMessage}
      </Alert>
    </section>
  );
}
