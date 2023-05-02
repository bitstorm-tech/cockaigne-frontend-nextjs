"use client";

import CrossIcon from "@/components/ui/icons/CrossIcon";
import GearIcon from "@/components/ui/icons/GearIcon";
import LoginIcon from "@/components/ui/icons/LoginIcon";
import LogoutIcon from "@/components/ui/icons/LogoutIcon";
import MenuIcon from "@/components/ui/icons/MenuIcon";
import NewsIcon from "@/components/ui/icons/NewsIcon";
import RegistrationIcon from "@/components/ui/icons/RegistrationIcon";
import LegalFooter from "@/components/ui/nav/LegalFooter";
import Link from "next/link";
import { useState } from "react";

export default function Menu({ isLoggendIn }: { isLoggendIn: boolean }) {
  const [showMenu, setShowMenu] = useState(false);

  async function handleLogout() {}

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <div className="absolute right-2">
      <div className="relative right-2 z-20 flex cursor-pointer text-[#69828c]">
        {showMenu ? (
          <button onClick={toggleMenu}>
            <CrossIcon size={1.85} />
          </button>
        ) : (
          <button onClick={toggleMenu}>
            <MenuIcon size={1.85} />
          </button>
        )}
      </div>
      {showMenu && (
        <div className="relative z-50 flex flex-col gap-8 bg-base-300 p-4" onClick={() => setShowMenu(false)}>
          {isLoggendIn ? (
            <>
              <Link href="/settings" className="flex h-8 items-center gap-3">
                <GearIcon />
                Einstellungen
              </Link>
              <Link href="/changelog" className="flex h-8 items-center gap-3">
                <NewsIcon />
                Was gibt es Neues?
              </Link>
              <button onClick={handleLogout} className="flex h-8 cursor-pointer items-center gap-3">
                <LogoutIcon />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="flex h-8 items-center gap-3">
                <LoginIcon />
                Login
              </Link>
              <Link href="/registration" className="flex h-8 items-center gap-3">
                <RegistrationIcon />
                Registrieren
              </Link>
            </>
          )}
          <div className="mt-8">
            <LegalFooter />
          </div>
        </div>
      )}
    </div>
  );
}
