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
  - run `sql` query on the database to find and replace old URL with new URL
  - update `wp-config.php`

### transfer files

```bash
rsync -vPhaze "ssh -i /home/username/id_ed25519" /home/username/wordpress/wp-content/ username@myserver.com:/home/username/public_html/wp-content/
```

- I'm using `rsync` because it is faster than `scp`
  - `-P` will show you progress, as well as the ability to resume
  - `-h` will output numbers in a human readable format
  - `-a` will preserver modification times and permissions
  - `-z` will apply compression for faster transfers
  - `-e` specifies the remote shell to use
- I have the remote server setup to accept my server's SSH key
- I am specifying what SSH key to use in the rsync command so that i don't have to enter any password
- The first path is the source, the second path is the destination
- The folder i copied over was `wp-content`

### transfer database

This should be as simple as logging in to phpMyAdmin, exporting the database from one end and importing on the other.

- On the new server, you may have to create a database and user first before importing data to it. I tend to use the _create user_ option and then select the \_\_ option to do everything in one go
- If your database name, database username, or password has changed on the new server, you'll have to update them in `wp-config.php`
