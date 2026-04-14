---
title: 'Unix: Using pushd and popd for faster navigation'
date: 2014-05-21T15:33:21+05:00
lastmod: 2026-04-14
uuid: 20140521153321
type: link
---

[Unix: Using pushd and popd for faster navigation](https://www.networkworld.com/article/930672/unix-using-pushd-and-popd-for-faster-navigation.html)

> The **pushd** and **popd** commands put directory paths onto a directory stack (**pushd**) and then pop them off again (**popd**). Using the pushd and popd commands is not unlike dropping directory "bread crumbs" and then returning in reverse order to all the places you visited.

TL;DR
-----

`pushd` and `popd` manage a **directory stack** — `cd` with a memory. It's LIFO: last in, first out.

- `pushd <dir>` — changes into `<dir>` *and* pushes it onto the stack
- `popd` — pops the top entry off the stack and changes into the next one
- `dirs` — shows the current stack

```bash
$ pushd ~/dir1
~/dir1 ~
$ pushd ~/dir2
~/dir2 ~/dir1 ~
$ pushd ~/dir3
~/dir3 ~/dir2 ~/dir1 ~

$ popd
~/dir2 ~/dir1 ~
$ popd
~/dir1 ~
$ popd
~
```

The leftmost entry is always your current directory.

### Rotating the stack

`pushd +N` rotates the stack — moves the Nth entry to the top (and `cd`s into it), without pushing anything new. Handy for cycling through a fixed set of directories.

```bash
$ dirs
~/dir3 ~/dir2 ~/dir1 ~
$ pushd +1
~/dir2 ~/dir1 ~ ~/dir3
```

### When it's useful

- Jumping between 2–3 directories repeatedly (build dir, source dir, logs dir) without retyping paths
- Not great for random access — if you need to jump around a lot, symlinks or `$CDPATH` are better fits
