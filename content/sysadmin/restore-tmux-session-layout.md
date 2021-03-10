---
path: restore-tmux-session-layout
title: Restore tmux session and layout
description: save and restore tmux session and window layout after systems restarts
date: 2020-05-13
status: draft
---

You can use tmux plugins

- tmux-resurrect
- tmux-continuum

`tmux-continuum` is the newer plugin by the author of `tmux-resurrect`

### Install Tmux Plugin Manager (tpm)

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

```bash
# List of plugins
set -g @plugin 'tmux-plugins/tpm'
#set -g @plugin 'tmux-plugins/tmux-sensible'

set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'

# Other examples:
# set -g @plugin 'github_username/plugin_name'
# set -g @plugin 'git@github.com/user/plugin'
# set -g @plugin 'git@bitbucket.com/user/plugin'

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run -b '~/.tmux/plugins/tpm/tpm'
```

```bash
# Reload TMUX environment so TPM is sourced
tmux source ~/.tmux.conf
```

Hit `prefix + I` to fetch the plugin and source it. The plugin will automatically start "working" in the background, no action required.

## Link

- [Save and reopen tmux session](https://forum.upcase.com/t/save-and-reopen-tmux-session/5224/2)
- [How to Manage and Restore Tmux Sessions in Linux](https://www.maketecheasier.com/manage-restore-tmux-sessions-linux/)
- [Tmux Plugin Manager](https://github.com/tmux-plugins/tpm)
- [tmux-continuum](https://github.com/tmux-plugins/tmux-continuum)

- [How to start tmux with several panes open at the same time?](https://askubuntu.com/questions/830484/how-to-start-tmux-with-several-panes-open-at-the-same-time)
- [StackOverflow: How to set up tmux so that it starts up with specified windows opened?](https://stackoverflow.com/questions/5609192/how-to-set-up-tmux-so-that-it-starts-up-with-specified-windows-opened)
- [Start up tmux with custom windows, panes and applications running](https://gist.github.com/todgru/6224848)
