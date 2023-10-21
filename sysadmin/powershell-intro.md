---
title: Powershell - An intro
date: 2023-09-14
---


Writing a line to the Terminal

```bash
echo "Hello World!"
```

```ps1
Write-Host "Hello World!"
```


In PowerShell, commands are called _CmdLets_ (pronounced Command-lets). They are given a 'Verb'-'Noun' format. For example: `Get-Date`, `Write-Host`. 

`Get-Command` will output all available CmdLets. You can also get a filtered command list by passing it the verb as an argument to the `-Verb` flag. For example: `Get-Command -Verb Get`. Usually the verbs are pretty self-explanatory. For example: `Get`, `Remove`, `Install`, `Rename`, `Set` and so on.. 

```
PS /Users/aamnah> Get-Command -Verb Rename

CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Cmdlet          Rename-Item                                        7.0.0.0    Microsoft.PowerShell.Management
Cmdlet          Rename-ItemProperty                                7.0.0.0    Microsoft.PowerShell.Management
```

Similarly, you can filter by noun. For example: `Get-Command -Noun Host`

```
PS /Users/aamnah> Get-Command -Noun Host

CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Function        Clear-Host                                                    
Cmdlet          Get-Host                                           7.0.0.0    Microsoft.PowerShell.Utility
Cmdlet          Out-Host                                           7.3.6.500  Microsoft.PowerShell.Core
Cmdlet          Read-Host                                          7.0.0.0    Microsoft.PowerShell.Utility
Cmdlet          Write-Host                                         7.0.0.0    Microsoft.PowerShell.Utility
```

Keep in mind that not all command are available on all operating systems. PowerShell on Windows will always have more commands available than PowerShell on macOS. For example, a basic one that is available on Windows is `Get-ComputerInfo` is unavailable on macOS

macOS:

```
PS /Users/aamnah> Get-ComputerInfo         
GetComputerInfo: The term 'Get-ComputerInfo' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
```

You can check how many commands for a particular verb are available for your OS with the following command

```ps1
Get-Command -Name Get* | Measure-Object
```

- Clearing the screen output can be done with `cls`, `clear` or `Clear-Host`
- Find out PowerShell version with `$Host.version` or `$PSVersionTable`