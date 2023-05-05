"use client";

import Button from "@/components/ui/Button";
import WarningIcon from "@/components/ui/icons/WarningIcon";

type AlertProps = {
  show: boolean;
  children: React.ReactNode;
  warning?: boolean;
  onConfirm: () => void;
};

export default function Alert({ show, onConfirm, children, warning = true }: AlertProps) {
  if (!show) {
    return;
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
