---
date: 2022-07-18
title: Add Tor browser on Ubuntu
slug: install-tor-browser-ubuntu
---

There is a [bash script](https://github.com/aamnah/bash-scripts/blob/master/install/tor_browser_ubuntu.sh) that takes care of everything in this article and more.

1. Download the latest Tor browser package from the [Tor downloads page](https://www.torproject.org/download/), it's signature and verify the package using signature and GPG key 

```bash
# Download Tor browser package
wget https://www.torproject.org/dist/torbrowser/11.5/tor-browser-linux64-11.5_en-US.tar.xz

# Download signature
wget https://www.torproject.org/dist/torbrowser/11.5/tor-browser-linux64-11.5_en-US.tar.xz.asc 

# Import GPG key and Verify package with signature 
gpg --auto-key-locate nodefault,wkd --locate-keys torbrowser@torproject.org # import key
gpg --output ./tor-browser.keyring --export 0xEF6E286DDA85EA2A4BA7DE684E2C6E8793298290 # save key to file
gpgv --keyring ./tor-browser.keyring tor-browser-linux64-11.5_en-US.tar.xz.asc  tor-browser-linux64-11.5_en-US.tar.xz # verify the signature of package using key
```

2. Extract and move to `/opt` for a system-wide install

```bash
# Extract
tar -xf tor-browser-linux64-11.5_en-US.tar.xz # gives a folder like: tor-browser_en-US
sudo mv tor-browser_en-US /opt
```

3. Go to the install location and run the `start-tor-browser.desktop` and use `--register-app` so that it adds/updates the desktop shortcut

```bash
sudo chmod +x /opt/tor-browser_en-US/start-tor-browser.desktop
cd /opt/tor-browser_en-US
./start-tor-browser.desktop --register-app
```

Links
---

- [Installation](https://tb-manual.torproject.org/installation/)
- [How to Install and Use the Tor Browser on Linux](https://www.howtogeek.com/423866/how-to-install-and-use-the-tor-browser-on-linux/)
- [How can I verify Tor Browser's signature?](https://support.torproject.org/tbb/how-to-verify-signature/)
- [Bash script to install Tor Browser on Ubuntu](https://github.com/aamnah/bash-scripts/blob/master/install/tor_browser_ubuntu.sh)