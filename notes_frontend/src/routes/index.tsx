import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Header } from "~/components/Header";
import { Sidebar } from "~/components/Sidebar";
import { NoteList } from "~/components/NoteList";
import { useNotesStore } from "~/services/notesStorage";

/**
 * Notes list page with search/filter and quick actions.
 */
// PUBLIC_INTERFACE
export default component$(() => {
  const store = useNotesStore();
  const query = useSignal("");

  useTask$(() => {
    // Load once, do not reference non-serializable members in closure
    store.load();
  });

  const onSearchInput = $((e: Event) => {
    const target = e.target as HTMLInputElement;
    query.value = target.value;
  });

  // Compute filtered list in render without passing store methods into $ scopes
  const q = query.value.toLowerCase().trim();
  const notes = q
    ? store.notes.filter((n) => (n.title || "").toLowerCase().includes(q))
    : store.notes;

  return (
    <div class="ocean-app">
      <Header />
      <div class="ocean-content">
        <Sidebar />
        <main class="main-area" aria-label="Notes list">
          <div class="toolbar">
            <input
              aria-label="Search notes"
              class="input"
              placeholder="Search notes by title..."
              value={query.value}
              onInput$={onSearchInput}
            />
            <a href="/note/new" class="btn primary" aria-label="Create note">
              + New Note
            </a>
          </div>

          <NoteList notes={notes} onDelete$={store.remove} />
        </main>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Personal Notes Manager",
  meta: [
    {
      name: "description",
      content: "Create, search, edit, and manage your notes.",
    },
  ],
};
