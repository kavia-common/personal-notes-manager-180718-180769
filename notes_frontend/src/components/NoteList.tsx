import { $, component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
};

type Props = {
  notes: Note[];
  onDelete$: PropFunction<(id: string) => void>;
};

/**
 * Renders the list of notes with actions to view/edit or delete.
 */
// PUBLIC_INTERFACE
export const NoteList = component$<Props>(({ notes, onDelete$ }) => {
  const confirmDelete = $((id: string) => {
    const ok = confirm("Delete this note? This action cannot be undone.");
    if (ok) onDelete$(id);
  });

  if (!notes.length) {
    return (
      <div class="card" style={{ padding: "20px" }} aria-live="polite">
        No notes yet. Click "New Note" to get started.
      </div>
    );
  }

  return (
    <div class="note-list" role="list" aria-label="Notes">
      {notes.map((n) => (
        <div class="note-item" role="listitem" key={n.id}>
          <div>
            <a class="note-title" href={`/note/${n.id}`} aria-label={`Open note ${n.title || "Untitled"}`}>
              {n.title || "Untitled"}
            </a>
            <div class="note-meta">
              Updated {new Date(n.updatedAt).toLocaleString()}
            </div>
          </div>
          <div class="note-actions">
            <a class="btn" href={`/note/${n.id}`} aria-label={`Edit note ${n.title || "Untitled"}`}>Edit</a>
            <button class="btn danger" onClick$={() => confirmDelete(n.id)} aria-label={`Delete note ${n.title || "Untitled"}`}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});
