---
title: Python 3.x on macOS
date: 2021-03-20
---

The official [Python 3.9.2](https://www.python.org/downloads/release/python-392/) installer is not yet available for Apple Silicon Macs. `pyenv` is a better approach because it also lets you install and switch between multiple versions.

```bash
brew install pyenv

# Add pyenv init to your shell to enable shims and autocompletion.
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc
source ~/.zshrc

# install python version
pyenv install 3.9.2
```

You can see all installed versions with `pyenv versions` and set a version with `pyenv global 3.9.2`

```bash
pyenv versions
```

```
* system (set by /Users/aamnah/.pyenv/version)
  3.9.2
```

```
pyenv global 3.9.2
```

```
pyenv version
# 3.9.2 (set by /Users/aamnah/.pyenv/version)

python --version
# Python 3.9.2
```

## Links

- [The right and wrong way to set Python 3 as default on a Mac](https://opensource.com/article/19/5/python-3-default-mac)
- [pyenv](https://github.com/pyenv/pyenv)
