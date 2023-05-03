import MemberStatus from "@/components/nav/MemberStatus";
import Menu from "@/components/nav/Menu";
import { Session } from "@/lib/supabase/auth-service";
import Link from "next/link";

export default function Header({ session }: { session: Session }) {
  return (
    <>
      <nav className="flex items-center border-b-[0.01rem] border-[#556368] px-4 py-2 md:px-52">
        <div className="flex w-full justify-between text-xl">
          <div className="flex items-end gap-6">
            <Link href="/">
              <img loading="lazy" className="h-7" src="/images/logo.svg" alt="Bildmarke" />
            </Link>
            {session.isDealer || <MemberStatus session={session} />}
          </div>
          <Menu isLoggendIn={!!session.userId} />
          {/*<div className="z-20 flex cursor-pointer text-[#69828c]">*/}
          {/*  {showMenu ? (*/}
          {/*    <button onClick={toggleMenu}>*/}
          {/*      <CrossIcon size={1.85} />*/}
          {/*    </button>*/}
          {/*  ) : (*/}
          {/*    <button onClick={toggleMenu}>*/}
          {/*      <MenuIcon size={1.85} />*/}
          {/*    </button>*/}
          {/*  )}*/}
          {/*</div>*/}
        </div>
      </nav>

      {/*{showMenu && (*/}
      {/*  <div className="absolute z-50 w-screen border-b-[0.01rem] border-[#556368]" onClick={toggleMenu}>*/}
      {/*    */}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
}
