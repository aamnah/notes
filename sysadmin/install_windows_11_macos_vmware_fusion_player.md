---
title: Install Windows 11 on macOS using VMware Fusion Player
date: 2023-10-20
draft: true
---

**tl;dr** 

- Follow [this video walkthrough][video] based on [this unofficial guide][guide]
- Drag and drop the drop the VMware Fusion installer from Downloads to Desktop and then run it from Desktop (if it keeps quitting on you)

## Install VMware Fusion Player

- You have to create a free account in order to get the license key. 
- Then download the binary.
- To install, drag and drop the icon from the installer to the Desktop. Then run it.

## Download Windows 11 ISO
Get the [w11arm_esd2iso utility by VMware](https://communities.vmware.com/t5/VMware-Fusion-Documents/w11arm-esd2iso-a-utility-to-create-Windows-11-ARM-ISOs-from/ta-p/2957381) to download the Windows 11 ISO. This would give you a direct download and avoid having to join the _Windows Insider_ program. 

Using the ISO from [UUP Dump]() or from a Windows Insider converted VHDX file is not recommended.

> You should be using an retail channel installation ISO built using the procedures in the guide. Other installation methods tend to have a few warts and sometimes flaky behavior.

For example: the ISO downloaded with CrystalFetch installed Windows 11 for me, but then i was not able to change Display Resolution because the option was grayed out (possibly because of missing drivers)

```bash
# Install command line tools
xcode-select –install

# install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install dependencies
brew install wmlib aria2

# Create
cd ~/Desktop
mkdir Build
cd Build/

# fetch the tool
wget https://communities.vmware.com/wbsdv95928/attachments/wbsdv95928/3006/621/13/w11arm_esd2iso-V4.0.4.zip

unzip w11arm_esd2iso-V4.0.4.zip

# make the script executable
chmod +x w11arm_esd2iso

# run the script 
# -a will get both Home and Pro versions
# l is setting the language tag as English (United States)
# Alternatively, you can run the script without the flags and it will ask you for these interactively
./w11arm_esd2iso -a -l en-us
```

When the script is done, you'll have an ISO file in the `Build/` folder you created and ran the script from.

## Install Windows 11

Follow the steps from [the video][video].

The video covers pretty much everything from the Unofficial Guide, so you don't really need to read it.

Some commands and shortcuts that you'll need:

- `Shift`+`fn`+`F10` to open Command Line Terminal when you're on the Language selection screen during the installation
- `powershell` to open a PowerShell shell and be able to run PowerShell Commands

```ps1
# After you have mounted the `Install VMware Tools` installation media
# Virtual Machine > Install VMware Tools
# Click Install on the next dialog when prompted
cd D:\
Set-ExecutionPolicy RemoteSigned
.\setup.ps1
```

Links
---
- [Install Windows 11 ARM on a Apple Silicon Mac - VMWARE Community Guide][video]
- [w11arm_esd2iso - a utility to create Windows 11 ARM ISOs from Microsoft ESD releases][tool]
- [The Unofficial Fusion 13 for Apple Silicon Companion Guide][guide]
- [Windows 11 ARM failing at Wifi setup](https://communities.vmware.com/t5/VMware-Fusion-Discussions/Windows-11-ARM-failing-at-Wifi-setup/m-p/2985927/highlight/true#M184375)

[video]: https://www.youtube.com/watch?v=FUSLJnxKa_4
[guide]: https://communities.vmware.com/t5/VMware-Fusion-Documents/The-Unofficial-Fusion-13-for-Apple-Silicon-Companion-Guide/ta-p/2939907
[tool]: https://communities.vmware.com/t5/VMware-Fusion-Documents/w11arm-esd2iso-a-utility-to-create-Windows-11-ARM-ISOs-from/ta-p/2957381