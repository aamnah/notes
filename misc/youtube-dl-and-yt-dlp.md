---
title: yt-dlp install on Ubuntu 22.04
date: 2023-03-01
description: yt-dlp is a youtube-dl fork with additional features and fixes
---

```bash
# upgrade pip
python3.10 -m pip install --upgrade pip

# install yt-dlp
pip3 install yt-dlp
```

On Ubuntu, you have to run commands with `python3` and `pip3`

Config files can be created at:

- `~/yt-dlp.conf` for user-specific config 
- `/etc/yt-dlp.conf` for system-wide config

Here's my sample config

```
# User config: ~/yt-dlp.conf
# System config: /etc/yt-dlp.conf

# Always extract audio (-x or --extract-audio)
--extract-audio

# Always save Audio in MP3 format
--audio-format mp3

# Save all files to this location
-o /home/USERNAME/Mounts/Media/Music/%(title)s.%(ext)s
```

I always only want mp3 audio files and want them saved in my external drive

```bash
# Usage
yt-dlp https://www.youtube.com/watch?v=gsNaR6FRuO0
```

Links
---

- [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- [youtube-dl](https://github.com/ytdl-org/youtube-dl/)