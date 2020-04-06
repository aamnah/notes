---
path: change_gitflow_master_staging_branch
title: Adding a Staging branch to your Git Flow setup
date: 2020-04-06
---

We have a CI/CD setup and we need a `staging` environment now (based off of a branch we're going to call `staging`). Git flow by default only has `develop` and `master`. What we're going to do to is create a `staging` branch and make it the default for production releases (aka what `master` used to be).

This branch will then get deployed (automatically) to the Staging environment. Once we're happy with everything, we'll manually merge the branch in `master` and it will then be deployed live (manually).

Create a `staging` branch based on `master`

```bash
git checkout master
git branch staging
```

Update your `.git/config` file to change the `master` branch for gitflow

```bash
[gitflow "branch"]
	master = staging
	develop = develop
```

You can confirm your settings with `git flow config`

```
Branch name for production releases: staging
Branch name for "next release" development: develop
Feature branch prefix: feature/
Bugfix branch prefix: bugfix/
Release branch prefix: release/
Hotfix branch prefix: hotfix/
Support branch prefix: support/
Version tag prefix:
```
