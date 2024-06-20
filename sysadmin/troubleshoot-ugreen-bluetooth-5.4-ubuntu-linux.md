---
title: Troubleshooting UGREEN Bluetooth 5.4 adapter on Ubuntu Linux
date: 2024-02-27T19:28:56+02:00
uuid: 20240227192856
slug: troubleshoot-ugreen-bluetooth-5.4-ubuntu-linux
draft: false
description: All in vain in the end. The dongle could not be used because of missing drivers and I was not able to install drivers for Linux. 
tags: 
---

NOTE: The dongle could not be used because of missing drivers and I was not able to install drivers for Linux.

Model No.: `CM748` without antenna / `CM749` with antenna  
Chipset: `Barrot BR8554`  
FCC ID: `2AQI5-CM748`  
Manufacturer ID: `33fa:0010`  

Status: no official drivers for Linux or macOS are available

Troubleshooting:
- See if it is listed in connected USB devices `lsusb`
- See if it is recognized as a Bluetooth device `rfkill`
- See if there are kernel related errors `dmesg`

See if it is connected

```bash
lsusb
```

```
Bus 008 Device 004: ID 33fa:0010  USB2.0-BT
```

`33fa:0010` here is the manufacturer ID

---

`rfkill` is a tool for enabling and disabling wireless devices

```bash
rfkill list all
```

```
1: hci0: Bluetooth
	Soft blocked: no
	Hard blocked: no
```

We can see that `hci0`

```bash
hciconfig -a hci0
```

```
hci0:	Type: Primary  Bus: USB
	BD Address: 00:A7:41:26:02:51  ACL MTU: 0:0  SCO MTU: 0:0
	DOWN 
	RX bytes:165 acl:0 sco:0 events:9 errors:0
	TX bytes:273 acl:0 sco:0 commands:10 errors:0
	Features: 0xbf 0xee 0x49 0xfa 0xdb 0xbf 0x7b 0x87
	Packet type: DM1 DM3 DM5 DH1 DH3 DH5 HV1 HV3 
	Link policy: 
	Link mode: PERIPHERAL ACCEPT 
```

---

Try bringing it up

```bash
sudo hciconfig hci0 up
```

```
Can't init device hci0: Connection timed out (110)
```

---

Install Blueman GUI and see if it detects the adapter

```bash
sudo apt install blueman
blueman-manager
```

```
blueman-manager 19.19.32 ERROR    Manager:137 on_dbus_name_appeared: Default adapter not found, trying first available.
blueman-manager 19.19.32 ERROR    Manager:141 on_dbus_name_appeared: No adapter(s) found, exiting
```


---

```bash
lsmod | grep -i blue  
```

```
bluetooth            1073152  13 btrtl,btmtk,btintel,btbcm,bnep,btusb
ecdh_generic           16384  1 bluetooth
```

---

Check if Bluetooth service is running

```bash
sudo service bluetooth status 
```

```
bluetooth.service - Bluetooth service
     Loaded: loaded (/lib/systemd/system/bluetooth.service; enabled; vendor pre>
     Active: active (running) since Tue 2024-02-27 17:53:12 EET; 54min ago
       Docs: man:bluetoothd(8)
   Main PID: 10072 (bluetoothd)
     Status: "Running"
      Tasks: 1 (limit: 14239)
     Memory: 668.0K
        CPU: 106ms
     CGroup: /system.slice/bluetooth.service
             └─10072 /usr/lib/bluetooth/bluetoothd

helmi 27 17:53:12 Blacky systemd[1]: Starting Bluetooth service...
helmi 27 17:53:12 Blacky bluetoothd[10072]: Bluetooth daemon 5.64
helmi 27 17:53:12 Blacky systemd[1]: Started Bluetooth service.
helmi 27 17:53:12 Blacky bluetoothd[10072]: Starting SDP server
helmi 27 17:53:12 Blacky bluetoothd[10072]: Bluetooth management interface 1.22>
```

---

Didn't work: try reinstalling `btusb` module

```bash
sudo hciconfig hci0 down
sudo rmmod btusb
sudo modprobe btusb
sudo hciconfig hci0 up
```

---

```bash
dmesg | egrep -i 'blue|firm'
```

