import { component$ } from "@builder.io/qwik";

/**
 * App header with brand and quick actions.
 */
// PUBLIC_INTERFACE
export const Header = component$(() => {
  return (
    <header class="header" role="banner">
      <div class="brand" aria-label="App brand">
        <span class="logo" aria-hidden="true" />
        <span>Personal Notes Manager</span>
      </div>
      <nav class="header-actions" aria-label="Header actions">
        <a class="btn" href="/" aria-label="Go to notes list">Notes</a>
        <a class="btn primary" href="/note/new" aria-label="Create new note">New Note</a>
      </nav>
    </header>
  );
});
