---
date: 2022-01-18
title: Making the Logitech Unifying Receiver work on Ubuntu Linux with an MX Master 3 mouse
---

tl;dr: install [Solaar](https://pwr-solaar.github.io/Solaar/)

```bash
sudo apt install -y solaar
```

![Solaar GUI screenshot](../images/solaar-screenshot.png)

I have been using a Logitech MX Master 3 for well over a year now. I had originally connected it to my Ubuntu system via Bluetooth after finding out that the _Unifying Received_ is not officially supported for Linux.

Recently, i enabled hibernation for Ubuntu and one issue i come across every now and then is that when it comes back from hibernation, the bluetooth is turned off. And no amounts of _running commands via Termnial_ seems to fix it.

Because of this, the mouse stops working every time i get back from hibernation and i end up restarting to fix the disabled bluetooth, which defeats the whole point of hibernating in the first place..

Since my efforts at fixing the bluetooth were fruitless (and i didn't have the hours to spend to dig deeper), i instead looked for a solution to making the Unifying Receiver work.

Enters Solaar, and the solution is pretty straight forward, took me less than four minutes to get the mouse working without Bluetooth pairing.

For Ubuntu 16.04+ Solaar is available in the official universal repository
