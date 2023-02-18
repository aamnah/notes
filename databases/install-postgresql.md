---
title: Getting started with PostgreSQL on Ubuntu
date: 2023-02-18
---

```bash
# PostgreSQL comes pre-installed on Ubuntu
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql.service

# create a user and give it super privileges
sudo -u postgres createuser --interactive

# create a db with the same username that postgres access by default
sudo -u postgres createdb sammy
```