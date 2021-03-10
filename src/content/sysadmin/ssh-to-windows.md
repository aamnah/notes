---
title: SSH into Windows from Linux
date: 2021-02-05
---

# Set up SSH on Windows

Open PowerShell as Administrator and run the following command to see if OpenSSH is already installed

```
Get-WindowsCapability -Online | ? Name -like 'OpenSSH*'
```

```
Name  : OpenSSH.Client~~~~0.0.1.0
State : Installed

Name  : OpenSSH.Server~~~~0.0.1.0
State : Installed
```

In my case both client and server were installed but i still couldn't connect, so i reinstalled it anyway and it worked afterwards..

```
# install the server and/or client features:
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

# start the ssh server daemon
Start-Service sshd

# This should return a Status of Running
Get-Service sshd

# add firewall rule to allow inbound and outbound traffic through port 22
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Service sshd -Enabled True -Direction Inbound -Protocol TCP -Action Allow -Profile Domain

# start automatically on Startup
Set-Service -Name sshd -StartupType 'Automatic'
```

Now you can SSH into the system like you normally would into any other system

```bash
ssh aamnah@Panda
```

Links
---

- [How to SSH into a Windows 10 Machine from Linux OR Windows OR anywhere](https://www.hanselman.com/blog/how-to-ssh-into-a-windows-10-machine-from-linux-or-windows-or-anywhere)
- [Can I connect to Windows machine from Linux shell?](https://unix.stackexchange.com/a/427739)