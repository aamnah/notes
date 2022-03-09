---
title: Run JNLP Files on Ubuntu
date: 2017-01-23
lastmod: 2021-08-06
---

```bash
sudo apt install icedtea-netx -y
```
`icedtea-netx` requires `openjdk-8-jre` and `openjdk-8-jre-headless` as dependencies so it'll install JRE (Java Runtime Environment) for you as well if you don't have that already.

- _JNLP_ is Java Network Launching Protocol
- `icdeatea-netx` is Netx implementation of JNLP
- `icedtea-plugin` is web browser plugin to execute Java applets. No longer available in Ubuntu (20.04)
