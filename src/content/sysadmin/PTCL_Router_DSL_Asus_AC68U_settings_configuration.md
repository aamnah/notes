---
title: Configure a different router (Asus AC68U) to work with PTCL Broadband
date: 2020-09-04
slug: PTCL_Router_DSL_Asus_AC68U_settings_configuration
description: Guide on using a third-party router with your PTCL Boradband connection. Setup a PPoE DSL connection on Asus AC68U to work with your PTCL phone line
---

Here's the truth: PTCL modems/routers are ancient, and they suck. The signal strength is poor, there are no Gigabit ethernet ports, there is no Wifi AC, and it starts hanging up when there are too many devices (i.e. when the family is home on occasions..). So i got a nice ADSL Asus router, it was actually a gift from my brother.

ADSL is the kind which can work with phone lines. So instead of using it as a range extender or access point where i have to connect it to the PTCL modem and then have two of them working with each other, i can just use it directly with the PTCL line and _replace_ the PTCL router completely (because it's useless). 

But in order to do that, i gotta figure out the configuration and settings, so here goes..


### Settings and configuration

First things first, take a backup of your PTCL router's existing settings. _Management > Settings > Backup_ Click the _Backup Settings_ button. This will give you a file called `backupsettings.conf`

You need to know your broadband DSL username and password. You can find this under _Advanced Setup > WAN Service_. Edit the `ppo0.1` interface, it's usually the only interface on this screen. It'll show you the `PPP Username` and `PPP Password`, note these down. If you have no idea what your password is, check the `backupsettings.conf` file, it saves all passwords in plain text. Search for `Password`.

- `VPI`: `0`
- `VCI`: `103`

Now i can transfer files wirelessly and not dread the transfer times. I can get decent signals in my bedroom upstairs (the router is in the lounge downstairs). And lastly, everyone can have 3 devices each (phone, laptop, iPad..) connected at all times and not have any connectivity issues with the router..


Links
---

- [PTCL ADSL Installation Guide](https://ptcl.com.pk/uploads/ZTE_831%20Series.pdf)