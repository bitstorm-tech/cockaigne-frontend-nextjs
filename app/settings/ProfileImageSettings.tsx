import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import ImagePicker from "@/components/ui/ImagePicker";
import Link from "next/link";
import { useState } from "react";

type ProfileImageSettingsProps = {
  profileImageUrl: string;
};

export default function ProfileImageSettings({ profileImageUrl }: ProfileImageSettingsProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(profileImageUrl);

  function save() {}

  function confirmError() {}

  function handleProfileImageChange(image: File, previewImageUrl: string) {
    setImagePreviewUrl(previewImageUrl);
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <ImagePicker imagePreviewUrl={imagePreviewUrl} onImageSelected={handleProfileImageChange} buttonText="Profilbild ändern" />

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
