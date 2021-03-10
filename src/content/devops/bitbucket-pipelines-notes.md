---
title: Notes on Bitbucket Pipelines
date: 2020-07-02
slug: bitbucket-pipelines-notes
---

### Container `Build` exceeded memory limit.

This can happen for large steps, in my case building an app bundle with `turtle-cli`. You can double the memory allocation for a step with `size: 2x`

> Regular steps have `4096 MB` of memory in total, large build steps (which you can define using `size: 2x`) have `8192` MB in total.

[ref](https://support.atlassian.com/bitbucket-cloud/docs/use-services-and-databases-in-bitbucket-pipelines/),
[ref](https://support.atlassian.com/bitbucket-cloud/docs/configure-bitbucket-pipelinesyml/#Configurebitbucket-pipelines.yml-ci_size)

```yaml
- step: &turtle-build-android
    name: Build app bundle (.aab)
    image: ubuntu:focal
    size: 2x # Double resources available for this step.
    caches:
      - npm
    script:
      - echo 'this is my step with 2x memory'
```

### Get the commit message for the commit that triggered the pipeline

```yaml
pipelines:
  default:
    - step:
        script:
          - COMMIT_MESSAGE=`git log --format=%B -n 1 $BITBUCKET_COMMIT`
          - echo $COMMIT_MESSAGE
```

[ref](https://community.atlassian.com/t5/Bitbucket-Pipelines-questions/Commit-message/qaq-p/1202595)
