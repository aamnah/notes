---
title: Save project specific tmux layouts with tmuxp
date: 2026-04-14T22:35:08+03:00
uuid: 20260414223508
slug: tmuxp-saved-custom-tmux-layouts
draft: false
description:
tags:
---

## Built-in tmux layouts

tmux has 5 built-in layouts, mapped to `<prefix> Alt+1..5` in this order:

1. `even-horizontal` — panes stacked side-by-side, equal width

   ```
   ┌───────┬───────┬───────┬───────┐
   │       │       │       │       │
   │   1   │   2   │   3   │   4   │
   │       │       │       │       │
   └───────┴───────┴───────┴───────┘
   ```

2. `even-vertical` — panes stacked top-to-bottom, equal height

   ```
   ┌───────────────────────────────┐
   │               1               │
   ├───────────────────────────────┤
   │               2               │
   ├───────────────────────────────┤
   │               3               │
   ├───────────────────────────────┤
   │               4               │
   └───────────────────────────────┘
   ```

3. `main-horizontal` — one large pane on top, smaller ones across the bottom

   ```
   ┌───────────────────────────────┐
   │                               │
   │               1               │
   │                               │
   ├─────────┬──────────┬──────────┤
   │    2    │    3     │    4     │
   └─────────┴──────────┴──────────┘
   ```

4. `main-vertical` — one large pane on the left, smaller ones stacked on the right

   ```
   ┌──────────────────┬────────────┐
   │                  │     2      │
   │                  ├────────────┤
   │        1         │     3      │
   │                  ├────────────┤
   │                  │     4      │
   └──────────────────┴────────────┘
   ```

5. `tiled` — roughly equal-sized grid

   ```
   ┌───────────────┬───────────────┐
   │       1       │       2       │
   ├───────────────┼───────────────┤
   │       3       │       4       │
   └───────────────┴───────────────┘
   ```

You can cycle through these with `<prefix> space`

Note that tmux's "horizontal" / "vertical" refers to the _orientation of the divider line_, not the arrangement of panes. So `even-horizontal` has a horizontal row of panes (with vertical dividers between them), and main-horizontal has the main pane separated from the rest by a horizontal divider.

Run `tmux list-commands | grep select-layout` or see `man tmux` under `select-layout` for the authoritative list.

## Defining a custom layout

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh    # install uv
uv tool install tmuxp                              # install tmuxp
tmuxp load .tmuxp.yaml                             # load layout
```

- if you want a completely custom layout, you can use `tmuxp`. 
- the layout is saved to a YAML file and loaded by name.
- in order to get the layout _string_, build the layout once by hand and then use the `tmux list-windows -F '#{window_layout}'` command to get the string. You will get something like `c2a1,203x50,0,0{...}`.

For example:

```bash
# 3 vertical panes of equal size. last vertical pane is split once horizontally
# ┌─────────┬─────────┬─────────┐
# │         │         │    3    │
# │    1    │    2    ├─────────┤
# │         │         │    4    │
# └─────────┴─────────┴─────────┘     
983f,305x53,0,0{112x53,0,0,1,106x53,113,0,2,85x53,220,0[85x26,220,0,3,85x26,220,27,4]}
```

Drop that string into a `tmuxp.yaml` as the `layout` key. Panes are assigned to the layout slots in order (left-to-right, top-to-bottom):

```yaml
session_name: work
windows:
  - window_name: main
    layout: 983f,305x53,0,0{112x53,0,0,1,106x53,113,0,2,85x53,220,0[85x26,220,0,3,85x26,220,27,4]} # custom layout
    panes:
      - shell_command: nvim
      - shell_command: npm run dev
      - shell_command: htop
      - shell_command: tail -f log
```

Here is the default example

```yaml
session_name: 4-pane-split
windows:
  - window_name: dev window
    layout: tiled # built-in tmux layout
    shell_command_before:
      - cd ~/ # run as a first command in all panes
    panes:
      - shell_command: # pane no. 1
          - cd /var/log # run multiple commands in this pane
          - ls -al | grep \.log
      - echo second pane # pane no. 2
      - echo third pane # pane no. 3
      - echo fourth pane # pane no. 4
```

The examples above are all running a command in each pane. If you don't want to run any commands, then add an empty item with `-`. The total amount of
panes defined with `-` need to match with the amount of panes defined in the layout string. 

You can define multiple commands to run in a pane. e.g. 

```yaml
- shell-command:
  - export NODE_ENV=development
  - nvm use lts
  - npm run dev
