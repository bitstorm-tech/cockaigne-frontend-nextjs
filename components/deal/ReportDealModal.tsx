import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import { ActiveDeal } from "@/lib/supabase/public-types";
import { getReport, saveReport } from "@/lib/supabase/report-service";
import { useState } from "react";

type Props = {
  show: boolean;
  deal: ActiveDeal;
  onClose: () => void;
};

export default function ReportDealModal({ show, deal, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState("");
  const [alreadyReported, setAlreadyReported] = useState(false);

  async function open() {
    const report = await getReport(deal.id!);
    if (report) {
      setReason(report.reason);
      setAlreadyReported(true);
    }
    setLoading(false);
  }

  async function save() {
    saveReport(deal.id!, reason).then();
    onClose();
  }

  return (
    <Modal show={show} onShow={open} onClose={onClose}>
      <h2 className="break-words">
        Du willst den Deal <i>{deal.title}</i> melden?
      </h2>
      {alreadyReported ? (
        <div className="flex flex-col gap-3">
          <span className="text-xs">Du hast den Deal bereits mit folgender Nachricht gemeldet:</span>
          <span>{reason}</span>
        </div>
      ) : (
        <Textarea label="Sag uns, was an dem Deal nicht passt" value={reason} onChange={setReason} />
      )}
      <div className="modal-action">
        <Button disabled={reason.length === 0 || alreadyReported} onClick={save}>
          Melden
        </Button>
      </div>
    </Modal>
  );
}
