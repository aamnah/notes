---
date: 2022-07-18
title: Add Tor project repo to Ubuntu
slug: install-tor-project-ubuntu
---

NOTE: There is a [bash script](https://github.com/aamnah/bash-scripts/blob/master/install/tor_project_ubuntu.sh) that takes care of everything in this article and more.


While most of you are familiar with Tor Browser, few are aware that it is a bundle that consists of two parts: the _browser_ and the _router_. You can use the _router_ to use commands like `tor`, `torify` and `torsocks`

1. Create a `tor.list` file inside `/etc/apt/sources.list.d/`

```bash
sudo touch /etc/apt/sources.list.d/tor.list
```

2. Add official project source repos to the file

```bash
# /etc/apt/sources.list.d/tor.list
deb     [arch=$(dpkg --print-architecture) https://deb.torproject.org/torproject.org $(lsb_release -c | cut -f2) main
deb-src [arch=$(dpkg --print-architecture) https://deb.torproject.org/torproject.org $(lsb_release -c | cut -f2) main
```

- `$(dpkg --print-architecture)` will give you system architecture, e.g. _amd64_ (keep in mind that Ubuntu Focal dropped support for 32-bit)
- `$(lsb_release -c | cut -f2)` will give you distribution codename, e.g. _focal_

3. Update sources and install the `tor` package

```bash
apt update
apt install apt-transport-https
apt install tor
```

4. Update config

In `/etc/tor/torrc`, uncomment the lines `#ControlPort 9051` and `#CookieAuthentication 1` and change the `CookieAuthentication` value from `1` to `0`

```bash
sed -i 's/#ControlPort 9051/ControlPort 9051/g' /etc/tor/torrc
sed -i 's/#CookieAuthentication 1/CookieAuthentication 0/g' /etc/tor/torrc

sudo /etc/init.d/tor restart
```

5. Test changing your IP

```bash
curl ifconfig.me

torify curl ifconfig.me 2>/dev/null
```

The `torify` command can be used to run any command through tor. The redirect to `/dev/null` is used because torify generates a handful of warnings on some platforms.

If all goes well, you should see the IP address you’re getting after going through Tor. If not, try restarting the tor service again.

Links
--- 
- [Why and how I can enable Tor Package Repository in Debian?](https://support.torproject.org/apt/tor-deb-repo/)
- [Installation](https://tb-manual.torproject.org/installation/)
- [How To: Using Tor From The Command Line](https://justhackerthings.com/post/using-tor-from-the-command-line/)
- [Bash script to install Tor project on Ubuntu](https://github.com/aamnah/bash-scripts/blob/master/install/tor_project_ubuntu.sh)
- [Command Line Tor](https://dzone.com/articles/command-line-tor)