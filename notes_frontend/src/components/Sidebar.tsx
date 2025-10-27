import { component$ } from "@builder.io/qwik";

/**
 * Sidebar with navigation links.
 */
// PUBLIC_INTERFACE
export const Sidebar = component$(() => {
  return (
    <aside class="sidebar card" aria-label="Sidebar">
      <div class="nav-group" role="navigation" aria-label="Main navigation">
        <a class="btn" href="/" aria-label="All notes">All Notes</a>
        <a class="btn" href="/note/new" aria-label="Create new note">Create New</a>
      </div>
    </aside>
  );
});
