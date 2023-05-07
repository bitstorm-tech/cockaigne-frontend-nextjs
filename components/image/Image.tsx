import TrashIcon from "@/components/ui/icons/TrashIcon";

type Props = {
  url: string;
  showDelete?: boolean;
  fixedHeight?: boolean;
  smallHeight?: boolean;
  onZoom?: () => void;
  onDelete?: () => void;
};

export default function CknImage({
  url,
  showDelete = false,
  fixedHeight = false,
  smallHeight = false,
  onZoom = () => {},
  onDelete = () => {}
}: Props) {
  function handleDelete(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    onDelete!();
  }

  return (
    <div className="relative" onClick={onZoom}>
      {showDelete && (
        // @ts-ignore
        <button className="absolute cursor-pointer p-1 text-red-600" onClick={handleDelete}>
          <TrashIcon />
        </button>
      )}
      <img
        loading="lazy"
        className={`object-cover ${fixedHeight && "h-60"} ${smallHeight && "h-36"}`}
        src={url}
        alt="Deal or dealer image"
      />
    </div>
  );
}
