---
title: Hugo modules vs. Git submodules
date: 2022-11-14
slug: hugo-modules-vs-git-submodules
---

Git submodules are cumbersome because: 

- You have to remember to add submodules every time you clone the repo, they are not added by default
- Need extra commits
- Open extra repos in VS Code
- Are annoying to remove

Hugo modules were introduced in [Hugo 0.56.0 (2019)](https://gohugo.io/news/0.56.0-relnotes/). They are better than git submodules, and function like a mix of symlinks and submodules.

Some notes about what all of this is about:

- A new `module` configuration section where you can import almost anything. You can configure both your own file mounts and the file mounts of the modules you import. This is the new recommended way of configuring what you earlier put in `configDir`, `staticDir` etc. And it also allows you to mount folders in non-Hugo-projects, e.g. the SCSS folder in the Bootstrap GitHub project.
- A module consists of a set of mounts to the standard 7 component types in Hugo: `static`, `content`, `layouts`, `data`, `assets`, `i18n`, and `archetypes`. Yes, Theme Components can now include content, which should be very useful, especially in bigger multilingual projects.
- Modules not in your local file cache will be downloaded automatically and even “hot replaced” while the server is running.
- Hugo Modules supports and encourages semver versioned modules, and uses the minimal version selection algorithm to resolve versions.
- A new set of CLI commands are provided to manage all of this: `hugo mod init`, `hugo mod get`, `hugo mod graph`, `hugo mod tidy`, and `hugo mod vendor`.


BY default all modules are treated as a `theme`, so you don't need to specify the mounting path, it'll mount it in the Hugo themes folder. Consequently, you also don't need a `theme` value in your `config.toml` if you're using a module theme


Steps:

1. Your site need to be a Hugo module itself Initialize your Hugo project itself a Hugo module

```bash
hugo mod init github.com/aamnah/aamnah.com

# this will create a file called: go.mod
```

2. Remove stuff you had added as Git submodules that may cause conflicts
3. Initialize your content folders as modules (`content`, `themes`)

https://www.hugofordevelopers.com/articles/master-hugo-modules-managing-themes-as-modules/



Hugo modules are for dependency management

Hugo modules provide _dependency management for all component types, including content_.

I can

- [Going wild with Hugo modules - Jeanne Haskett, Kimberley Brown, Nathalie Laroche // HugoConf 2022](https://www.youtube.com/watch?v=K4lL3NMRmbY)
 -[Hugo modules for “dummies”](https://discourse.gohugo.io/t/hugo-modules-for-dummies/20758)
- [](https://discourse.gohugo.io/t/how-to-add-a-theme-using-modules-for-beginners/20665)
You can _mount_ things from a certain remote location to a location inside your project. Imagine _symlinks_, it's kind of like that. It is possible to mount folder from your hard drive.


### Importing content from another repo

```go
[module]

[[module.imports]]
  # import this repo as a Hugo module
  path = 'github.com/aamnah/notes'
  disabled = false

  # mount the imported repo in this location
  [[module.imports.mounts]]
  # if bringing in a subdirectory, mention the subdriectory path in source
  source = "."
  target = "content"
  includeFiles = "/**.md"
```
- If the content is inside the root of the repo and not inside a folder called `content`, you can specify `.` as the source value.
- If bringing in a subdirectory, mention the subdirectory path as `source`
- For themes, you can skip the `.mounts` since all modules are assumed to be themes by default
- If you only want files of a certain type, you can add glob pattern as a value for `includeFiles`. For example: `includeFiles = "/**.md"`. I didn't do it because i have image files in 3 different formats as well, no point in being redundant.

The same config in YAML would look like this:

```yaml
module:
  imports:
   - path: github.com/aamnah/notes
     mounts:
     - source: .
       target: content
```


- `module.imports` brings modules in, but does not say what to do with them
- `module.imports.mounts` tells you where to mount the modules you imported. It is a sub config directive of `imports`.

### Importing multiple modules

```toml
[module]
  [[module.imports]]
    path = "github.com/yihui/hugo-xmin"
  [[module.imports]]
    path = "github.com/yourname/my-shortcodes"
```

```yaml
module:
  imports:
    - path: github.com/refactoringui/heroicons
        mounts:
        - source: src/solid/shopping-cart.svg
          target: assets/icons/cart.svg
    - path: github.com/twbs/icons
        mounts:
        - source: icons
          target: assets/icons
```


Modules are imported when you `hugo serve`

```bash
hugo serve
```

```
go: no module dependencies to download
hugo: downloading modules …
```

```
go: downloading github.com/aamnah/notes v0.0.0-20221027074501-9bf56bd8f14e
go: github.com/aamnah/notes@upgrade: create zip: commands/Devil’s Commands.md: malformed file path "commands/Devil’s Commands.md": invalid char '’'
hugo: collected modules in 21269 ms
Error: failed to get ["-d" "github.com/aamnah/notes@upgrade"]: failed to execute 'go [get -d github.com/aamnah/notes@upgrade]': failed to execute binary "go" with args [get -d github.com/aamnah/notes@upgrade]: go: downloading github.com/aamnah/notes v0.0.0-20221027074501-9bf56bd8f14e
go: github.com/aamnah/notes@upgrade: create zip: commands/Devil’s Commands.md: malformed file path "commands/Devil’s Commands.md": invalid char '’'
 *errors.errorString
```

If there are any errors during import, you'll see them in the terminal output. For example, one of my file names had an apostrophe `'` in it..


- [Go in 100 Seconds](https://www.youtube.com/watch?v=446E-r0rXHI)
- [Master Hugo Modules: Managing Themes As Modules](https://www.hugofordevelopers.com/articles/master-hugo-modules-managing-themes-as-modules/)