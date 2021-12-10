---
date: 2021-12-10
slug: transfer-wordpress-multisite
title: Transfer a WordPress Multisite network to a different server and different domain
---

We are going to

- transfer a wordpress multisite network from one server to another
  - transfer files `wp-content`
  - transfer database
- change the URL of the network

### transfer files

```bash
rsync -vPhaze "ssh -i /home/username/id_ed25519" /home/username/wordpress/wp-content/ username@myserver.com:/home/username/public_html/wp-content/
```

- I'm using `rsync` because it is faster than `scp`
  - `-P` will show you progress, as well as the ability to resume if you run the same command again
  - `-h` will output numbers in a human readable format
  - `-a` will preserver modification times and permissions
  - `-z` will apply compression for faster transfers
  - `-e` specifies the remote shell to use
- I have the remote server setup to accept my server's SSH key
- I am specifying what SSH key to use in the rsync command so that i don't have to enter any password
- The first path is the source, the second path is the destination
- The folder i copied over was `wp-content`
