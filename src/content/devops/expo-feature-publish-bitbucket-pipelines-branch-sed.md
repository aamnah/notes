---
title: Doing automated Git Flow branch deploys on their own Expo release channels with Bitbucket Pipelines
slug: expo-feature-publish-bitbucket-pipelines-branch-sed
date: 2020-07-23
---

### background

- I have an Expo based React Native app that i publish with `expo publish`
- I follow [git flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) branch naming and structure
- I gave multiple people working on plenty of features that we need to test separately

### what i want

Publish every branch to it's own release channel automatically

### the issue

Because i'm using Git Flow, the branch naming is `feature/my-awesome-branch`. I can get the branch name with a built-in [pipeline variable](https://support.atlassian.com/bitbucket-cloud/docs/variables-in-pipelines/), but the `/` after `feature` doesn't work with Expo release channel naming. You can't have a `/` in a release channel name..

## the solution

- Get the branch name with `${BITBUCKET_BRANCH}`, do some `sed` magic to remove `/` in the name, and voila!

### the code

```yml
feature/*:
  - step:
      name: Publish to Expo
      deployment: feature
      caches:
        - npm
      script:
        - unset NPM_CONFIG_USER
        - npm ci
        - npm install -g --unsafe-perm expo-cli
        - expo login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD}
        - RELEASE_CHANNEL_FEATURE=$(echo ${BITBUCKET_BRANCH} | sed 's|feature/|feature_|')
        - expo publish --clear --release-channel ${RELEASE_CHANNEL_FEATURE} # RELEASE_CHANNEL is a based on branch name (feature/my-feature => feature_my-feature)
```
