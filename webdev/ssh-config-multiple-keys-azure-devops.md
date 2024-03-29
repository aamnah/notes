---
date: 2022-04-04
lastmod: 2022-04-21
title: Multiple SSH Keys and Azure DevOps
---

This is an issue with Azure SSH keys on both Windows and macOS. If you have multiple SSH keysin the `~/.ssh` folder, it'll try the first one only and if that one is not the one you use with Azure, it'll present you with an _authentication failed_ error instead of trying the rest of the keys (as you'd normally expect with SSH)

If you have multiple keys saved in your `.ssh` folder or loaded with `ssh-agent`, Azure DevOps will try only the first one and if that's not the one for it then it'll fail with

```
remote: Public key authentication failed.
fatal: Could not read from remote repository.
```

or

```
remote: TF401019: The Git repository with name or identifier Auth does not exist or you do not have permissions for the operation you are attempting.
fatal: Could not read from remote repository.
```

Solution is adding a `Host` entry to your `.ssh/config` specifying the key you want to use [ref](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops#q-i-have-multiple-ssh-keys--how-do-i-use-different-ssh-keys-for-different-ssh-servers-or-repos)

```
Host ssh.dev.azure.com
  IdentityFile ~/.ssh/your_private_key
  IdentitiesOnly yes
```
