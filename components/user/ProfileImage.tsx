import { getProfileImage } from "@/lib/supabase/storage-service";

export default async function ProfileImage({ size = 6, isDealer = false }) {
  const style = { height: `${size}rem`, width: `${size}rem` };
  const menuOpen = false;
  const profileImageUrl = await getProfileImage({ isDealer });

  return (
    <div className={`avatar cursor-pointer ${menuOpen && "invisible"}`}>
      <div className="rounded-full ring-2 ring-[#556368]" style={style}>
        <img loading="lazy" src={profileImageUrl} alt="Profile" />
      </div>
    </div>
  );
}
