import { create } from "zustand";

type DoneState = {
  done: Record<string, boolean>;
  toggle: (id: string) => void;
  hydrate: () => void;
};

const KEY = "athens-hadar-done";

export const useDone = create<DoneState>((set, get) => ({
  done: {},
  toggle: (id) => {
    const next = { ...get().done, [id]: !get().done[id] };
    set({ done: next });
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  },
  hydrate: () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) set({ done: JSON.parse(raw) as Record<string, boolean> });
    } catch {
      /* ignore */
    }
  },
}));
