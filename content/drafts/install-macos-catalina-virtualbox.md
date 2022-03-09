---
title: Installing macOS in VirtualBox on Linux
date: 2020-08-11
slug: install-macOS-virtualBox-catalina
draft: true
---

# Create the ISO

- Download macOS from the App Store
- Convert the `.app` file to `.iso`
- If you have a Mac, create the virtualbox image for macOS Catalina
- Else, get the virtualbox image `.vmdk` for macOS Catalina (around 8Gb in size)

```bash
# extract a password protected RAR file
sudo apt install unrar
unrar e -pPASSWORD FILE.rar
```

### Convert the `.app` to `.iso`

Find your `Install macOS Catalina.app` file and move it to the `Application` folder.

```bash
# Create a Catalina Virtual Disk Image
hdiutil create -o /tmp/Catalina -size 8500m -volname Catalina -layout SPUD -fs HFS+J

# Mount this Image to macOS
hdiutil attach /tmp/Catalina.dmg -noverify -mountpoint /Volumes/Catalina

# Use macOS Createinstallmedia Tool to create a Installer Image
sudo /Applications/Install\ macOS\ Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/Catalina --nointeraction

# Unmount Volume Catalina
hdiutil detach /volumes/Install\ macOS\ Catalina

# Convert the Catalina.dmg to a Catalina.iso for Virtual Machine
hdiutil convert /tmp/Catalina.dmg -format UDTO -o ~/Desktop/Catalina.cdr

# Move and Rename Catalina Image to Desktop
mv ~/Desktop/Catalina.cdr ~/Desktop/Catalina.iso
```

### Install VirtualBox and Extensions

```bash
sudo apt install virtualbox virtualbox-dkms virtualbox-ext-pack virtualbox-guest-additions-iso virtualbox-guest-utils virtualbox-qt
```

### Create a VM

- Memory Size: 16384MB (16GB)
- ~~Create a virtual hard disk (VHD 100GB)~~
  - ~~Fixed size (for better performance)~~
- Use an existing virtual hard disk file
  - Use the 8.2GB `.vmdk` image from geekrar. It is 100GB dynamic.

### Settings

- System
  - Motherboard
    - Boot Order: Uncheck Floppy, move Hard Disk to top and second is Optical
    - Chipset: `PIIX3`
    - Enable EFI (special OSes only)
  - Processor
    - Processor(s): `2` (half of my processors)
    - Enable PAE/NX
- Display
  - Video Memory: `128MB`
  - Graphics Controller: `VMSVGA`
- USB: USB 3.0 (xHCI) Controller

NOTES:

- `VMSVGA` is needed in a later step when you install vmware tools.
- USB was later changed to 2.0 after install because it fixes the keyboard and mouse lag issue

### First boot:

Start

Press Esc within 5 secs.
Select Boot Manager > EFI Internal Shell

---

