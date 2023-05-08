import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { getCategories } from "@/lib/supabase/category-service";
import { getSearchRadius, saveSearchRadius } from "@/lib/supabase/location-service";
import { debounce } from "lodash";
import { Suspense } from "react";

const saveSearchRadiusDebounce = debounce((radius: number) => saveSearchRadius(radius).then(), 2000);

export default function DealFilterModal() {
  const [categories] = createResource(getCategories);
  const button = <Button onClick={() => setShowDealFilterModal(false)}>Übernehmen</Button>;

  onMount(async () => {
    const searchRadius = await getSearchRadius();
    setSearchRadius(searchRadius);
  });

  function onSearchRadiusChange(radius: number) {
    saveSearchRadiusDebounce(radius);
    setSearchRadius(radius);
  }

  return (
    <Modal show={showDealFilterModal()} buttons={button} onClose={() => setShowDealFilterModal(false)}>
      <div class="m-2 flex max-h-[60vh] flex-col">
        <div class="flex flex-col gap-3">
          <RangeSelect
            label={`Suche im Umkreis von ${searchRadius()} m`}
            min={500}
            max={15000}
            step={500}
            value={searchRadius()}
            onChange={onSearchRadiusChange}
          />
          {/*<Button small on:click={toggleAllCategories}>Alle Filter aktivieren / deaktivieren</Button>*/}
        </div>
        <hr class="my-4" />
        <div class="flex flex-col gap-x-4 overflow-auto">
          <Suspense>
            <For each={categories()}>{(category) => <Checkbox label={category.name} onChange={() => {}} checked={true} />}</For>
          </Suspense>
        </div>
      </div>
    </Modal>
  );
}
