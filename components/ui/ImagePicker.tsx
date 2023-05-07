import Button from "@/components/ui/Button";
import { useRef, useState } from "react";

type ImagePickerProps = {
  buttonText: string;
  onImageSelected: (image: File, previewImageUrl: string) => void;
  imagePreviewUrl: string;
  hidePreview?: boolean;
  disabled?: boolean;
};

export default function ImagePicker({
  buttonText = "Bild auswählen",
  onImageSelected,
  imagePreviewUrl = "",
  hidePreview = false,
  disabled = false
}: ImagePickerProps) {
  const [imagePreview, setImagePreview] = useState(imagePreviewUrl);
  let fileInput = useRef<HTMLInputElement>(null);
  let file: File | undefined;

  // @ts-ignore
  function pictureSelected(event) {
    file = event.target.files[0] as File;

    if (!file) {
      return;
    }

    const URL = window.URL || window.webkitURL;
    setImagePreview(URL.createObjectURL(file));
    onImageSelected(file, imagePreview!);
  }

  return (
    <>
      <Button onClick={() => fileInput.current?.click()} disabled={disabled}>
        {buttonText}
      </Button>
      <input ref={fileInput} onChange={pictureSelected} type="file" hidden />
      {imagePreview && !hidePreview && (
        <img loading="lazy" src={imagePreview} alt="Gewähltes Bild" className="w-screen self-center md:w-2/3" />
      )}
    </>
  );
}
