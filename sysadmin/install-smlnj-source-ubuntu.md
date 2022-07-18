---
date: 2022-07-18
title: Install latest SML/NJ from source on Ubuntu (20.04)
slug: install-smlnj-source-ubuntu
---

Standard ML of New Jersey isn't used much in modern day development but i needed to install it as part of my [Programming Languages](https://www.coursera.org/learn/programming-languages/) course.

The simplest way to install is `sudo apt -y install smlnj`, but it'll install a slightly older version.

Here are all the steps on installing SML/NJ from source. You can save this as a script and run it with `sudo bash foo.sh`. `sudo` is needed if you want to create directories and download files under `/usr/local`

```bash
#!/bin/bash

# Make directory for SML install
cd /usr/local
mkdir smlnj
cd smlnj

# Download source
# replace 110.99.2 with whatever the latest is at the time of install
wget https://smlnj.org/dist/working/110.99.2/config.tgz

# Extract files
tar -xzf config.tgz

# Install
# -64 is for 64bit architecture. default install is 32bit but you can change that by passing an option
config/install.sh -64

# Update PATH
echo '

# SML/NJ
# Standard ML of New Jersey
# where /usr/local/sml/bin is the install location
export PATH=$PATH:/usr/local/smlnj/bin
' >> ~/.zshrc
```

- Default SMLNJ installation is 64 bit, but for some systems you can select the architecture b/w 32bit and 64 bit by passing a flag
- I chose `/usr/local/smlnj` as the install path but you can install it anywhere, just update the `$PATH` to include that location. `/usr/local/smlnj` is the default install path for macOS as well.
- By default, it installs in the directory where you ran the `config/install.sh` command from 

```bash
$ sml
Standard ML of New Jersey (64-bit) v110.99.2 [built: Mon Jul 18 12:40:59 2022]
- 
```

- Exiting the REPL is with <kbd>ctrl + Z</kbd> and not wth <kbd>ctrl + C</kbd>

### Updating `$PATH` manually

By default, you can run `sml` by specifying the entire path, for example: 

```bash
cd INSTALL_LOCATION/bin
./sml
```

BUt if you want to be able to just run `sml` from anywhere in the terminal, you need to add it to your `$PATH`. To do so, add the following lines to your `~/.zshrc` or `~/.bashrc` or `~/.bash_profile` file

```bash
# SML/NJ
# Standard ML of New Jersey
# where /usr/local/smlnj/bin is the install location
export PATH=$PATH:/usr/local/smlnj/bin
```


Links
---

- [Installing SML/NJ on Unix](https://smlnj.org//dist/working/110.99.2/install.html)
- [Gist: Script to install latest SML/NJ from source on Ubuntu (20.04)](https://gist.github.com/aamnah/14482bb2493166d15455e01e4d59855d)