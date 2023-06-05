---
title: Hugo Modules
date: 2022-11-16
slug: hugo-modules-intro
---

- Hugo modules are **read-only**.
- You can mount any folder from any public remote or local location, including GitHub repos and local folders on your system
- What sort of a module it is determined by the `target` path where it is mounted
- What can be a module? One or more of the 7 component types defined in Hugo: `static`, `content`, `layouts`, `data`, `assets`, `i18n`, and `archetypes`.



### Getting started
- You should be using versions of Go and Hugo that support modules
- Your Hugo site itself needs to be initialized as a module in order for this to work
- _Import_ a module by mentioning its `path`. By default all modules are assumed to be themes.
- _Mount_ a module (or a folder) in a particular location by mention `source` and `target` locations
- `hugo serve` automatically fetches the modules if needed
- `hugo mod vendor` shows the mounted modules in a directory called `_vendor` inside your project root instead of loading them in `cacheDir`

```bash
hugo mod init github.com/aamnah/aamnah.com

# this will create a file called: go.mod
```

```bash
hugo mod vendor
```

### What can i mount as a module?
- Any form of assets. For example: Icon libraries like [Heroicons](https://heroicons.com/) or [Remix Icons](https://remixicon.com/)
- Any form of shared content. For example: documentation for a project
- Any theme or UI framework
- Branding assets
- `archetypes` for creating new content based on templates. For example: archetypes for creating blog posts with pre-filled front matter
- Anything that fits the 7 content types of hugo.




Links
---
- [Master Hugo Modules: Managing Themes As Modules](https://www.hugofordevelopers.com/articles/master-hugo-modules-managing-themes-as-modules/)
- [Master Hugo Modules: Handle Content Or Assets As Modules](https://www.hugofordevelopers.com/articles/master-hugo-modules-handle-content-or-assets-as-modules/)

