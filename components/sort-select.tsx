"use client";

import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS, type SortKey } from "@/lib/fitlog";

type SortSelectProps = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted">
      <span className="hidden sm:inline">Sort By</span>
      <span className="relative">
        <select
          aria-label="Sort By"
          value={value}
          onChange={(event) => onChange(event.target.value as SortKey)}
          className="appearance-none rounded-md border border-line bg-surface py-2 pl-3 pr-8 text-xs font-medium normal-case tracking-normal text-white outline-none transition-colors focus:border-accent"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </span>
    </label>
  );
}
