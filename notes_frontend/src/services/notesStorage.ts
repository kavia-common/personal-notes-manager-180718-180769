import { $, useStore } from "@builder.io/qwik";

export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
};

const STORAGE_KEY = "notes";

/**
 * Read all notes from localStorage
 */
function readAll(): Note[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Note[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persist all notes to localStorage
 */
function writeAll(notes: Note[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/**
 * Create a new ID
 */
function newId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/**
 * PUBLIC_INTERFACE
 * Store hook for managing notes list and actions.
 */
export function useNotesStore() {
  const store = useStore({
    notes: [] as Note[],
    loaded: false,
    load: $(() => {
      if (store.loaded) return;
      store.notes = readAll().sort((a, b) => b.updatedAt - a.updatedAt);
      store.loaded = true;
    }),
    upsert: $((note: { id?: string; title: string; content: string }) => {
      const now = Date.now();
      let updated: Note;
      if (!note.id) {
        updated = {
          id: newId(),
          title: note.title,
          content: note.content,
          updatedAt: now,
        };
        store.notes = [updated, ...store.notes];
      } else {
        const idx = store.notes.findIndex((n) => n.id === note.id);
        if (idx >= 0) {
          updated = { ...store.notes[idx], ...note, updatedAt: now };
          const clone = store.notes.slice();
          clone[idx] = updated;
          // re-sort by updatedAt
          clone.sort((a, b) => b.updatedAt - a.updatedAt);
          store.notes = clone;
        } else {
          updated = {
            id: note.id,
            title: note.title,
            content: note.content,
            updatedAt: now,
          };
          store.notes = [updated, ...store.notes];
        }
      }
      writeAll(store.notes);
      return updated;
    }),
    remove: $((id: string) => {
      store.notes = store.notes.filter((n) => n.id !== id);
      writeAll(store.notes);
    }),
  });

  return store;
}

// PUBLIC_INTERFACE
export function findNoteById(notes: Note[], id: string) {
  return notes.find((n) => n.id === id);
}
