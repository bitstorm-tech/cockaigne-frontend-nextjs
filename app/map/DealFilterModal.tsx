import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Modal from "@/components/ui/Modal";
import RangeSelect from "@/components/ui/RangeSelect";
import { saveSearchRadius } from "@/lib/supabase/location-service";
import { Category } from "@/lib/supabase/public-types";
import { debounce } from "lodash";
import { Suspense, useState } from "react";

const saveSearchRadiusDebounce = debounce((radius: number) => saveSearchRadius(radius).then(), 2000);

type Props = {
  show: boolean;
  onClose: () => void;
  categories: Category[];
};

export default function DealFilterModal({ show, onClose, categories }: Props) {
  const [searchRadius, setSearchRadius] = useState(500);

  const button = <Button onClick={onClose}>Übernehmen</Button>;

  // onMount(async () => {
  //   const searchRadius = await getSearchRadius();
  //   setSearchRadius(searchRadius);
  // });

  function onSearchRadiusChange(radius: number) {
    saveSearchRadiusDebounce(radius);
    setSearchRadius(radius);
  }

  return (
    <Modal show={show} buttons={button} onClose={onClose}>
      <div className="m-2 flex max-h-[60vh] flex-col">
        <div className="flex flex-col gap-3">
          <RangeSelect
            label={`Suche im Umkreis von ${searchRadius} m`}
            min={500}
            max={15000}
            step={500}
            value={searchRadius}
            onChange={onSearchRadiusChange}
          />
          {/*<Button small on:click={toggleAllCategories}>Alle Filter aktivieren / deaktivieren</Button>*/}
        </div>
        <hr className="my-4" />
        <div className="flex flex-col gap-x-4 overflow-auto">
          <Suspense>
            {categories.map((category) => (
              <Checkbox key={category.id} label={category.name} onChange={() => {}} checked={true} />
            ))}
          </Suspense>
        </div>
      </div>
    </Modal>
  );
}
