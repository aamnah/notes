---
title: Aliases in PowerShell
date: 2021-04-06
---

```powershell
# code $PROFILE.CurrentUserAllHosts
code $PROFILE
```

```powershell
# Aliases for directories
Function goToProjects {Set-Location -Path G:\Projects}

Set-Alias -Name proj -Value goToProjects
```

- The profile for the current user is at `$PROFILE`, but there are other ones for [various hosts and all users](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.1#the-profile-variable) as well
- You can set aliases for commands, but you can not set aliases for commands that also take parameters. The workaround is to save the command with parameters as a function and then have an alias for that function instead of the command

## Links

- [About Profiles](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.1)
- [Set-Alias](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/set-alias?view=powershell-7.1)
