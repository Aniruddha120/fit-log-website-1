"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const WorkoutDetailContent = dynamic(
  () => import("./workout-detail-client"),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-4 py-24">
        <p className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="size-5 animate-spin text-accent" aria-hidden="true" />
          Loading workout...
        </p>
      </div>
    ),
  },
);

export default function WorkoutDetailPage() {
  return <WorkoutDetailContent />;
}
