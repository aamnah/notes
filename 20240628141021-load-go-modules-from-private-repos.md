---
title: Load Go modules from private repos
date: 2024-06-28T14:10:21+03:00
uuid: 20240628141021
slug: load-go-modules-from-private-repos
draft: false
description: 
tags: 
---

### Private repos and non-public modules

By default [`go get` uses HTTPS](https://go.dev/doc/faq#git_https). In a continuous deployment scenario, specially if you have 2FA enabled with your Git provider, you will need to generate a PAT (Personal Access Token) in order to use HTTPS without a prompt, or use SSH instead of HTTPS.

If you're deploying with Netlify and have continuous deployment, you will likely use PAT instead of SSH. 

#### PAT (Personal Access Token) 
- Generate an access token from [Github settings](https://github.com/settings/tokens). It should have _read_ access to your code

```bash
add_github_token() {
  # Add a PAT so that Go can fetch modules from private repos

  GITHUB_USERNAME=""
  GITHUB_PAT=""
  FILE=${HOME}/.netrc

  if [ ! -f ${FILE} ]; then
    log "Creating file: ${FILE}"
    touch ${FILE} 
  fi

  echo -e >> "machine github.com login ${GITHUB_USERNAME} password ${GITHUB_PAT}"
}

add_github_token
```

##### PAT on Netlify
- Save the PAT as an environment variable in Netlify

The value for `$HOME` in Netlify build context is `/opt/buildhome/`. If you create a file at `$HOME/.netrc` it will end up at the location `/opt/buildhome/.netrc`, and not `~/.netrc` or `/home/FOO/.netrc` as you would normally expect

You can set `git config --global` inside a Netlify _build script_. To access a private repo, you can pass your credentials as part of the repo URL. Git repo URLs with credentials look like this:

```
https://<TOKEN>@github.com/<REPO_OWNER>/<REPO_NAME>
https://<USERNAME>:<TOKEN>@github.com/<REPO_PATH>
https://<USERNAME>:<TOKEN>@<SELF_HOSTED_GITLAB_SERVER>/<PATH_TO_REPO>.git
```

You'll replace the values for TOKEN, USERNAME, REPO_NAME, REPO_PATH etc. and the use the final URL to set git config with a `insteadOf` directive. The config command will look like this:

```bash
git config --global --add url.https://${USERNAME}:${TOKEN}@github.com/.insteadof https://github.com/

# or a more specific
git config --global --add url."https://${USERNAME}:${TOKEN}@github.com/${REPO_PATH}".insteadOf "https://github.com/${REPO_PATH}"
```

Note: Both `insteadOf` and `insteadof` (with lowercase 'o') work. Quoting the strings is optional but recommended.

```toml
# netlify.toml
[build]
  command = "./netlify_build.sh"
```

```bash
# netlify_build.sh
settings_for_private_go_modules() {
  REPO_PATH="blah_username/blah_repo"

  # REPO_PATH is a Go module inside a private repo
  # GITHUB_PAT is a Personal Access Token, set as Netlify env var, that has read access for that repo
  # token will expire after the validity period
  git config --global --add url."https://${GITHUB_USERNAME}:${GITHUB_PAT}@github.com/${REPO_PATH}".insteadOf "https://github.com/${REPO_PATH}"
}

settings_for_private_go_modules
```

#### Enforce SSH

Whether you clone a repo over HTTPS or SSH is determined by the repo URL. 

```bash
# HTTPS
https://github.com/USER/BLAH.git
```

```bash
# SSH
git@github.com:USER/BLAH.git
```

In order to force Git to always get the repos over SSH, we can use the `insteadOf` directive in our (global) git config. 


```bash
# Force all URL to be SSH 
git config --global --add url."git@github.com:".insteadOf "https://github.com/"
```

It will add code that looks like this to your `~/.gitconfig`

```bash
[url "git@github.com:"]
 insteadOf = https://github.com/
```

#### GOPRIVATE

You should also set the `GOPRIVATE` variable (go 1.13 onwards)

> The new GOPRIVATE environment variable indicates module paths that are not publicly available. It serves as the default value for the lower-level GONOPROXY and GONOSUMDB variables, which provide finer-grained control over which modules are fetched via proxy and verified using the checksum database. [ref](https://go.dev/doc/go1.13#modules)

```
go env -w GOPRIVATE=github.com/{ORG_NAME/USER_NAME}/*
```

OR Add this to your `~/.bashrc`

```bash
export GOPRIVATE="github.com/{ORG_NAME/USER_NAME}/*"
```

Multiple links can be provided as a comma separated list

```bash
export GOPRIVATE="gitlab.com/FOO,bitbucket.org/FOO,github.com/FOO"
```

You can verify your changes with `go env`


Links
---

- [Using the git config insteadof directive](https://graphite.dev/guides/git-config-insteadof)
- [Netlify Support Forums: could not read Username](https://answers.netlify.com/search?q=could%20not%20read%20Username)
- [How to Use a Private Github Repo as a Go Module](https://medium.com/@joeponzio/how-to-use-a-private-github-repo-as-a-go-module-442fbedc80c9)
- [Go: Private modules](https://go.dev/ref/mod#private-modules)
- https://stackoverflow.com/a/76114722/890814
- https://stackoverflow.com/a/60323360/890814