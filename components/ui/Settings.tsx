"use client";
import Alert from "@/components/ui/Alert";
import { updateAccount } from "@/lib/supabase/account-service";
import { Account } from "@/lib/supabase/public-types";
import { saveProfileImage } from "@/lib/supabase/storage-service";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SettingsProps = {
  account: Account;
  profileImageUrl: string;
};

export default function Settings({ account, profileImageUrl }: SettingsProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [newProfileImageFile, setNewProfileImageFile] = useState<File>();
  // const [accountCopy, setAccountCopy] = useState(account);
  let accountCopy = { ...account };

  // useEffect(() => {
  //   console.log("USE EFFECT!!!!");
  //   setAccountCopy(account);
  // }, [account]);

  async function save() {
    setSaving(true);
    await saveImage();
    const error = await updateAccount(accountCopy);

    if (error) {
      setErrorMessage(error);
    }

    setSaving(false);
  }

  async function saveImage() {
    if (!newProfileImageFile) {
      return;
    }

    const profileImageUrl = await saveProfileImage(account.id, newProfileImageFile);

    if (profileImageUrl) {
      setNewProfileImageFile(undefined);
      return;
    }

    setErrorMessage("Kann Profilbild gerade nicht speichern");
  }

  function confirmError() {
    accountCopy = { ...account };
    // setAccountCopy(account);
    setErrorMessage("");
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      {/*{account.is_dealer ? (*/}
      {/*  // <DealerSettings accountCopy={account} />*/}
      {/*  <h1>Dealer Settings</h1>*/}
      {/*) : (*/}
      {/*  <UserSettings*/}
      {/*    account={accountCopy}*/}
      {/*    profileImageUrl={profileImageUrl}*/}
      {/*    onProfileImageChange={(image) => setNewProfileImageFile(image)}*/}
      {/*    onAccountChange={(account) => (accountCopy = { ...account })}*/}
      {/*  />*/}
      {/*)}*/}
      <Alert show={errorMessage.length > 0} onConfirm={confirmError}>
        {errorMessage}
      </Alert>
    </section>
  );
}
