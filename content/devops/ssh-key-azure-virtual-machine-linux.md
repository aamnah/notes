---
title: Setting up a sudo User with SSH key access an Azure Virtual Machine (Ubuntu)
date: 2021-05-26
slug: ssh-key-azure-virtual-machine-linux
category: DevOps
---

- You can create a new user from the _Support + troubleshooting > Reset password_ screen. By default, it'll update the password for the given account. But if the given account does not exist, it'll create one, add it to _sudoers_ list (make sure it can run `sudo` commands) and then set the password for it too.
- The `~/.ssh` folder doesn't exist when you create a new user. So you have to create it, and the `authorized_keys` file to add accepted keys that can connect to the server and set the right permissions for both
- Setting permissions is important because SSH will not connect if the permissions are too open
- `authorized_keys` is where you add the contents of the `.pub` file of your key pair.

### Set the server up to accept SSH key for the user

Login to the Azure Virtual Machine with your password and create the required files and folders

```bash
# create the ~/.ssh folder and set perms
mkdir ~/.ssh
chmod 700 ~/.ssh

# create the authorized_keys file and set perms
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# reload the SSH service for the changes to take effect
sudo service ssh reload
```

### Create an SSH key pair

On your local computer, generate an SSH key that you'll use to connect to the remote Azure virtual machine

```bash
cd
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Copy the key to the server

Copy the key you just created to the Azure Virtual Machine

```bash
# MacOS may not include ssh-copy-id with OpenSSH
# brew install ssh-copy-id

ssh-copy-id -i ~/.ssh/id_ed2551 user@host
```

- it'll ask you for the password when you add the key. afterwards, once the key has been copied, it'll just use the key to login
- `ssh-copy-id` is part of OpenSSH, and i prefer this over manually copy/pasting the key using `pbcopy`, `xclip` or `cat`
- if you don't provide the `-i` to `ssh-copy-id` it adds all keys to the remote server
- you don't have to specify the `.pub` extension for the key, it only copies the public part by default

You can now do `ssh user@host` and it shall log you in without asking for the password

## Links

- [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [ssh-copy-id](https://www.ssh.com/academy/ssh/copy-id)
