---
title: Download audio from YouTube with youtube-dl
date: 2019-04-09
lastmod: 2019-10-21

---


```bash
# install latest youtube-dl version
#sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
#sudo wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl
#sudo chmod a+rx /usr/local/bin/youtube-dl

# Ubuntu
# an older version is available in the repos. 
# You can install that and run with `--update` to get to the latest version
sudo apt install youtube-dl
youtube-dl --update

source ~/.bashrc 

# install ffmpeg to be able to convert video files to audio
sudo apt install -y ffmpeg

# macOS
# brew install youtube-dl ffmpeg
```

```bash
youtbe-dl -x https://www.youtube.com/watch?v=xvtBAXM-YZs -o ~/Music/%(title)s.%(ext)s
```

You can also `sudo apt install youtube-dl -y` but that installs an outdated version. (Installed 2018.03.14 for me when the latest was 2019.07.02) on July 10, 2019. And 2019.07.02 when the latest was 2019.10.16 on October 21, 2019. That's 12 versions older.

To upgrade the version, pass it the `-U` or `--update` flag. Run with `sudo` if needed

```bash
sudo youtube-dl --update
```

### Saving config

```bash
# create conf file
sudo nano /etc/youtube-dl.conf
```

Add the following to it and save

```
# Always extract audio (-x or --extract-audio)
--extract-audio

# Always save Audio in MP3 format
--audio-format mp3

# Save all files to a specific folder
#-o /mnt/d/Music/%(title)s.%(ext)s

# Save to the Linux User's Music dircetory
-o /home/${USER}/Music/%(title)s.%(ext)s
```

Now you only need tp pass the URL and that's it.

```bash
youtbe-dl https://www.youtube.com/watch?v=xvtBAXM-YZs
```

### Add an alias
I got tired of typing the complete `youtube-dl` all the time so i added an alias for it.

```bash
# '~/.bash_aliases' on Ubuntu or '~/.bash_profile' on macOS
alias ydl='youtube-dl'
```

the command now becomes

```bash
ydl https://www.youtube.com/watch?v=xvtBAXM-YZs
```


Links
---

- [github: youtube-dl](https://github.com/ytdl-org/youtube-dl)
