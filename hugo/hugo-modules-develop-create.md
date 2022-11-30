---
title: How to create Hugo modules
date: 2022-11-16
draft: true
---

Hugo modules are based on Go modules. What makes a Go module is a `go.mod` file in the root of the module folder. You can create one with the `go mod init` command

```bash
# go mod init PROJECT_NAME_OR_URL_OR_REPO_URL
go mod init github.com/aamnah/hugo-mods/remixicons
```

The resulting `go.mod` file would look like this

```go
module github.com/aamnah/hugo-mods/remixicons

go 1.19
```

### Adding a dependency
Go modules can include other Go modules by listing them as _dependencies_. You do that with the `require` directive

```go
module github.com/aamnah/hugo-mods/remixicons

go 1.19
```

See all dependencies of the module with `go list -m all`. Take it easy when adding more dependencies as it adds external factors influencing your module. If you're a JavaScript developer and have dealt with `node_modules`, you'll understand what _dependency hell_ means. 

Adding modules also creates a file called `go.sum`, which contains cryptographic hashes (checksums) of _the content_ of specific module versions.

Both `go.mod` and `go.sum` should be checked into version control.

There's nothing special to it. Below is a hugo module for Heroicons by the TailwindCSS team. It's just a folder with a `go.mod` inside it. You can have a `config.toml` inside as well to provide some default config like `source` and `target` values for mount location. Declaring it in the module's own `config.toml` allows you to provide an example of usage in code snippets, and you can skip defining these again in the project where you are going to mount the module



```
hugo-mod-heroicons
├── config.toml
├── go.mod
├── go.sum
├── LICENSE
└── README.md

0 directories, 5 files
```

```go
module github.com/gohugoio/hugo-mod-heroicons

go 1.13

require (
	github.com/tailwindlabs/heroicons v2.0.12+incompatible // indirect
)
```

```toml
# hugo-mod-heroicons/config.toml
[module]
[[module.imports]]
path="github.com/tailwindlabs/heroicons"
[[module.imports.mounts]]
source = "src"
target = "assets/svg/heroicons"
```

Links
---

- [Using Go Modules](https://go.dev/blog/using-go-modules)
- [hugo-mod-heroicons](https://github.com/gohugoio/hugo-mod-heroicons)