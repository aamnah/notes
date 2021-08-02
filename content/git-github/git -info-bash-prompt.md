---
title: Add git info to Bash prompt
date: 2021-07-28
slug: git -info-bash-prompt
---

On my MacBook i have ZShell and an amazing custom prompt. This is more for my remote Ubuntu servers where i have hosted code and would like the git info in the prompt

```bash
# find your git version and download the files `git-completion.bash` and `git-prompt.sh`
GIT_VERSION=`git version | sed 's/git version //'`

wget -O ~/git-prompt.sh https://raw.githubusercontent.com/git/git/v${GIT_VERSION}/contrib/completion/git-prompt.sh

# one liner
# wget -O ~/git-prompt.sh https://raw.githubusercontent.com/git/git/v$`git version | sed 's/git version //'`/contrib/completion/git-prompt.sh
```

Add the following to the end of your `~/.bashrc`

```bash
# Git prompt
# https://git-scm.com/book/en/v2/Appendix-A:-Git-in-Other-Environments-Git-in-Bash
. ~/git-prompt.sh
export GIT_PS1_SHOWDIRTYSTATE=1
#export PS1='\w$(__git_ps1 " (%s)")\$ '
#export PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u\[\033[00m\]@\[\033[01;32m\]\h\[\033[00m\] \[\033[01;34m\]\w\[\033[00m\] $(__git_ps1 " (%s)") \$ '
export PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u\[\033[00m\]@\[\033[01;32m\]\h\[\033[00m\] \[\033[01;34m\]\w\[\033[00m\] \$ $(__git_ps1 "(%s)") '
```

And then `source ~/.bashrc` for the changes to take effect

## Links

- [A1.6 Appendix A: Git in Other Environments - Git in Bash](https://git-scm.com/book/en/v2/Appendix-A:-Git-in-Other-Environments-Git-in-Bash)
