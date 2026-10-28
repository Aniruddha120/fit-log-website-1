"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/components/providers";
import { Suspense } from "react";

const LINKS = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

function NavbarCore() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/workout") : pathname === href;

  const navLinks = (
    <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-2">
      {LINKS.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-2 text-xs font-medium transition-colors sm:text-[13px] ${
              active
                ? "bg-[#1a2312] text-accent"
                : "text-muted hover:bg-white/5 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/95 backdrop-blur">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 lg:h-20">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="FitLog home"
          >
            <img src="/logo.png" alt="" width={28} height={28} className="size-7" />
            <span className="font-display text-xl font-semibold tracking-[0.12em] text-white">
              FITLOG
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/my-plan"
              aria-label={`Today's plan: ${plan.length} workouts`}
              className="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
            >
              <span>Plan</span>
              <span className="rounded-full bg-black/15 px-1.5 py-0.5 tabular-nums">
                {plan.length}
              </span>
            </Link>
            <Link
              href="/my-plan"
              aria-label={`Saved workouts: ${saved.length}`}
              className="flex items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted transition-colors hover:border-accent/60 hover:text-white"
            >
              <span>Saved</span>
              <span className="rounded-full px-1 py-0.5 tabular-nums text-accent">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1 pb-3 md:hidden">{navLinks}</div>
      </div>
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/95 backdrop-blur">
          <div className="mx-auto h-16 w-full max-w-[1280px] px-4 sm:px-6 lg:h-20 lg:px-8" />
        </header>
      }
    >
      <NavbarCore />
    </Suspense>
  );
}
