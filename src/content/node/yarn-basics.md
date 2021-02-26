---
title: Yarn 2.0
date: 2021-02-26
slug: yarn-basics
---

Why Yarn?

- it's not the speed anymore, it's the change in approaches to dependency management. i like Yarn's approach and explanation better
- [Plug'n'Play](https://yarnpkg.com/features/pnp) is cool. Instead of installing a bajillion files, you can have just one file called `.pnp.cjs` instead of a whole folder called `node_modules` in EVERY project. (React Native isn't yet supported though).
- See all available commands with `yarn help`

```bash
npm i -g yarn
```

Set version to Yarn 2.0 (aka berry) inside your project

```bash
yarn set version berry
```

Set global config

```bash
yarn config set init-license 'CC-BY-SA-4.0' -g
yarn config set init-version '0.0.1' -g
```

```bash
# Accessing the list of commands
yarn help

# Starting a new project
yarn init

# Installing all the dependencies
yarn
yarn install

# Adding a dependency
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

# Adding a dependency to different categories of dependencies
yarn add [package] --dev  # dev dependencies
yarn add [package] --peer # peer dependencies

# Upgrading a dependency
yarn up [package]
yarn up [package]@[version]
yarn up [package]@[tag]

# Removing a dependency
yarn remove [package]

# Upgrading Yarn itself
yarn set version latest
yarn set version from sources
```

## Links

- [Yarn: Usage](https://yarnpkg.com/getting-started/usage)
