---
title: Hugo Config Directories
date: 2022-11-15
slug: hugo-config-directory-partials
---

- The file is named after a configuration root _object_.
Root objects are the ones that have a single square bracket. For example: `[module]`, `[menu]`, `[Params]` etc. These you can split into their own files, named after the object. For example: `module.toml`, `menu.toml` or `menus.toml`, `params.toml` etc. 
- Since the files are named after the root object, you'd skip mentioning the root object itself, i.e. the config will be top-level.

### Code samples

Here's a chunk of configuration from the `config.toml` file

```toml
# config.toml

[menu]
[[menu.main]]
  name = 'Home'
  pre = "<i class='ri ri-home-line'></i>"
  url = '/'
  weight = -110
  
[[menu.main]]
  name = 'About'
  pre = "<i class='ri ri-aliens-line'></i>"
  url = '/about'
  weight = -110
  
[[menu.main]]
  name = 'Work'
  pre = "<i class='ri ri-apps-line'></i>"
  url = '/work'
  weight = -110
  
[[menu.main]]
  name = 'Contact'
  pre = "<i class='ri ri-mail-unread-line'></i>"
  url = '/contact'
  weight = -110

[module]
[[module.imports]]
path = "github.com/theNewDynamic/gohugo-theme-ananke"
disabled = false

[[module.imports]]
  # import this repo as a Hugo module
  path = "github.com/aamnah/notes"
  disabled = false

  # mount the imported repo in this location
  [[imports.mounts]]
  # root of repo can be specified with `.`
  # if bringing in a subdirectory, mention the subdriectory path in source
  source = "."
  target = "content/notes"
```


This can be split into `module.toml` and `menus.toml` like so:

```toml
# module.toml
[[imports]]
  path = "github.com/theNewDynamic/gohugo-theme-ananke"
  disabled = false

[[imports]]
  # import this repo as a Hugo module
  path = "github.com/aamnah/notes"
  disabled = false

  # mount the imported repo in this location
  [[imports.mounts]]
  # root of repo can be specified with `.`
  # if bringing in a subdirectory, mention the subdriectory path in source
  source = "."
  target = "content/notes"
```

```toml
# menus.toml
[[main]]
  name = 'Home'
  pre = "<i class='ri ri-home-line'></i>"
  url = '/'
  weight = -110
  
[[main]]
  name = 'About'
  pre = "<i class='ri ri-aliens-line'></i>"
  url = '/about'
  weight = -110
  
[[main]]
  name = 'Work'
  pre = "<i class='ri ri-apps-line'></i>"
  url = '/work'
  weight = -110
  
[[main]]
  name = 'Contact'
  pre = "<i class='ri ri-mail-unread-line'></i>"
  url = '/contact'
  weight = -110
```

Here's a YAML sample

```yaml
main:
- name: "Google"
  url: "https://www.google.com"
- name: "Yahoo"
  url: "https://www.yahoo.com"
```


Links
--
- [Configure Hugo](https://gohugo.io/getting-started/configuration/)
- [Configure Modules](https://gohugo.io/hugo-modules/configuration/)
- [Cannot get hugo to cast menu maps](https://discourse.gohugo.io/t/cannot-get-hugo-to-cast-menu-maps/29136/10)