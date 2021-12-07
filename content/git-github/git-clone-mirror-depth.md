---
title: Size differences between `git clone`, `git clone --mirror` and `git clone --depth 1`
date: 2020-06-22
slug: git-clone-mirror-depth
---

Trying to determine how i can only get essential git files when cloning repos and how much of a difference different ways of cloning the repo make on file size and bandwidth used.


### git clone

```bash
git clone git@bitbucket.org:myBigRepo/myBigRepo.git
```

```
Cloning into 'myBigRepo'...
remote: Counting objects: 78060, done.
remote: Compressing objects: 100% (21470/21470), done.
remote: Total 78060 (delta 58468), reused 74919 (delta 55574)
Receiving objects: 100% (78060/78060), 565.34 MiB | 1.60 MiB/s, done.
Resolving deltas: 100% (58468/58468), done.
Checking out files: 100% (11463/11463), done.
```

565.34 MiB

### git clone --mirror

```bash
git clone --mirror git@bitbucket.org:myBigRepo/myBigRepo.git
```

```
Cloning into bare repository 'myBigRepo.git'...
remote: Counting objects: 78060, done.
remote: Compressing objects: 100% (21470/21470), done.
remote: Total 78060 (delta 58468), reused 74919 (delta 55574)
Receiving objects: 100% (78060/78060), 565.34 MiB | 1.28 MiB/s, done.
Resolving deltas: 100% (58468/58468), done.
```

565.34 MiB

### git clone --depth 1 --no-single-branch


```bash
git clone --depth 1 --no-single-branch git@bitbucket.org:myBigRepo/myBigRepo.git
```

```
Cloning into 'myBigRepo'...
remote: Counting objects: 19196, done.
remote: Compressing objects: 100% (13449/13449), done.
remote: Total 19196 (delta 9353), reused 14226 (delta 5134)
Receiving objects: 100% (19196/19196), 343.55 MiB | 1.27 MiB/s, done.
Resolving deltas: 100% (9353/9353), done.
Checking out files: 100% (11463/11463), done.
```

343.55 MiB