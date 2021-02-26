---
title: Youtube-dl on macOS
date: 2021-02-26
slug: youtube-dl-macos
---

System: M1 MacBook Pro

Install `youtube-dl` and required libraries for extracting audio and save default config

```bash
# install
# sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
# sudo chmod a+rx /usr/local/bin/youtube-dl

brew install youtube-dl ffmpeg libav

# create a config file
sudo touch /etc/youtube-dl.conf

echo "Adding default config to save videos as MP3 Audio.. \n"

# add default config
echo "# Always extract audio (-x or --extract audio)
--extract-audio

# Always save Audio in mp3 format
--audio-format mp3

# Save all files to this folder, with this title format
-o ~/Music/%(title)s.%(ext)s
" | sudo tee -a /etc/youtube-dl.conf
```
