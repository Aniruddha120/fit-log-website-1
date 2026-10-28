"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock,
  Dumbbell,
  Flame,
  Gauge,
  Layers,
  Loader2,
  Plus,
  RefreshCw,
  Repeat,
  Star,
} from "lucide-react";
import { useFitLog } from "@/components/providers";

export default function WorkoutDetailContent() {
  const params = useParams();
  const id = String(params?.id ?? "");
  const {
    workouts,
    loading,
    error,
    reload,
    addToPlan,
    saveForLater,
    isInPlan,
    isSaved,
  } = useFitLog();

  const workout = workouts.find((item) => String(item.id) === id);

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-4 py-24">
        <p className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="size-5 animate-spin text-accent" aria-hidden="true" />
          Loading workout…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-md border border-white/10 bg-card p-8 text-center">
          <p className="font-display text-xl uppercase tracking-wide text-white">
            Could not load this workout
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
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-md border border-white/10 bg-card p-10 text-center">
          <p className="font-display text-2xl uppercase tracking-wide text-white">
            Workout not found
          </p>
          <p className="mt-2 text-sm text-muted">
            That lift is not in the library. Head back and pick another one.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to workouts
          </Link>
        </div>
      </div>
    );
  }

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  const specs = [
    { label: "Equipment", value: workout.equipment, icon: Dumbbell },
    { label: "Difficulty", value: workout.difficulty, icon: Gauge },
    { label: "Sets", value: workout.sets, icon: Layers },
    { label: "Reps", value: workout.reps, icon: Repeat },
    { label: "Duration", value: `${workout.duration} min`, icon: Clock },
    { label: "Calories", value: `${workout.caloriesBurned} kcal`, icon: Flame },
    { label: "Rating", value: workout.rating, icon: Star },
  ];

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to workouts
      </Link>

      <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="overflow-hidden rounded-lg border border-white/5 bg-[#171a21]">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full max-h-[735px] w-full object-cover"
          />
        </div>

        <div>
          <h1 className="font-display text-4xl font-semibold uppercase leading-none tracking-wide text-white sm:text-[36px]">
            {workout.name}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-black"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-md bg-spec">
            <dl className="divide-y divide-white/5">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5"
                >
                  <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    <spec.icon className="size-3.5 text-accent" aria-hidden="true" />
                    {spec.label}
                  </dt>
                  <dd className="text-right text-sm font-medium text-white">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <section className="mt-7">
            <h2 className="font-display text-base font-semibold uppercase tracking-[0.16em] text-white">
              Instructions
            </h2>
            <ol className="mt-3 space-y-2.5">
              {workout.instructions.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-bold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addToPlan(workout.id)}
              disabled={inPlan}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90 disabled:cursor-default disabled:bg-accent/15 disabled:text-accent"
            >
              {inPlan ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                <Plus className="size-4" aria-hidden="true" />
              )}
              {inPlan ? "In today's plan" : "Add to today's plan"}
            </button>
            <button
              type="button"
              onClick={() => saveForLater(workout.id)}
              disabled={saved}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent/70 hover:text-accent disabled:border-accent/50 disabled:text-accent"
            >
              {saved ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                <Bookmark className="size-4" aria-hidden="true" />
              )}
              {saved ? "Saved for later" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
