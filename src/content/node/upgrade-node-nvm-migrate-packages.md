---
title: Upgrade Node with NVM and migrate installed global node modules
slug: upgrade-node-nvm-migrate-packages
date: 2020-06-09
---

Since i use `nvm`, upgrading to latest LTS version (`v12.18.0 (npm v6.14.4)` as of this writing) is simple

```bash
nvm install --lts
nvm use --lts
```

But i have plenty of global modules installed that i do not want to have to manually re-install again for the updated version. So I actually used the following command to install latest LTS, use it, and also re-install global node modules from the previous version..

To be clear, it will _re-install_ global modules, instead of copying them over from old version directory (which i was expecting)

```bash
# migrate packages from old version without re-installing them
# https://github.com/nvm-sh/nvm#migrating-global-packages-while-installing
nvm install lts/* --reinstall-packages-from=default --latest-npm
```

You can also pass a specific version to `--reinstall-packages-from=`. For example

```bash
nvm install lts/* --reinstall-packages-from=10.15.3 --latest-npm
```

or

```bash
nvm install 12.18.0 --reinstall-packages-from=10.15.3 --latest-npm
```

The `--latest-npm`, if you explicitly specify it, also updates the `npm` version for the packages you're migrating. It wasn't needed in my case..

Lastly, run `nvm use --lts` to make sure we're using the latest LTS we just installed. Even though it said `Now using node v12.18.0 (npm v6.14.4)`, it didn't actually switch to `v12.18.0`. I found that out when my build failed because of Node version incompatibility..
