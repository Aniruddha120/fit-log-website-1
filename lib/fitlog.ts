export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export type SortKey = "duration" | "calories" | "rating";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

const API_SOURCES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

const SORT_FIELD: Record<SortKey, keyof Workout> = {
  duration: "duration",
  calories: "caloriesBurned",
  rating: "rating",
};

export async function fetchWorkouts(): Promise<Workout[]> {
  let lastError: unknown;
  for (const url of API_SOURCES) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      const data: unknown = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("The API returned no workouts");
      }
      return data as Workout[];
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("Could not load workouts");
}

export function sortWorkouts(workouts: Workout[], key: SortKey) {
  const field = SORT_FIELD[key];
  return [...workouts].sort(
    (a, b) => Number(b[field]) - Number(a[field]),
  );
}
