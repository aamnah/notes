---
title: load content from a github repo for a hugo website as a module
date: 2024-06-25T21:03:21+03:00
uuid: 20240625210321
slug: load-content-from-a-github-repo-for-a-hugo-website-as-a-module
draft: false
description: 
tags: 
---

NOTES: 
- There is an [existing bug](https://github.com/gohugoio/hugo/issues/11458) that will not let you initialize the module if you have an existing `module.toml`. Neither will it let you use any other `hugo mod` commands.
- Use the `apt` package instead of `snap`. It will make your life easier by eliminating weird permission errors with SSH auth


https://gohugo.io/commands/hugo_mod/

In order to load modules, your site needs to be a module itself.

```bash
hugo mod init github.com/aamnah/fazalashfaq.com

# this will create a file called: go.mod
```

```bash
hugo mod init github.com/aamnah/fazalashfaq.com --config module.toml

# this will create a file called: go.mod
```

Define your modules inside `config/_default/module.toml`
```toml
# file: config/_default/module.toml
[[imports]]
  # import the notes repo as a Hugo module
  path = "github.com/aamnah/notes.fazalashfaq.com"
  disable = false

  # mount the imported repo in this location
  [[imports.mounts]]
  # root of repo can be specified with `.`
  # if bringing in a subdirectory, mention the subdriectory path in source
  source = "."
  target = "content/notes"
  excludeFiles = ["README.md"]
```

Add a Hugo module
```bash
hugo mod clean --all
hugo mod get -u
hugo mod get -u github.com/USER_OR_ORG/REPO
hugo mod vendor
```


## Troubleshooting
If you are getting fatal errors related to Git and Username then it is very likely that the module you are trying to import is not _public_, i.e. you're importing a module that is a **private repo**. 

```bash
2:14:49 AM: go: github.com/user/repo@v0.0.0-20240626152414-39076531a1f3: invalid version: git ls-remote -q origin in /opt/build/cache/hugo_cache/modules/filecache/modules/pkg/mod/cache/vcs/96d4f25fe353b629d6aa0e8760275debc948f906cf940669e8b1a5766c08262c: exit status 128:
2:14:49 AM: 	fatal: could not read Username for 'https://github.com': terminal prompts disabled
2:14:49 AM: Confirm the import path was entered correctly.
2:14:49 AM: If this is a private repository, see https://golang.org/doc/faq#git_https for additional information.
```

By default, `go get` uses HTTPS. If `GIT_TERMINAL_PROMPT` is set to `0` or `false` it will not prompt your for Git credentials and fail instead. And if you have 2FA activated for your git provider, then you either need to use a PAT (Personal Access Token) to get the repo over HTTPS or use SSH instead. [Read this](https://go.dev/doc/faq#git_https).

```bash
# Enable prompting for credentials
export GIT_TERMINAL_PROMPT=1
```

```bash
# Mark some repos as private

export GOPRIVATE=github.com/ORG_OR_USER/* 
# OR
go env -w GOPRIVATE=github.com/ORG_OR_USER/* 
```

```bash
# Use SSH versions of repo urls
git config --global --add url."git@github.com:".insteadOf "https://github.com/"
```

```bash
# Specify an access token to be used
FILE="$HOME/.netrc"
USERNAME=""
TOKEN=""

if [ ! -f ${FILE} ]; then
  echo -e "${FILE}" does not exist
  touch ${FILE}
fi 

echo -e "machine github.com login ${USERNAME} password ${TOKEN}" >> ${FILE}
```