```

You can decide which pane gets focus with `focus: true`. e.g. 

```yaml
- shell_command: claude
  focus: true
```

To run a command in all panes:

```yaml
shell_command_before:
  - cd ~/ # run as a first command in all panes
```

Other values you can define: `session_name`, `start_directory`

## Creating a bash command to load the right tmux layout

If you live in tmux, you've probably wished `tmux` would just *know* which layout to start. [tmuxp][tmuxp] already handles the layout part — YAML configs that describe your windows and panes. What's missing is a single command that picks the right config for wherever you are.

Here's a small bash function, `t`, that does exactly that. It grew out of a few rounds of refinement, and each step is worth understanding on its own.

### Step 1: Load a project layout if one exists

The simplest version: if there's a `tmuxp.yaml` in the current directory, load it. Otherwise, fall back to plain `tmux`.

```bash
t() {
  if [[ -f tmuxp.yaml ]]; then
    tmuxp load tmuxp.yaml
  else
    tmux
  fi
}
```

Drop this in your `~/.bashrc` or `~/.zshrc`, source it, and any project folder with a `tmuxp.yaml` now has a one-keystroke launcher.

### Step 2: Fall back to a default layout

Most projects don't have a custom layout — but you probably still want a *consistent* starting shape (say: an editor pane, a shell pane, a log tailer). Save that once in `~/.tmuxp/default.yaml` and have `t` fall back to it:

```bash
t() {
  local default="$HOME/.tmuxp/default.yaml"
  if [[ -f tmuxp.yaml ]]; then
    tmuxp load tmuxp.yaml
  elif [[ -f $default ]]; then
    tmuxp load "$default"
  else
    tmux
  fi
}
```

Now `t` has three modes: project layout, personal default, bare tmux.

A minimal `~/.tmuxp/default.yaml` might look like:

```yaml
windows:
  - window_name: dev
    focus: true
    panes:
      - shell_command: vim
      - shell_command: htop
        focus: true
```

`focus: true` is how you tell tmuxp which pane (and window) to land on when the session attaches.

### Step 3: Name the session after the directory

By default, tmuxp uses whatever `session_name` is in the YAML. That means every project you open via the default config ends up with the *same* session name — annoying if you keep a few open at once.

The fix: pass `-s <name>` to `tmuxp load` (it overrides the YAML's `session_name`), and use `${PWD##*/}` to grab just the current folder name.

```bash
t() {
  local default="$HOME/.tmuxp/default.yaml"
  local name="${PWD##*/}"
  name="${name//[.:]/_}"   # tmux forbids . and : in names

  if [[ -f tmuxp.yaml ]]; then
    tmuxp load -s "$name" tmuxp.yaml
  elif [[ -f $default ]]; then
    tmuxp load -s "$name" "$default"
  else
    tmux new -s "$name"
  fi
}
```

Now each folder gets its own session, named after itself.

### Step 4: Respect an explicit `session_name` in the YAML

Overriding is fine for the default layout, but if a project's `tmuxp.yaml` deliberately sets `session_name`, we should honor it. Only supply `-s` when the file doesn't already name the session:

```bash
t() {
  local default="$HOME/.tmuxp/default.yaml"
  local name="${PWD##*/}"
  name="${name//[.:]/_}"

  _tmuxp_load() {
    local file=$1
    if grep -qE '^\s*session_name\s*:' "$file"; then
      tmuxp load "$file"
    else
      tmuxp load -s "$name" "$file"
    fi
  }

  if [[ -f tmuxp.yaml ]]; then
    _tmuxp_load tmuxp.yaml
  elif [[ -f $default ]]; then
    _tmuxp_load "$default"
  else
    tmux new -s "$name"
  fi
}
```

That's the full function. A quick grep for a top-level `session_name:` decides whether to pass `-s` or not.

### Why this is nice

- **One command, everywhere.** `t` works in any directory.
- **Zero config for most projects.** Put a default layout in `~/.tmuxp/` and forget about it.
- **Per-project overrides are trivial.** Drop a `tmuxp.yaml` in the repo root.
- **Sessions stay distinct.** Each folder becomes its own session by default, but projects can still claim a fixed name when they want one.

### Bonus: named layouts via tmuxp's own discovery

tmuxp auto-discovers any YAML in `~/.tmuxp/`, so alternates are a `tmuxp load <name>` away. `~/.tmuxp/work.yaml` → `tmuxp load work`. Pair that with `t` for the common case and you've got the best of both worlds.



[tmuxp]: https://github.com/tmux-python/tmuxp