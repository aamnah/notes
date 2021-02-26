---
title: Yarn 2.0
date: 2021-02-26
slug: yarn-basics
---

Why Yarn?

- it's not the speed anymore, it's the change in approaches to dependency management. i like Yarn's approach and explanation better
- [Plug'n'Play](https://yarnpkg.com/features/pnp) is cool. Instead of installing a bajillion files, you can have just one file called `.pnp.cjs` instead of a whole folder called `node_modules` in EVERY project. (React Native isn't yet supported though).

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

## Links

- [Yarn: Usage](https://yarnpkg.com/getting-started/usage)
