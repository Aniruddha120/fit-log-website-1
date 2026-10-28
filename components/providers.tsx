"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, Info } from "lucide-react";
import { fetchWorkouts, type Workout } from "@/lib/fitlog";

type Toast = { id: number; message: string; tone: "success" | "info" };

type FitLogValue = {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  reload: () => void;
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  addToPlan: (id: number) => void;
  saveForLater: (id: number) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
};

const FitLogContext = createContext<FitLogValue | null>(null);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);
  const [requestKey, setRequestKey] = useState(0);

  const toast = useCallback(
    (message: string, tone: Toast["tone"] = "success") => {
      const id = ++toastId.current;
      setToasts((current) => [...current, { id, message, tone }]);
      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== id));
      }, 3200);
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;
    let isFirst = true;

    queueMicrotask(() => {
      if (cancelled || !isFirst) return;
      isFirst = false;
      setWorkouts([]);
      setError(null);
      setLoading(true);
    });

    fetchWorkouts()
      .then((data) => {
        if (!cancelled) {
          setWorkouts(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("We could not load the workout library. Check your connection and try again.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [requestKey]);

  const reload = useCallback(() => setRequestKey((count) => count + 1), []);

  const plan = useMemo(
    () =>
      planIds
        .map((id) => workouts.find((workout) => workout.id === id))
        .filter((workout): workout is Workout => Boolean(workout)),
    [planIds, workouts],
  );

  const saved = useMemo(
    () =>
      savedIds
        .map((id) => workouts.find((workout) => workout.id === id))
        .filter((workout): workout is Workout => Boolean(workout)),
    [savedIds, workouts],
  );

  const addToPlan = useCallback(
    (id: number) => {
      if (planIds.includes(id)) {
        toast("Already in today's plan", "info");
        return;
      }
      setPlanIds((current) => [...current, id]);
      toast("Added to today's plan");
    },
    [planIds, toast],
  );

  const saveForLater = useCallback(
    (id: number) => {
      if (savedIds.includes(id)) {
        toast("Already saved for later", "info");
        return;
      }
      setSavedIds((current) => [...current, id]);
      toast("Saved for later");
    },
    [savedIds, toast],
  );

  const removeFromPlan = useCallback(
    (id: number) => {
      setPlanIds((current) => current.filter((planId) => planId !== id));
      setDoneIds((current) => current.filter((doneId) => doneId !== id));
      toast("Removed from today's plan", "info");
    },
    [toast],
  );

  const removeFromSaved = useCallback(
    (id: number) => {
      setSavedIds((current) => current.filter((savedId) => savedId !== id));
      toast("Removed from saved", "info");
    },
    [toast],
  );

  const markAsDone = useCallback(
    (id: number) => {
      if (doneIds.includes(id)) return;
      setDoneIds((current) => [...current, id]);
      toast("Workout marked as done");
    },
    [doneIds, toast],
  );

  const value: FitLogValue = {
    workouts,
    loading,
    error,
    reload,
    plan,
    saved,
    doneIds,
    addToPlan,
    saveForLater,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    isInPlan: (id) => planIds.includes(id),
    isSaved: (id) => savedIds.includes(id),
    isDone: (id) => doneIds.includes(id),
  };

  return (
    <FitLogContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed bottom-5 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:right-6"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            className="animate-toast-in pointer-events-auto flex items-center gap-3 rounded-md border border-line bg-card px-4 py-3 text-sm text-white shadow-xl"
          >
            {item.tone === "success" ? (
              <CheckCircle2 className="size-4 shrink-0 text-accent" aria-hidden="true" />
            ) : (
              <Info className="size-4 shrink-0 text-accent" aria-hidden="true" />
            )}
            <span>{item.message}</span>
          </div>
        ))}
      </div>
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }
  return context;
}
