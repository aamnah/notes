---
title: '[apt, dpkg] Packages'
command: apt
slug: apt-dpkg
manpage: http://manpages.ubuntu.com/manpages/zesty/man8/apt.8.html
date: 2015-11-27
lastmod: 2024-06-05
---

To get a list of packages installed locally do this in your terminal:

```bash
apt list --installed
```

or 

```bash
dpkg -l
```

or

```bash
 dpkg --get-selections | grep -v deinstall
```

(The `-v` tag "inverts" grep to return non-matching lines)

To get a list of a specific package installed:

```bash
apt list --installed | grep postgresql
```

or

```bash
dpkg --get-selections | grep postgresql
```

To save that list to a text file called packages on your desktop do this in your terminal:

```bash
apt list --installed | grep postgresql > ~/Desktop/packages
```

or

```bash
dpkg --get-selections | grep -v deinstall > ~/Desktop/packages
```

To find information about a package you are interested in installing:

```bash
apt info postgresql
```