import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { updateAccount } from "@/lib/supabase/account-service";
import { Account } from "@/lib/supabase/public-types";
import Link from "next/link";
import { useState } from "react";

export default function AccountSettings({ account }: { account: Account }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [accountCopy, setAccountCopy] = useState({ ...account });

  async function changePassword() {}

  async function notify() {
    await Notification.requestPermission();
    new Notification("Hallo Cockaigne User!");
  }

  async function save() {
    setSaving(true);
    const error = await updateAccount(accountCopy);

    if (error) {
      setErrorMessage(error);
    }

    setSaving(false);
  }

  function confirmError() {
    setAccountCopy({ ...account });
    setErrorMessage("");
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <Input
        label="Benutzername"
        value={accountCopy.username}
        onChange={(value) => setAccountCopy({ ...accountCopy, username: value })}
      />
      <Input label="E-Mail" value={account.email} disabled />
      <Button onClick={changePassword}>Passwort ändern</Button>
      <Button onClick={notify}>Notification Test</Button>

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={save} loading={saving}>
          Speichern
        </Button>
        <Link href="/">
          <Button>Abbrechen</Button>
        </Link>
      </div>
      <Alert show={errorMessage.length > 0} onConfirm={confirmError}>
        {errorMessage}
      </Alert>
    </section>
  );
}
