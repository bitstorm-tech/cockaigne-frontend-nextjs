import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { Position } from "@/lib/geo/geo.types";
import { useState } from "react";

export type SearchResult = {
  location: Position;
  address: string;
};

type NominatimSearchResult = {
  lat: number;
  lon: number;
  display_name: string;
};

type Props = {
  address?: string;
  disabled?: boolean;
  onAddressSelected: (result: SearchResult) => void;
};

export default function AddressSearch({ address = "", disabled = false, onAddressSelected }: Props) {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<NominatimSearchResult[]>([]);

  // onMount(() => document.body.addEventListener("click", closeSearchResult));
  // onCleanup(() => document.body.removeEventListener("click", closeSearchResult));

  // createEffect(() => setSearchText(props.address || ""));

  async function search() {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`;
    const response = await fetch(url);
    if (response.ok) {
      const addresses = await response.json();
      if (addresses.length === 0) {
        return;
      }

      if (addresses.length === 1) {
        selectSearchResult(addresses[0]);
        return;
      }

      setSearchResult(addresses);
    }
  }

  function closeSearchResult() {
    setSearchResult([]);
  }

  function selectSearchResult(searchResult: NominatimSearchResult) {
    const location: Position = {
      latitude: searchResult.lat,
      longitude: searchResult.lon
    };

    onAddressSelected({ location, address: searchResult.display_name });
  }

  return (
    <>
      <Textarea
        label="Adresse"
        value={searchText}
        onEnter={search}
        onChange={setSearchText}
        disabled={disabled}
        resize={false}
        lines={2}
      />
      <ul
        className={`dropdown-content textarea-bordered textarea absolute z-10 mr-8 mt-8 max-h-[70%] overflow-auto bg-primary p-4 ${
          searchResult.length < 2 && "invisible"
        }`}
      >
        {searchResult.map((result, index) => (
          <>
            <li className="cursor-pointer hover:bg-base-100" onClick={() => selectSearchResult(result)}>
              {result.display_name}
            </li>
            {index < searchResult.length - 1 && <div className="divider"></div>}
          </>
        ))}
      </ul>
      <Button onClick={search} disabled={disabled}>
        Suchen
      </Button>
    </>
  );
}
