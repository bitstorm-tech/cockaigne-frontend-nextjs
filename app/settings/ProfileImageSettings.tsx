import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import ImagePicker from "@/components/ui/ImagePicker";
import Toast from "@/components/ui/Toast";
import { saveProfileImage } from "@/lib/supabase/storage-service";
import Link from "next/link";
import { useState } from "react";

type ProfileImageSettingsProps = {
  userId: string;
  profileImageUrl: string;
};

export default function ProfileImageSettings({ userId, profileImageUrl }: ProfileImageSettingsProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(profileImageUrl);
  const [imageFile, setImageFile] = useState<File>();
  const [showToast, setShowToast] = useState(false);

  async function save() {
    setSaving(true);

    if (!imageFile) {
      return;
    }

    const newProfileImageUrl = await saveProfileImage(userId, imageFile);

    if (newProfileImageUrl) {
      setImagePreviewUrl(newProfileImageUrl);
    } else {
      setErrorMessage("Kann Profilbild gerade nicht speichern, bitte versuche es später nochmal!");
    }

    setSaving(false);
    setImageFile(undefined);
    setShowToast(true);
  }

  function confirmError() {
    setImagePreviewUrl(profileImageUrl);
    setErrorMessage("");
  }

  function handleProfileImageChange(image: File, previewImageUrl: string) {
    setImagePreviewUrl(previewImageUrl);
    setImageFile(image);
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <ImagePicker imagePreviewUrl={imagePreviewUrl} onImageSelected={handleProfileImageChange} buttonText="Profilbild ändern" />

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={save} loading={saving} disabled={!imageFile}>
          Speichern
        </Button>
        <Link href="/">
          <Button>Abbrechen</Button>
        </Link>
      </div>
      <Alert show={errorMessage.length > 0} onConfirm={confirmError}>
        {errorMessage}
      </Alert>
      <Toast show={showToast} onTimout={() => setShowToast(false)}>
        Profilbild wurde erfolgreich geändert
      </Toast>
    </section>
  );
}
