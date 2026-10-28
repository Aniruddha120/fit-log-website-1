import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-panel">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="" width={20} height={20} className="size-5" />
          <span className="font-display text-sm font-semibold tracking-[0.12em] text-white">
            FITLOG
          </span>
        </Link>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
