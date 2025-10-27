import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Header } from "~/components/Header";
import { Sidebar } from "~/components/Sidebar";
import { NoteEditor } from "~/components/NoteEditor";
import { useNotesStore, findNoteById } from "~/services/notesStorage";

/**
 * Edit note page
 */
// PUBLIC_INTERFACE
export default component$(() => {
  const store = useNotesStore();
  const loc = useLocation();
  const noteId = loc.params["id"];
  const ready = useSignal(false);

  useTask$(() => {
    store.load();
    ready.value = true;
  });

  const note = findNoteById(store.notes, noteId);

  const handleSave$ = $((n: { title: string; content: string }) => {
    store.upsert({ id: noteId, title: n.title, content: n.content });
    if (typeof location !== "undefined") {
      location.href = "/";
    }
  });

  return (
    <div class="ocean-app">
      <Header />
      <div class="ocean-content">
        <Sidebar />
        <main class="main-area">
          {!ready.value ? (
            <div class="card" style={{ padding: "16px" }}>Loading…</div>
          ) : note ? (
            <NoteEditor note={note} onSave$={handleSave$} onCancelHref="/" />
          ) : (
            <div class="card" style={{ padding: "16px" }}>
              Note not found.
              <div style={{ marginTop: "10px" }}>
                <a class="btn" href="/">Back to list</a>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Edit Note - Personal Notes Manager",
};
