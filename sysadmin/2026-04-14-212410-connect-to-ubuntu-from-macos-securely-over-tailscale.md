---
title: Connect to Ubuntu from macOS securely over Tailscale
date: 2026-04-14T21:24:10+03:00
uuid: 2026-04-14-212410
slug: connect-to-ubuntu-from-macos-securely-over-tailscale
draft: false
description:
tags:
---

Assumption: Both machines have tailscale already setup and logged in.

On Ubuntu, install SSH if it is not already

```bash
sudo systemctl status ssh          # is sshd                                                    
sudo apt install openssh-server    # install if missing                         
sudo systemctl enable --now ssh                                                                 
sudo ss -tlnp | grep :22           # confirm it's listening    
```
Then from the client: 

```bash
tailscale status                   # confirm peer is online, get its tailscale IP/MagicDNS name 
ssh user@<machine-name>            # or use the 100.x.y.z IP  
```

### UFW
Tailscale creates a new interface called `tailscale0`. It is better to allow the `tailscale0` interface instead of using a custom SSH port. Any tailscale connection is encrypted by default

Set up `ufw` as firewall, block all incoming so that no-one can connect, allow all outgoing so that you are still able to use internet, allow incoming connections only on `tailscale0` (safer than opening 22 to the world)

```bash
sudo ufw default deny incoming    # deny all incoming
sudo ufw default allow outgoing   # allow all outgoing
sudo ufw allow in on tailscale0   # allow incoming only on tailscale0
sudo ufw enable
sudo ufw status verbose
```

