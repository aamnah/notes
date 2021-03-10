---
title: Handling permissions in Expo
date: 2020-07-14
---

```bash
expo install expo-permissions
```

- You can check if a permission is granted with `Permissions.getAsync(...permissionTypes)` and ask for a permission with `Permissions.askAsync(...types)`
- Both return a `Promise` with has `status` and `expires` as well as details about scope
- The `status` is usually `granted` or `denied`. It could also be `undetermined` in case of `Permissions.NOTIFICATIONS` for iOS, as iOS does not disambiguate `undetermined` from `denied`
- Make sure you're basing your logic on `granted` and `!granted` to account for cases like `undetermined` that only happen on iOS and only for some permissions
- on iOS remote notifications only show if `allowsSound`, `allowsAlert` or `allowsBadge` is set.

* There are about a dozen permission types

  - NOTIFICATIONS
  - USER_FACING_NOTIFICATIONS
  - LOCATION
  - CAMERA
  - AUDIO_RECORDING
  - CONTACTS
  - CAMERA_ROLL
  - CALENDAR
  - REMINDERS
  - SYSTEM_BRIGHTNESS
  - MOTION

```js
async function alertIfRemoteNotificationsDisabledAsync() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  if (status !== 'granted') {
    alert('Hey! You might want to enable notifications for my app, they are good.')
  }
}
```

```js
async function checkMultiPermissions() {
  const { status, expires, permissions } = await Permissions.getAsync(Permissions.CALENDAR, Permissions.CONTACTS)
  if (status !== 'granted') {
    alert('Hey! You heve not enabled selected permissions')
  }
}
```

Here's an example asking for permissions for push notifications..

```js
const askPermissions = async () => {
  // See if app already has permission
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  let finalStatus = existingStatus

  // No existing permisson, ask for it
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Permission denied
  if (finalStatus !== 'granted') {
    return false
  }

  return true
}
```

## Links

- [Permissions- SDK 38](https://docs.expo.io/versions/v38.0.0/sdk/permissions/)
- [Permissions- SDK 35](https://docs.expo.io/versions/v35.0.0/sdk/permissions/)
