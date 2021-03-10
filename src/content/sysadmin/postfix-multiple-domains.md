---
title: Setting your Postfix self-hosted mail server up for multiple domains
date: 2020-08-29
slug: postfix-multiple-domains
description: Use a single server to host email for multiple domains wqithout having to create a UNIX system account for every email.
---

- With **virtual alias domains**, each hosted address is aliased to a local UNIX system account or to a remote address.
- NEVER list a virtual alias domain name as a mydestination domain!
- Execute the command `postmap /etc/postfix/virtual` after changing the virtual file, and execute the command `postfix reload` after changing the `main.cf` file.
- Note: virtual aliases can resolve to a local address or to a remote address, or both. They don't have to resolve to UNIX system accounts on your machine.

```conf
# /etc/postfix/main.cf
virtual_alias_domains = example.com ...other hosted domains...
virtual_alias_maps = hash:/etc/postfix/virtual
```

```conf
# /etc/postfix/virtual
postmaster@example.com postmaster
info@example.com       joe
sales@example.com      jane
# Uncomment entry below to implement a catch-all address
# @example.com         jim
...virtual aliases for more domains...
```

### Mail accounts without system user accounts

`Maildir` style delivery where a mailbox _pathname_ is used instead of a UNIX system account is used can be used to create virtual mailboxes. That way you don't have to create a system account for every user that you want to give email accesss to.

Maildir style delivery is turned on by terminating the mailbox pathname with `/`.

```conf
# Virtual Mailbox related config
# /etc/postfix/main.cf
virtual_mailbox_domains = example.com ...more domains...
virtual_mailbox_base = /var/mail/vhosts
virtual_mailbox_maps = hash:/etc/postfix/vmailbox
virtual_minimum_uid = 100
virtual_uid_maps = static:5000
virtual_gid_maps = static:5000
virtual_alias_maps = hash:/etc/postfix/virtual
```

```conf
# /etc/postfix/vmailbox:
info@example.com    example.com/info
sales@example.com   example.com/sales/
# Comment out the entry below to implement a catch-all.
# @example.com      example.com/catchall
...virtual mailboxes for more domains...
```

```conf
# /etc/postfix/virtual:
postmaster@example.com postmaster
```

## Links

- http://www.postfix.org/VIRTUAL_README.html
- http://www.postfix.org/virtual.5.html
- http://www.postfix.org/postconf.5.html#virtual_alias_domains
