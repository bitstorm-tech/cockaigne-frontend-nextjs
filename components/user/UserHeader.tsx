import LocationIcon from "@/components/ui/icons/LocationIcon";
import DealsBadge from "@/components/user/DealsBadge";
import FavoriteDealerBadge from "@/components/user/FavoriteDealerBadge";
import HotsBadge from "@/components/user/HotsBadge";
import ProfileImage from "@/components/user/ProfileImage";

export default function UserHeader({ username = "", address = [] }) {
  return (
    <div className="flex justify-between text-[#dbdce6]">
      <div className="flex w-full justify-between">
        <div className="m-4 flex flex-col gap-4 pt-2">
          <div className="flex gap-1.5 fill-current text-[#69828c]">
            <DealsBadge number={1} />
            <HotsBadge number={2} />
            <FavoriteDealerBadge number={3} />
          </div>
          <span className="text-2xl">{username}</span>
          <span className="flex flex-col gap-2 text-sm">
            <b>Dein Standort</b>
            <span className="flex gap-1">
              <LocationIcon size={1.5} />
              <div className="flex flex-col text-xs">
                {/*<For each={address()}>{(addressItem) => <i>{addressItem}</i>}</For>*/}
              </div>
            </span>
          </span>
        </div>
        <div className="-mt-6 mr-14 flex flex-col">
          <div className="h-24 w-24">
            {/* @ts-expect-error Server Component */}
            <ProfileImage />
          </div>
        </div>
      </div>
    </div>
  );
}
