# Personal Notes Manager (Qwik)

This is a Qwik City application providing a simple Personal Notes Manager with create, read, update, and delete features.

- Theme: Ocean Professional (blue primary, amber secondary, clean modern UI)
- Persistence: localStorage (service can be swapped for a backend later)
- Routes:
  - `/` notes list, search, quick actions
  - `/note/new` create a new note
  - `/note/:id` edit an existing note

## Development

- Start the dev server on port 3000:
  - `npm start`

## Files of Interest

- `src/styles/theme.css` — Theme and components styling
- `src/components/Header.tsx`, `Sidebar.tsx`, `NoteList.tsx`, `NoteEditor.tsx`
- `src/services/notesStorage.ts` — In-memory/localStorage service with CRUD helpers

## Replace Storage with Backend

Update `src/services/notesStorage.ts` with real API calls and keep the same interface
for `useNotesStore()` to avoid touching other parts of the app.