```
[    0.182708] Spectre V2 : Enabling Restricted Speculation for firmware calls
[    0.505748] DMAR: [Firmware Bug]: Your BIOS is broken; bad RMRR [0x000000009f7dc000-0x000000009f7dbfff]
[    6.291027] Bluetooth: Core ver 2.22
[    6.291106] NET: Registered PF_BLUETOOTH protocol family
[    6.291109] Bluetooth: HCI device and connection manager initialized
[    6.291114] Bluetooth: HCI socket layer initialized
[    6.291117] Bluetooth: L2CAP socket layer initialized
[    6.291136] Bluetooth: SCO socket layer initialized
[    8.247685] Bluetooth: BNEP (Ethernet Emulation) ver 1.3
[    8.247689] Bluetooth: BNEP filters: protocol multicast
[    8.247696] Bluetooth: BNEP socket layer initialized
[    8.612746] Bluetooth: hci0: command 0x1005 tx timeout
[    8.612750] Bluetooth: hci0: Opcode 0x1005 failed: -110
[ 2273.580381] Bluetooth: hci0: command 0x1005 tx timeout
[ 2273.584375] Bluetooth: hci0: Opcode 0x1005 failed: -110
```

We can see two errors: `command 0x1005 tx timeout` and `Opcode 0x1005 failed: -110`


```bash
sudo cat /sys/kernel/debug/usb/devices
```

```
T:  Bus=08 Lev=01 Prnt=01 Port=00 Cnt=01 Dev#=  4 Spd=12   MxCh= 0
D:  Ver= 2.00 Cls=e0(wlcon) Sub=01 Prot=01 MxPS=64 #Cfgs=  1
P:  Vendor=33fa ProdID=0010 Rev=88.91
S:  Product=USB2.0-BT
C:* #Ifs= 2 Cfg#= 1 Atr=c0 MxPwr=100mA
I:* If#= 0 Alt= 0 #EPs= 3 Cls=e0(wlcon) Sub=01 Prot=01 Driver=btusb
E:  Ad=81(I) Atr=03(Int.) MxPS=  16 Ivl=1ms
E:  Ad=02(O) Atr=02(Bulk) MxPS=  64 Ivl=0ms
E:  Ad=82(I) Atr=02(Bulk) MxPS=  64 Ivl=0ms
I:* If#= 1 Alt= 0 #EPs= 2 Cls=e0(wlcon) Sub=01 Prot=01 Driver=btusb
E:  Ad=03(O) Atr=01(Isoc) MxPS=   0 Ivl=1ms
E:  Ad=83(I) Atr=01(Isoc) MxPS=   0 Ivl=1ms
I:  If#= 1 Alt= 1 #EPs= 2 Cls=e0(wlcon) Sub=01 Prot=01 Driver=btusb
E:  Ad=03(O) Atr=01(Isoc) MxPS=   9 Ivl=1ms
E:  Ad=83(I) Atr=01(Isoc) MxPS=   9 Ivl=1ms
I:  If#= 1 Alt= 2 #EPs= 2 Cls=e0(wlcon) Sub=01 Prot=01 Driver=btusb
E:  Ad=03(O) Atr=01(Isoc) MxPS=  17 Ivl=1ms
E:  Ad=83(I) Atr=01(Isoc) MxPS=  17 Ivl=1ms
I:  If#= 1 Alt= 3 #EPs= 2 Cls=e0(wlcon) Sub=01 Prot=01 Driver=btusb
E:  Ad=03(O) Atr=01(Isoc) MxPS=  25 Ivl=1ms
E:  Ad=83(I) Atr=01(Isoc) MxPS=  25 Ivl=1ms
I:  If#= 1 Alt= 4 #EPs= 2 Cls=e0(wlcon) Sub=01 Prot=01 Driver=btusb
E:  Ad=03(O) Atr=01(Isoc) MxPS=  33 Ivl=1ms
E:  Ad=83(I) Atr=01(Isoc) MxPS=  33 Ivl=1ms
I:  If#= 1 Alt= 5 #EPs= 2 Cls=e0(wlcon) Sub=01 Prot=01 Driver=btusb
E:  Ad=03(O) Atr=01(Isoc) MxPS=  49 Ivl=1ms
E:  Ad=83(I) Atr=01(Isoc) MxPS=  49 Ivl=1ms
```

```bash
sudo cat /sys/kernel/debug/usb/devices | grep Vendor=33fa -A8
```

```
P:  Vendor=33fa ProdID=0010 Rev=88.91
S:  Product=USB2.0-BT
C:* #Ifs= 2 Cfg#= 1 Atr=c0 MxPwr=100mA
I:* If#= 0 Alt= 0 #EPs= 3 Cls=e0(wlcon) Sub=01 Prot=01 Driver=btusb
E:  Ad=81(I) Atr=03(Int.) MxPS=  16 Ivl=1ms
E:  Ad=02(O) Atr=02(Bulk) MxPS=  64 Ivl=0ms
E:  Ad=82(I) Atr=02(Bulk) MxPS=  64 Ivl=0ms
I:* If#= 1 Alt= 0 #EPs= 2 Cls=e0(wlcon) Sub=01 Prot=01 Driver=btusb
E:  Ad=03(O) Atr=01(Isoc) MxPS=   0 Ivl=1ms
```