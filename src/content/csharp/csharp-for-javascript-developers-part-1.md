---
path: csharp-for-javascript-developers-part-1
title: C# for JavaScript developers - part 1
description: Intro to C# and .NET - what the project structure looks like, how to build and run the project etc.
date: 2020-05-14
---

### Project Structure

```
├── src
│   └── MyProject
└── test
```

- `src` will have all the source code for the project and `test` will have unit tests
- inside `src` you can have multiple projects or components that make up a larger project
- `.csproj` means it's a C# project. It contains info about your project
- `Program.cs` contains the starting code
  `dotnet run` picks up the `.csproj` file in the folder by default

```
├── src
│   └── MyProject
│       ├── bin
│       │   └── Debug
│       │       └── netcoreapp3.0
│       │           ├── MyProject
│       │           ├── MyProject.deps.json
│       │           ├── MyProject.dll
│       │           ├── MyProject.pdb
│       │           ├── MyProject.runtimeconfig.dev.json
│       │           └── MyProject.runtimeconfig.json
│       ├── MyProject.csproj
│       ├── obj
│       │   ├── Debug
│       │   │   └── netcoreapp3.0
│       │   │       ├── MyProject
│       │   │       ├── MyProject.AssemblyInfo.cs
│       │   │       ├── MyProject.AssemblyInfoInputs.cache
│       │   │       ├── MyProject.assets.cache
│       │   │       ├── MyProject.csprojAssemblyReference.cache
│       │   │       ├── MyProject.csproj.FileListAbsolute.txt
│       │   │       ├── MyProject.dll
│       │   │       └── MyProject.pdb
│       │   ├── MyProject.csproj.nuget.cache
│       │   ├── MyProject.csproj.nuget.dgspec.json
│       │   ├── MyProject.csproj.nuget.g.props
│       │   ├── MyProject.csproj.nuget.g.targets
│       │   └── project.assets.json
│       └── Program.cs
└── test
```

- `bin/` is where your build output (i.e. binaries, aka assembly) would go
- `obj/` is a temp folder that is created during the restore/build process. You can delete this safely
- You can `.gitignore` both `bin/` and `obj/` folders

```bash
bin/ # equivalent of public/
obj/ # equivalent of node_modules/
```

### Running the project

```bash
dotnet run # from within the directory that contains .csproj
dotnet run --project src/GardeBook # give it a directory where .csproj is
```

`dotnet run` = `dotnet restore` -> `dotnet build`

### Passing params to the project

```bash
dotnet run BLAH # params for the dotnet CLI
dotnet run -- BLAH # params for the application
```

### NuGet

```bash
dotnet restore # equivalent of `npm install`
dotnet build # takes .cs files and compiles into a binary DLL
```

### Assembly

An _assembly_ in .NET Core is what the output of the C# compiler is, your code in binary format. It'll be in a folder called `bin` (short for binary)

Inside `bin/` you'll have `Debug`, which just means this build is easier to debug

```bash
dotnet run # will restore, build, find the .dll and run it
dotnet bin/Debug/netcoreapp3.0/MyProject.dll # run the assembly manually
```

The entry point of an application (by convention) is `Main()`. `dotnet run` will look for a method named `Main` and execute the code inside it

### Exceptions

- an _exception_ represents an error condition
- _handled_ exception = yes, i expected this error to occur
- _unhandled_ exception = halt/crash your program, .NET runtime won't allow program to continue executing
