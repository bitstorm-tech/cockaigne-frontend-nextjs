import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

type Props = {
  show: boolean;
  title: string;
  imageUrls: string[];
  startIndex: number;
};

export default function ImageZoomModal({ show, title, imageUrls, startIndex }: Props) {
  const [visible, setVisible] = useState(show);
  const [index, setIndex] = useState(0);

  function next() {
    index === imageUrls.length - 1 ? setIndex(0) : setIndex(index + 1);
  }

  function previous() {
    index === 0 ? setIndex(imageUrls.length - 1) : setIndex(index - 1);
  }

  return (
    <Modal show={visible} onClose={() => setVisible(false)} onShow={() => setIndex(startIndex)}>
      <div className="flex max-h-[75vh] flex-col gap-3">
        <div className="overflow-auto">
          <img loading="lazy" src={imageUrls[index]} alt="Dealer shop impression or deal images" />
        </div>
        <div className="flex items-center text-[#fff4eb]">
          <Button onClick={previous} circle>
            &lt;
          </Button>
          <div className="flex grow flex-col text-center">
            <p>{title}</p>
            <p className="text-xs">
              ({index + 1}/{imageUrls.length})
            </p>
          </div>
          <Button onClick={next} circle>
            &gt;
          </Button>
        </div>
      </div>
    </Modal>
  );
}
