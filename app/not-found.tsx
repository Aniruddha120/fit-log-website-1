import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-1 items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl rounded-lg border border-white/5 bg-card px-6 py-14 text-center sm:px-10">
        <Dumbbell className="mx-auto size-10 text-accent" aria-hidden="true" />
        <p className="mt-5 font-display text-7xl font-bold leading-none text-accent">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide text-white">
          Page not found
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          This route is not in the log. The lift you are looking for may have
          moved.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to workouts
          </Link>
          <Link
            href="/my-plan"
            className="inline-flex items-center justify-center rounded-sm border border-white/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-accent/60 hover:text-accent"
          >
            My Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
