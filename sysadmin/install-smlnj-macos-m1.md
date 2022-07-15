---
title: Install Standard ML of New Jersey (SML/NJ) on M1 Apple Silicon Macs (macOS Monterey)
date: 2022-07-15
---

```bash
brew install smlnj

echo 'export PATH=/usr/local/smlnj/bin:$PATH' >> ~/.zprofile
```

Even though the path for Homebrew on Apple Silicon macs has changed to `/opt/homebrew`, SML/NJ is installed under `/usr/local/` instead. As a result, the recommended `export PATH=$(brew --prefix)/smlnj/bin:"$PATH"` on the cask documentation page does not work because `brew --prefix` will evaluate to `/opt/homebrew`

You also don't need to pass the `--cask` it seems, no longer needed.