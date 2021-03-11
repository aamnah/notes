---
title: React Native Animations
date: 2019-01-30
---


Async communication between the JS thread and UI thread. This async nature can block your gestures while something else is running on the JS thread, and you never know if your callbacks will be resolved in 16ms (the time required to render 1 frames at 60fps). An update every 16ms.

- react-native-reanimated
- react-native-gesture-handler


```bash
expo install react-native-reanimated react-native-gesture-handler
```