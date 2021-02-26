---
title: Setting up an M1 MacBook Pro for Frontend Development
date: 2021-02-24
---

Install Xcode
Install Xcode Command Line Developer Tools (don’t need Xcode installed first for that)
Install Homebrew

```
mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
```

brew install --cask visual-studio-code opera iterm2

Install Rosetta. WhatsApp prompted me and installed automatically, but you can manually install using the following command:

```bash
softwareupdate --install-rosetta
```

DESIGN

- Sketch
- Photoshop
- Illustrator
- Figma

DEVELOP

- VS Code
- Sublime Text
- Slack
- Chrome
- Opera
- Android Studio
- iTerm

### Homebrew

Wget

```bash
brew install wget fastlane
```

- `wget` so that i don't have to edit command between Linux and macOS
- `fastlane` for automating my app releases

Others
Logitech Options

Python 3
NVM, Node

Change location for screenshots

Create `.zprofile` (and `.zshrc` ?)

```
=> Profile not found. Tried ~/.bashrc, ~/.bash_profile, ~/.zshrc, and ~/.profile.
```

Otherwise stuff like `nvm` or `brew` after you install them will keep saying command not found, because it won't add commands to `$PATH` in a file that doesn't exist

```bash
touch ~/.zshrc ~/.zprofile

# NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install --lts

# Homebrew
#/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
```

Shopify

```bash
brew tap shopify/shopify
brew install themekit
```

### Browsers

- Chrome
- Brave
- Vivaldi
- Edge
- Opera
- Chromium `brew install --cask chromium`

### React Native

- Flipper
- fastlane

Setup for iOS needs:

- Node
- Watchman `brew install watchman`
- Xcode
- Xcode Command Line Tools `xcode-select --install`
- CocoaPods `sudo gem install cocoapods`

```bash
# node will be installed with NVM
brew install watchman

# install CocoaPods
#sudo gem install cocoapods
brew install cocoapods
```

#### iOS

- Install JDK 8 `brew install --cask adoptopenjdk/openjdk/adoptopenjdk8`
- Install Android Studio
- Install [Android Emulator for M1](https://github.com/google/android-emulator-m1-preview)

### Set up SSH keys

- Create `~/.ssh` directory and add `~/.ssh/config`
- Generate a key using the ED25519 type
- Load key and update key so that it automatically loads it every time

[ref](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

```bash
mkdir ~/.ssh
cd ~/.ssh

ssh-keygen -t ed25519 -C "your_email@example.com"
```

```bash
# Load key
touch ~/.ssh/config

echo "Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/SSH_KEY" >> ~/.ssh/config

eval "$(ssh-agent -s)"
ssh-add -K ~/.ssh/SSH_KEY

```

Customize ZSH

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Configure Git

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

### Misc. Tools

[Rectangle](https://github.com/rxhanson/Rectangle) for window resizing and snapping. Used to use [Spectacle](https://github.com/eczarny/spectacle#important-note) before, but that is no longer being maintained.

```bash
brew install --cask rectangle
```

[tmux](https://formulae.brew.sh/formula/tmux)