On Linux, you can automate the creation of VirtualBox machine with scripts like [this](https://github.com/hkdb/VBoxMacSetup) and [this](https://github.com/myspaghetti/macos-virtualbox)

You need two files:

- The macOS Catalina image (macOS Catalina Final by Geekrar.rar)
- The boot image (which has the `install.nsh` script)

## Troubleshooting

Deleting a VirtualBox disk

```bash
vboxmanage list hdds
```

```bash
vboxmanage closemedium disk <uuid> --delete
```

### Configuring the VM

[DMI System information](https://www.virtualbox.org/manual/ch09.html)

```bash
DMI system information (type 1)

$ VBoxManage setextradata VM-name \
"VBoxInternal/Devices/pcbios/0/Config/DmiSystemVendor"      "System Vendor"
$ VBoxManage setextradata VM-name \
"VBoxInternal/Devices/pcbios/0/Config/DmiSystemProduct"     "System Product"
$ VBoxManage setextradata VM-name \
"VBoxInternal/Devices/pcbios/0/Config/DmiSystemVersion"     "System Version"
$ VBoxManage setextradata VM-name \
"VBoxInternal/Devices/pcbios/0/Config/DmiSystemSerial"      "System Serial"
$ VBoxManage setextradata VM-name \
"VBoxInternal/Devices/pcbios/0/Config/DmiSystemSKU"         "System SKU"
$ VBoxManage setextradata VM-name \
"VBoxInternal/Devices/pcbios/0/Config/DmiSystemFamily"      "System Family"
$ VBoxManage setextradata VM-name \
"VBoxInternal/Devices/pcbios/0/Config/DmiSystemUuid" \
"9852bf98-b83c-49db-a8de-182c42c7226b"
```

- You run these commands when the VM is turned off

```bash
# source
# https://github.com/hkdb/VBoxMacSetup/blob/master/setup.sh

VM='macOS Catalina' # the name of the virtual machine you created
RES='1920x1080' # the resolution you want

VBoxManage modifyvm "'${VM}'" --cpuidset 00000001 000106e5 00100800 0098e3fd bfebfbff

# Check CPU Type
INTEL=$(lscpu |grep GenuineIntel)

# Execute this line if it's a non-intel CPU
if [ -z "$INTEL" ]; then
    VBoxManage modifyvm "'${VM}'" --cpu-profile "Intel Core i7-6700K"
fi
VBoxManage setextradata "'${VM}'" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "iMac11,3"
VBoxManage setextradata "'${VM}'" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"
VBoxManage setextradata "'${VM}'" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Iloveapple"
VBoxManage setextradata "'${VM}'" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"
VBoxManage setextradata "'${VM}'" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
VBoxManage setextradata "'${VM}'" "VBoxInternal2/EfiGraphicsResolution" "$RES"
```

Another example from [here](https://gist.github.com/rob-smallshire/0c4403afb0523dd57c9f4b3693344f14)

```bash
# High Sierra
VBoxManage modifyvm     "macOS Sierra" --cpuidset 00000001 000306a9 04100800 7fbae3ff bfebfbff
VBoxManage setextradata "macOS Sierra" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "MacBookPro11,3"
VBoxManage setextradata "macOS Sierra" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"
VBoxManage setextradata "macOS Sierra" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Mac-2BD1B31983FE1663"
VBoxManage setextradata "macOS Sierra" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"
VBoxManage setextradata "macOS Sierra" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
```

```bash
# Mojave
VBoxManage modifyvm     "Mojave" --cpuidset 00000001 000306a9 04100800 7fbae3ff bfebfbff
VBoxManage setextradata "Mojave" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "MacBookPro11,3"
VBoxManage setextradata "Mojave" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"
VBoxManage setextradata "Mojave" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Mac-2BD1B31983FE1663"
VBoxManage setextradata "Mojave" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"
VBoxManage setextradata "Mojave" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
```

### Mouse and Keyboard lagging

Settings > USB > **USB 2.0 (OHCI + EHCI) Controller**

### Guest Tools

This will improve performance. It'll also change graphics 7mb to utuilize the 128mb you allocated. You need to set Graphics Controller to `VMSVGA` for the 128mb to work.

- [Download VMware tools ISO]()
- Settings > Storage > Add optical drive > Choose a disk image > Select `VirtualBox Guest Tool.iso`
- Now restart the VM. The VMWare tools will be on the macOS desktop
- Proceed with the install as normal
- Open Security Preferences > Click the lock to make changes > enter password > Allow
- Reboot

Now you'll see the _System Extension Blocked_ warning again. Go through the steps above to _Allow_ the extension and _install again_. And _restart again_.

Once VMware Tools are installed, it starts every time in 1024x780 resolution. The following command is supposed to fix it

```bash
sudo /Library/Application\ Support/VMware\ Tools/vmware-resolutionset 1920 1080
```

But it didn't work for me as there was no `VMware Tools` folder inside `/Library/Application Support/`.. Until i realized that it was `/Library` instead of `Library`, and that makes a huge difference because one is root level and the other one is user level.

Alternative to the above command was running this on my host machine (Ubuntu)

```bash
VBoxManage setextradata “VM_NAME” “VBoxInternal2/EfiGraphicsResolution” “1600×900”
```

I haven't noticed any performance differences yet. But one **major issue** is that it resets the screen size to 1024x780 every time i restart, even after i have run both the commands above. I'll probably end up creating a bash `alias` inside macOS and then run that on every login..

```bash
# ~/.zshrc
alias res='sudo /Library/Application\ Support/VMware\ Tools/vmware-resolutionset 1920 1080'
```

### Backup

Take a backup of the VM at this point. You have

- working macOS Catalina
- keyboard and mouse lag issue fixed
- display settings optimized and full screen mode set
- VMware extensions and tools installed

### Review

macOS Catalina 10.15.2

- I had my first random restart (_Your computer was restarted because of a problem_) after 5 minutes of all the actual setup. The point where i have installed vmware tools and am deciding on which software to install first..
- You can't copy/paste between mac and ubuntu
- It restarted again after 15 or so minutes. At this point i remembered having read something about battery saving and went to disable it, but it couldn't open Energy Saver settings..
- At this point after two restarts in half an hour, i'm wondering how i'll be able to handle installs of heavy downloads that take hours?
- Another restart (19:23)after another 14 or so minutes. I was in the middle of xcode cli tools install
- Next restart at 19:40, 17 minutes later... i'm tired at this point!

Now i start changing different configurations and logging the times for restarts..

- Changed OS from `macOS 10.13 High Sierra (64-bit)` to `Mac OS x (64-bit)`, since i installed Catalina 10.15.2 and it wasn't in the list of VirtualBox 6.1. Doesn't feel like it'd make much of a difference but desparate measure..
  - Boot 19:50, reboot at 20:00, after just 10 minutes :/
- Changed Graphics Controller from `VMSCGA` to `VBoxSVGA`.
  - Boot 20:02, reboot at 20:28, after 26 minutes =( i had just finished the Homebrew install
- Changed Chipset Type from `PIIX3` to `ICH9`.

I also realized that i followed a mixture of the old tutorial (which used existing vmdk file) and new one (which created a disk during install process).. Next step is to get the ISO for Catalina, follow the new tutorial, and do this one more time. If it still keeps rebooting then i guess it's not worth my time. `¯\_(ツ)_/¯`

Downloaded macOS Catalina latest from the App Store within the virtual machine. Will create an ISO out of it inside the VM as well..

## Links

- [How to Install macOS 10.15 Catalina on VirtualBox on Windows PC](https://techsviewer.com/install-macos-10-15-catalina-on-virtualbox-on-windows-pc/)
- [How to Install macOS High Sierra in VirtualBox on Windows 10](https://www.howtogeek.com/289594/how-to-install-macos-sierra-in-virtualbox-on-windows-10/)

- [](https://www.wikigain.com/install-macos-catalina-on-virtualbox-on-windows/)
- [Bash Script to Setup VBox MacOS Guest](https://github.com/hkdb/VBoxMacSetup)
- [](https://www.geekrar.com/how-to-install-guest-tool-on-macos-on-virtualbox/)
- [VBoxMacSetup](https://github.com/hkdb/VBoxMacSetup)
- [How to Take and Use Snapshots on VirtualBox](https://www.geekrar.com/how-to-take-and-use-snapshots-on-virtualbox/)
- [How to Install Guest Tool on macOS Catalina on VirtualBox](https://www.geekrar.com/how-to-install-guest-tool-on-macos-on-virtualbox/)
