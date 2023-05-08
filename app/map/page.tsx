import LocationAndFilter from "@/app/map/LocationAndFilter";
import { getCategories } from "@/lib/supabase/category-service";

export default async function MapPage() {
  const categories = await getCategories();

  return (
    <>
      <LocationAndFilter categories={categories} />
      <div id="map" className="h-[calc(100vh-6rem)] w-screen"></div>
    </>
  );
}
