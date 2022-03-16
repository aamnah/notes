---
title: Docker commands cheatsheet
date: 2021-05-30
draft: true
---

```bash
docker ps # list running containers
docker ps -a # list all containers, both running and stopped
```

Every instruction or step is considered a _layer_. To keep things efficient, Docker caches layers if nothing has changed. New docker layers are created for every `RUN`, `ADD` and `COPY` command.
