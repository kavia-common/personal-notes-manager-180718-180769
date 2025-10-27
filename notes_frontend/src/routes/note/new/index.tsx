import { $, component$, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Header } from "~/components/Header";
import { Sidebar } from "~/components/Sidebar";
import { NoteEditor } from "~/components/NoteEditor";
import { useNotesStore } from "~/services/notesStorage";

/**
 * Create note page
 */
// PUBLIC_INTERFACE
export default component$(() => {
  const store = useNotesStore();

  useTask$(() => {
    store.load();
  });

  const handleSave$ = $((n: { title: string; content: string }) => {
    const created = store.upsert({ title: n.title, content: n.content, id: undefined });
    if (typeof location !== "undefined") {
      const id = (created as any).id;
      location.href = `/note/${id}`;
    }
  });

  return (
    <div class="ocean-app">
      <Header />
      <div class="ocean-content">
        <Sidebar />
        <main class="main-area">
          <NoteEditor note={null} onSave$={handleSave$} onCancelHref="/" />
        </main>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "New Note - Personal Notes Manager",
};
