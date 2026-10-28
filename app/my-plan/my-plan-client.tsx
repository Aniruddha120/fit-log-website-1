"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  Clock,
  Flame,
  Loader2,
  RefreshCw,
  Star,
  X,
} from "lucide-react";
import { useFitLog } from "@/components/providers";
import { SortSelect } from "@/components/sort-select";
import { sortWorkouts, type SortKey, type Workout } from "@/lib/fitlog";

type Tab = "plan" | "saved";

export default function MyPlanContent() {
  const {
    plan,
    saved,
    loading,
    error,
    reload,
    doneIds,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useFitLog();
  const [tab, setTab] = useState<Tab>("plan");
  const [sort, setSort] = useState<SortKey>("duration");

  const metrics = useMemo(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce((total, workout) => total + workout.duration, 0),
      calories: plan.reduce((total, workout) => total + workout.caloriesBurned, 0),
    }),
    [plan],
  );

  const activeList = tab === "plan" ? plan : saved;
  const sortedList = useMemo(() => sortWorkouts(activeList, sort), [activeList, sort]);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <section>
        <h1 className="font-display text-3xl font-semibold uppercase tracking-wide text-white">
          My Plan
        </h1>
        <p className="mt-1 text-sm text-muted">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </section>

      <section
        aria-label="Plan summary"
        className="mt-6 grid grid-cols-3 divide-x divide-white/5 rounded-md bg-surface"
      >
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Exercises
          </p>
          <p className="mt-1 font-display text-3xl font-medium tabular-nums text-white sm:text-4xl">
            {metrics.exercises}
          </p>
        </div>
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Minutes
          </p>
          <p className="mt-1 font-display text-3xl font-medium tabular-nums text-white sm:text-4xl">
            {metrics.minutes}
          </p>
        </div>
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Calories
          </p>
          <p className="mt-1 font-display text-3xl font-medium tabular-nums text-white sm:text-4xl">
            {metrics.calories}
          </p>
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Plan lists"
          className="flex w-fit items-center gap-1 rounded-full bg-[#151921] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "plan"}
            onClick={() => setTab("plan")}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              tab === "plan"
                ? "bg-[#1f242d] text-white"
                : "text-muted hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "saved"}
            onClick={() => setTab("saved")}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              tab === "saved"
                ? "bg-[#1f242d] text-white"
                : "text-muted hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <section className="mt-5" aria-label={tab === "plan" ? "Today's plan" : "Saved workouts"}>
        {loading ? (
          <div aria-busy="true" aria-live="polite">
            <p className="flex items-center gap-2 text-sm text-muted">
              <Loader2 className="size-4 animate-spin text-accent" aria-hidden="true" />
              Loading workouts…
            </p>
            <div className="mt-4 space-y-3">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[114px] animate-pulse rounded-md border border-white/5 bg-card-alt"
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="rounded-md border border-white/10 bg-card p-8 text-center">
            <p className="font-display text-xl uppercase tracking-wide text-white">
              Could not load your workouts
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">{error}</p>
            <button
              type="button"
              onClick={reload}
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black"
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        ) : sortedList.length === 0 ? (
          <div className="rounded-md border border-white/5 bg-[#111317] px-6 py-16 text-center">
            <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-white">
              Nothing here yet
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              {tab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "Save a lift for later and it will show up here."}
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {sortedList.map((workout) => (
              <li key={workout.id}>
                <PlanRow
                  workout={workout}
                  done={doneIds.includes(workout.id)}
                  tab={tab}
                  onRemove={
                    tab === "plan" ? removeFromPlan : removeFromSaved
                  }
                  onDone={markAsDone}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function PlanRow({
  workout,
  done,
  tab,
  onRemove,
  onDone,
}: {
  workout: Workout;
  done: boolean;
  tab: Tab;
  onRemove: (id: number) => void;
  onDone: (id: number) => void;
}) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-md border border-white/5 bg-card-alt p-4 transition-opacity sm:flex-row sm:items-center ${
        done ? "opacity-60" : ""
      }`}
    >
      <div className="h-20 w-full shrink-0 overflow-hidden rounded bg-[#1f2937] sm:w-36">
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-base font-semibold uppercase tracking-wide text-white ${
            done ? "line-through decoration-accent/70" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="mt-0.5 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-accent" aria-hidden="true" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="size-3.5 text-accent" aria-hidden="true" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-sm border border-white/15 px-3 py-2 text-xs font-medium text-white transition-colors hover:border-accent/60 hover:text-accent"
        >
          View Details
        </Link>

        {tab === "plan" && (
          <button
            type="button"
            onClick={() => onDone(workout.id)}
            disabled={done}
            className="inline-flex items-center gap-1.5 rounded-sm bg-accent px-3 py-2 text-xs font-bold text-black transition-opacity hover:opacity-90 disabled:cursor-default disabled:bg-accent/15 disabled:text-accent"
          >
            <Check className="size-3.5" aria-hidden="true" />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          aria-label={`Remove ${workout.name}`}
          className="flex size-8 items-center justify-center rounded-sm border border-white/15 text-muted transition-colors hover:border-red-400/60 hover:text-red-400"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
