import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/fitlog";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-md border border-white/5 bg-card transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="h-44 overflow-hidden bg-[#1f232b] sm:h-48">
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="mt-1 truncate text-xs text-muted">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 border-t border-white/5 pt-3 text-[11px] text-muted">
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
    </Link>
  );
}
