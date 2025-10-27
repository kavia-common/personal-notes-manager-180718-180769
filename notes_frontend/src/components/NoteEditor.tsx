import { $, component$, useSignal } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import type { Note } from "./NoteList";

type Props = {
  note?: Note | null;
  onSave$: PropFunction<(n: Omit<Note, "updatedAt">) => void>;
  onCancelHref?: string;
};

/**
 * Editor for creating and editing notes.
 */
// PUBLIC_INTERFACE
export const NoteEditor = component$<Props>((props) => {
  const { note, onCancelHref = "/" } = props;
  const title = useSignal(note?.title ?? "");
  const content = useSignal(note?.content ?? "");

  const handleSave = $(() => {
    props.onSave$({
      id: note?.id ?? "",
      title: title.value.trim(),
      content: content.value,
    });
  });

  return (
    <div class="card" style={{ padding: "16px" }}>
      <div class="editor">
        <input
          aria-label="Note title"
          placeholder="Title"
          class="input title"
          value={title.value}
          onInput$={(e) => (title.value = (e.target as HTMLInputElement).value)}
        />
        <textarea
          aria-label="Note content"
          placeholder="Write your note..."
          class="body"
          value={content.value}
          onInput$={(e) => (content.value = (e.target as HTMLTextAreaElement).value)}
        />
        <div class="editor-actions">
          <a class="btn" href={onCancelHref} aria-label="Cancel editing">
            Cancel
          </a>
          <button class="btn primary" onClick$={handleSave} aria-label="Save note">
            Save
          </button>
        </div>
      </div>
    </div>
  );
});
