
"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, User, X, LogOut, LogIn, UserPlus, Search, ShoppingBag, Plus, PanelsTopLeft, CalendarPlus, Heart } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { label: "Home", href: "/", active: true },

  { label: "Categories", href: "/categories" },

  { label: "How It Works", href: "/#how-it-works" },

  { label: "About Us", href: "/#about-us" },

  // { label: "Contact Us", href: "/#contact-us" },

];

export function Navbar() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const headerRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } finally {
      window.location.reload();
    }
  };

  // Close the mobile menu when clicking/tapping outside the navbar
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-[#12121a]/90 text-white backdrop-blur-md">
      <nav className="relative mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          aria-label="Wanderlast home"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <span aria-hidden className="size-2 rounded-full bg-[#e61a4f]" />
          <span className="text-xl font-extrabold uppercase tracking-wide text-white sm:text-[22px] sm:leading-none">
            Studio.ora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-sm font-semibold lg:flex">
          {navLinks.map(({ label, href, active }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Link
                href={href}
                className={
                  active
                    ? "text-[#e61a4f]"
                    : "text-white/80 transition-colors hover:text-white"
                }
              >
                {label}
              </Link>
              <span aria-hidden className="text-xs font-bold text-[#e61a4f]">
                {active ? "•" : "»"}
              </span>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Saved (heart icon) */}
          <Link
            href="/saved"
            aria-label="Saved studios"
            className="text-white/80 transition-colors hover:text-[#e61a4f]"
          >
            <Heart className="size-5" aria-hidden />
          </Link>
          

          {/* Account */}
          {!user ? (
            <Popover open={accountOpen} onOpenChange={setAccountOpen}>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    aria-label="Account menu"
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    <User className="size-5" aria-hidden />
                  </button>
                }
              />

              <PopoverContent align="end" className="w-48 p-2">
                <div className="space-y-1">
                  <Link
                    href="/login"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    <LogIn className="size-4" aria-hidden />
                    Login
                  </Link>

                  <Link
                    href="/sigin"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    <UserPlus className="size-4" aria-hidden />
                    Sign Up
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Popover open={accountOpen} onOpenChange={setAccountOpen}>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                  >
                    <Avatar className="size-8">
                      {user.image ? (
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={user.image}
                          alt={user?.name?.charAt(0)?.toUpperCase() || "U"}
                        />
                      ) : null}
                      <AvatarFallback className="bg-[#e61a4f] text-white">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                    </Avatar>
                    <span className="hidden text-sm font-semibold xl:inline">
                      {user.name || "User"}
                    </span>
                  </button>
                }
              />

              <PopoverContent align="end" className="w-64">
                <PopoverHeader>
                  <PopoverTitle>
                    {user.name || "User"}
                  </PopoverTitle>

                  <PopoverDescription>
                    {user.email}
                  </PopoverDescription>
                </PopoverHeader>

                <div className="mt-3 space-y-2 border-t pt-3">
                  <Link href="/profile" onClick={() => setAccountOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <User className="mr-2 size-4" />
                      Profile
                    </Button>
                  </Link>

                  <Link href="/add-destination" onClick={() => setAccountOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Plus className="mr-2 size-4" />
                      Add New Space
                    </Button>
                  </Link>

                  <Link href="/my-listings" onClick={() => setAccountOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <PanelsTopLeft className="mr-2 size-4" />
                      My Studio Listings
                    </Button>
                  </Link>

                  <Link href="/my-bookings" onClick={() => setAccountOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <CalendarPlus className="mr-2 size-4" />
                      My Bookings
                    </Button>
                  </Link>

                  <Link href="/saved" onClick={() => setAccountOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Heart className="mr-2 size-4" />
                      Saved
                    </Button>
                  </Link>
                </div>

                <div className="mt-2 border-t pt-3">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 size-4" />
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-white lg:hidden"
          >
            {open ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-[#12121a] shadow-lg lg:hidden">

          {/* Navigation Links */}
          <ul className="flex flex-col px-6 py-4 text-[15px] font-semibold text-white/90">
            <li className="pb-2 text-xs font-bold uppercase tracking-wider text-white/40">
              Menu
            </li>

            {navLinks.map(({ label, href, active }) => (
              <li
                key={label}
                className="border-t border-white/10 first:border-t-0"
              >
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-1.5 py-3 ${
                    active
                      ? "text-[#e61a4f]"
                      : "transition-colors hover:text-white"
                  }`}
                >
                  {label}
                  <span aria-hidden className="text-xs font-bold text-[#e61a4f]">
                    {active ? "•" : "»"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Account Links */}
          <ul className="flex flex-col border-t border-white/10 px-6 py-4 text-[15px] font-semibold text-white/90">
            <li className="pb-2 text-xs font-bold uppercase tracking-wider text-white/40">
              Account
            </li>

            {!user ? (
              <>
                <li className="border-t border-white/10">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block py-3 transition-colors hover:text-white"
                  >
                    Login
                  </Link>
                </li>

                <li className="border-t border-white/10">
                  <Link
                    href="/sigin"
                    onClick={() => setOpen(false)}
                    className="block py-3 transition-colors hover:text-white"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="border-t border-white/10">
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-3 transition-colors hover:text-white"
                  >
                    <User className="size-4" />
                    Profile
                  </Link>
                </li>

                <li className="border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 py-3 text-red-400 hover:text-red-300"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
