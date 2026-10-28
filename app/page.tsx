"use client";

import { Suspense, useMemo, useState } from "react";
import { Dumbbell, Loader2, RefreshCw } from "lucide-react";
import { useFitLog } from "@/components/providers";
import { WorkoutCard } from "@/components/workout-card";
import { SortSelect } from "@/components/sort-select";
import { sortWorkouts, type SortKey } from "@/lib/fitlog";

function HomeContent() {
  const { workouts, loading, error, reload } = useFitLog();
  const [sort, setSort] = useState<SortKey>("duration");
  const sortedWorkouts = useMemo(() => sortWorkouts(workouts, sort), [workouts, sort]);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 pb-10 sm:px-6 lg:px-8">
      <section className="mt-6 overflow-hidden rounded-lg bg-card px-6 py-10 sm:px-10 sm:py-14 lg:mt-8 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_334px]">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              Workout Library
            </p>

            <h1 className="mt-4 max-w-[620px] font-display text-[42px] font-bold uppercase leading-[0.98] tracking-tight text-white sm:text-6xl xl:text-[60px]">
              Train with intent. Log every set.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Dumbbell className="size-4" aria-hidden="true" />
              Browse workouts
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-[334px]">
            <div
              className="absolute inset-6 rounded-full bg-accent/20 blur-3xl"
              aria-hidden="true"
            />
            <img
              src="/banner.png"
              alt="Athlete training with dumbbells"
              width={334}
              height={334}
              className="relative h-auto w-full rounded-md object-cover"
            />
          </div>
        </div>
      </section>

      <section id="library" className="scroll-mt-28 pt-12 sm:pt-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-white">
              The Library
            </h2>
            <p className="mt-1 text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        {loading ? (
          <div aria-busy="true" aria-live="polite" className="mt-8">
            <p className="flex items-center gap-2 text-sm text-muted">
              <Loader2 className="size-4 animate-spin text-accent" aria-hidden="true" />
              Loading workouts…
            </p>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[368px] animate-pulse rounded-md border border-white/5 bg-card"
                >
                  <div className="h-48 rounded-t-md bg-white/5" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-16 rounded bg-white/5" />
                    <div className="h-5 w-3/4 rounded bg-white/5" />
                    <div className="h-3 w-1/2 rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="mt-8 rounded-md border border-white/10 bg-card p-8 text-center">
            <p className="font-display text-xl uppercase tracking-wide text-white">
              The library is offline
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">{error}</p>
            <button
              type="button"
              onClick={reload}
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90"
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-4 py-24">
          <p className="flex items-center gap-2 text-sm text-muted">
            <Loader2 className="size-5 animate-spin text-accent" aria-hidden="true" />
            Loading workouts…
          </p>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
