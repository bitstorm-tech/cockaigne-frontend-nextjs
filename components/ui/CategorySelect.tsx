import Select from "@/components/ui/Select";
import { Category } from "@/lib/supabase/public-types";

type CategorySelectProps = {
  label?: string;
  onSelect: (value: number) => void;
  selected?: number;
  disabled?: boolean;
  categories: Category[];
};

export default function CategorySelect({
  label = "Kategorie",
  onSelect,
  selected = 0,
  disabled = false,
  categories
}: CategorySelectProps) {
  return (
    <Select
      label={label}
      options={new Map(categories.map((category) => [category.id.toString(), category.name]))}
      selected={selected.toString()}
      onSelect={(value) => onSelect(+value)}
      disabled={disabled}
    />
  );
}
