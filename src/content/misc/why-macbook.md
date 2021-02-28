---
title: Why a MacBook (and the Apple ecosystem)
description: some background on my use cases and preferences between macOS, Windows, and Ubuntu
date: 2021-02-28
slug: why-macbook
tags:
  - personal
  - opinion
---

Why i wanted to get a MacBook is a question i get often. The simple reason is this: i'm a designer developer combo, and the Apple ecosystem serves me well.

The development is good on Linux (Ubuntu), but limited because you can't test or run iOS apps.

And the design also works with Figma (which i absolutely love because it is awesome and works on Linux and that they have a free version!), but is limited when it comes to image editing. You can't beat Photoshop and Illustrator with Figma when it comes to designing custom illustrations and editing rastor photos. For example, you can't even add a drop shadow to the shape of an object inside and image in Figma, it'll just add the shadow to the entire image, i.e. a square shadow around the borders of the image file instead of the object inside it. Designing icons and logos which involve custom shapes is possible with Figma, but sub-optimal. You can't use Figma for illustrations if you are serious about your illustration work.

MacBooks (and macOS) have the best of both worlds as they get the best design software as well as the best development software. The support for Apple ecosystem when it comes to releasing software for my use case is top notch. Apple is a first class citizen in the world of design and coding.

You might consider an Apple machine _expensive_ if you're considering it only in terms of specs. But i don't consider the decision just in terms of specs. I consider what software and support is available (all the best software for my use case is available for macOS). I consider how reliable the machine is (it is very reliable). I consider how long it will last (MacBooks easily last 5-7 years without an upgrade. The last one i got was a MacBook Air in 2013..). I consider the quality of the hardware (aluminum body means sturdy, nothing beats the trackpad, or the screen, or the speaker..). I consider portability (the battery life is literally all day).

I consider the ROI because i don't see it as an expense, i see it as an investment. It's an investment in equipment. Getting a MacBook for me is like getting a camera for a photographer. It pays off in the end because your work improves and you deliver better results. It's a long term investment.

Also, i do have other systems. This is not my only machine. I have a custom built PC and a Lenovo ThinkPad laptop as well. Both are dual-boot Windows and Ubuntu. I don't limit my exposure, and because of that, my opinions are well-informed. I have used Windows extensively, and i have used Ubuntu extensively, and i have used OSX and macOS extensively. I have both Android and iOS phones too and both an Android tablet and an iPad Pro. I have been a multi-system pro for almost a decade now. My preference for the Apple ecosystem is based on almost 13 years of using all these systems.

There are little things that i prefer in one or the other:

- The three-finger swipe left/right to move between full screen apps is the best experienced on MacBooks. Three finger swipe up to neatly see all the apps you have open (i.e. Mission Control) is also something i love. I have tried to implement this on Ubuntu with some libraries but it sometimes won't work. On Windows i have tried to do it with the mouse, didn't like it much. Nothing has come close, in my experience, to how good the trackpad is and how simple the **swipe gestures** are on a MacBook. As a matter of fact, the trackpad is so good that i have rarely used the Logitech MX Master 3 i got. Multi-tasking gets a boost because of these gestures. On Ubuntu i press the Windows/Logo key to see everything and search for an application right away. On Windows, i can search right after pressing the Windows key, but it doesn't show me all the apps i have open. Alternatively, i can press Windows+Tab to see all the app i have open, but it won't let me type to find and open an app..

- **AirDrop** between Apple devices is also something that i absolutely love and have not found in other systems. Sharing files between the iPad and the iPhone and the MacBook is as easy as drag and drop. No setting up networks and shared drives. No configuring your WiFi for public access. No pairing over WiFi or bluetooth. AirDrop is a nonsense setup. As a matter of act, it's a _non-setup_ to be honest because you barely have to do anything for it to work. It just works in a brilliantly simple way. You drag and drop and file gets copied to the other device.

- **WSL2** on Windows fails for me because of their SSH issues. Annoys me good when i can't even pull from a repo because my SSH key gets denied.
  Then copying files between Windows and WSL2 is also not an easy thing, you gotta do it in a hacky way.

- I don't do **gaming** much, so that point is moot. But Windows obviously wins here, unless you only want to play a very limited set of games? Nothing beats the amount of mainstream game titles available for Windows. The games i played in the last year were Anno 1404, Destiny 2, Insurgency, Stronghold and League of Legends. Insurgency and Stronghold were available for classic macs but with macOS Catalina, Macs dropped support for 32-bit applications, so [goodbye to all the 32-bit games](https://support.steampowered.com/kb_article.php?ref=1055-ISJM-8568). None of these games are available for Ubuntu, not even a competition there. I prefer playing FPS games on console (Xbox) and strategy and MMORPG on Windows.

- **Installing apps** on macOS is also simpler, you drag and drop and you're done. On Windows you click Next, click Accept, click Next, wait for a loading bar, click Finish, and then you're done. Package managers have made life easier of course. I preferred `apt` over the Mac App Store for some time until i found out about `brew`, and that made me happy because i can install and manage software from the command line and install/remove/update a bunch of them simultaneously in one go. `choco` does that for Windows, but you gotta run Powershell as Administrator.

- **Terminals**. iTerm2 is the best, it has tabs and tmux support baked in. Copy/pasting is also simpler, you just `Cmd+C` and `Cmd+V`. Ubuntu Terminal is a second close, has tabs, copy pasting is `Cmd+Shift+C` and `Cmd+Shift+V`. The Windows Terminal has been a disappointing experience for a long time. They finally released a decent enough [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701#activetab=pivot:overviewtab) recently, and they were super excited about it having tabs.. The `Ctrl+Alt+T` shortcut on Ubuntu to open a Terminal is a personal favorite.

- **Window management and resizing**. macOS has nothing built-in in terms of shortcuts, you do have swipe-gestures to move between full screen apps, and you have [Split View](https://support.apple.com/en-us/HT204948). But if you install [Rectangle](https://github.com/rxhanson/Rectangle) you get all sorts of shortcuts and layouts. On Windows, you have `Logo+ARROW` to move between half or 1/4th of the screen and they work pretty well. If you install [Microsoft PowerToys](https://docs.microsoft.com/en-us/windows/powertoys/), you get _Fancy Zones_, which lets you customize your layouts. On Ubuntu, you also get `Logo+ARROW` to split windows and maximize/minimize them. It only splits to left and right half though, you can move a window to top-right unlike Windows. But you do get shortcuts to move between _Workspaces_ `Ctrl+Alt_ARROW` and move applications between different workspaces `Ctrl+Shift+Alt+ARROW`, which i use and they work well.

- Software is better for Apple for the design and development category. The quality of that software is usually better as well.

My first preference has been Apple (OSX, macOS, iOS) for a decade now. The second one is always Ubuntu. Windows i have only used for gaming and some design work that i couldn't do on Linux.
