import Button from "@/components/ui/Button";
import WarningIcon from "@/components/ui/icons/WarningIcon";

export default function Alert({
  show,
  children,
  onConfirm,
  warning = true
}: {
  show: boolean;
  children: React.ReactNode;
  warning?: boolean;
  onConfirm: () => void;
}) {
  if (!show) {
    return <></>;
  }

  return (
    <div className="transition:blur toast z-10 mb-14 w-screen">
      <div className={`alert ${warning && "alert-warning"}`}>
        <div className="flex w-full">
          <div>
            <WarningIcon size={2} />
          </div>
          <p>{children}</p>
        </div>
        <Button onClick={onConfirm} small warning={warning}>
          OK
        </Button>
      </div>
    </div>
  );
}
