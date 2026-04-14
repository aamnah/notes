# Agent instructions

## Commits

- Never add a `Co-Authored-By: Claude ...` (or any AI/agent) trailer to commit messages. Write the commit message without it.
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages: `type(scope): subject`, with an optional body and footer. Common types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `perf`, `style`, `build`, `ci`. Mark breaking changes with `!` after the type/scope and a `BREAKING CHANGE:` footer.
- Scope a commit to the directory or file touched (e.g. `docs(sysadmin): add Cisco 3750 config note`, `chore(create_note): ...`) so `git log` stays grep-friendly.

## Creating notes

- Use `create_note.sh` to create new notes — do not `touch` a file manually. The script handles the date-prefixed filename, the frontmatter stub, and drops the file into `uncategorized/`.
- The frontmatter schema is fixed. Every note has these keys, in this order:

  ```yaml
  ---
  title:
  date:
  uuid:
  slug:
  draft: true
  description:
  tags:
  ---
  ```

  Do not add new keys, rename, or drop any — downstream Hugo or Gatsby consumers may break silently. `draft: true` is the Hugo-style convention, chosen deliberately over Gatsby's `status: draft` so both generators work.

- Filenames use a date-prefix convention:
  - New notes: `YYYY-MM-DD-HHMMSS-slug.md` (or `YYYY-MM-DD-HHMMSS.md` when there's no title)
  - Legacy notes: `YYYYMMDDHHMMSS-slug.md` — **do not rename these retroactively**; the UUID in the filename is a stable identifier.

## Organization

- **Category = top-level directory.** A note gets categorized by moving it out of `uncategorized/` into a topic folder (`linux/`, `reactjs/`, `sysadmin/`, etc.). Do not invent nested subcategories.
- Do not create `README.md` or summary/index files inside topic directories. The repo's top-level `README.md` is the only doc.

## Repo role

- This repo is consumed as a **git submodule** by a separate portfolio site (Hugo or Gatsby). Keep it content-only: no build outputs, no generator-specific config, no `node_modules`, nothing that would bloat the submodule for the parent site.

## Voice and editing existing notes

- Notes are written in the first person, casually ("i have setup", "my notes"). Preserve that voice. Do not rewrite existing notes into formal docs or sanitize the tone.
- Do not mass-edit old notes. They are a personal knowledge log, not living documentation. Only touch a note the user has specifically pointed at.
