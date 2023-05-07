import CrossIcon from "@/components/ui/icons/CrossIcon";
import { useEffect } from "react";

type Props = {
  show: boolean;
  children: React.ReactNode;
  onClose: () => void;
  buttons?: React.ReactNode;
  onShow?: () => void;
};

export default function Modal({ show, children, onClose, buttons, onShow }: Props) {
  useEffect(() => {
    if (show && onShow) onShow();
  }, [show]);

  if (!show) return null;

  return (
    <div className={`modal backdrop-blur-sm ${show && "modal-open"}`}>
      <div className="modal-box">
        <button className="btn-primary btn-sm btn-circle btn absolute right-2 top-2 z-20" onClick={onClose}>
          <CrossIcon size={1.3} />
        </button>
        {children}
        {buttons && <div className="modal-action">{buttons}</div>}
      </div>
    </div>
  );
}
