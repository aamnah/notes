---
title: Writing a script to open all the aplications needed
date: 2020-08-10
slug: script-start-all-applications-frontend-development
status: DRAFT
---

I'm working on a React Native project these days that requires me to run 5 or so commands and open 3 or so apps every time i want to start working on the project

- Go to the project directory
- Open the project in VS Code
- Run the React Native project
- Start the emulator and load the project
- Start React Native Debugger
- Monitor abd logs
- Have a terminal ready for Git stuff (i prefer not using the one in VS Code because i want more real state for my code and don't want to have to keep resizing/hiding the panes)

For now i have an alias to run all the commands including the logs. In the future i plan on moving all this to a `tmux` session with split panes.

### Getting the prompt back

Some applications when you run them get tied to the controlling terminal. For example, i have run React Native Debugger, and i no longer need the terminal to stay open as all i needed was to run the app. But the Terminal will stay open and keep control of the prompt. If you close the terminal, it'll close the app.

Solution is saimple: you can `& disown` it and get the prompt back.

### Finding the commands/names for the applications

For example, how do i open React Native Debugger from the terminal? What's the command name?

- Go to `/usr/share/applications` (<kbd>Ctrl</kbd>+<kbd>L</kbd> in Files)
- The command to run to open an application is usually the filename minus the `.desktop` part

```bash
react-native-debugger
```

## Links

- [get the terminal back with `& disown`](https://askubuntu.com/a/721507)
