---
title: Create a sublime text snippet to insert a slug
date: 2024-07-21T01:03:59+03:00
uuid: 20240721010359
slug: create-a-sublime-text-snippet-to-insert-a-slug
draft: false
description: Convert filename to a slug that can be used inside a URL. Replace spaces with dashes, convert characters to lowercase and remove file extension. Insert slug values inside Sublime Text with a snippet
tags: 
- regex
---

```xml
<snippet>
  <content><![CDATA[
${1:${TM_FILENAME/([A-Z])|(\s+)|(\.[^.]+$)/(?1\l$1:)(?2-:)(?3:)/gi}}
]]></content>
  <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
  <tabTrigger>slug</tabTrigger> 
  <!-- Optional: Set a scope to limit where the snippet will trigger -->
  <!-- <scope>source.markdown</scope> -->
  <!-- Optional: Description to show in the menu -->
  <description>Convert filename to a slug that can be used inside a URL. Replace spaces with dashes, convert characters to lowercase and remove file extension</description>
</snippet>
```

Results:

```
ai-image-generation.md -> ai-image-generation
Online card payments.md -> online-card-payments
some Random FIle NAME with blah.txt -> some-random-file-name-with-blah
```

Usage:

Type `slug`and press <kbd>Tab</kbd>

- _Preferences > Browse Packages.._ will open the `Packages/User` folder for you
- A snippet is an XML file saved with the extension `.sublime-snippet`
- Sublime Text uses Perl style regex
- Works in all file types.
- Will return nothing for files that are not saved, i.e. _untitled_ new files.



Explanation for 

```bash
${1:${TM_FILENAME/([A-Z])|(\s+)|(\.[^.]+$)/(?1\l$1:)(?2-:)(?3:)/g}}
```
- `$1` is a field marker, it means first position for your cursor
- `${1:$TM_FULLNAME}` means you're using the variable`$TM_FULLNAME` as the default value for field marker `$1`
- `${TM_FILENAME}` is an environment variable that gives you the file name
- the pattern for the regex string is `${TM_FILENAME/find/replace/g}`
- you can do multiple substitutions by finding and substituting _groups_. A group is within `()`
- `|` means OR. `(A)|(B)|(C)` would match for group `(A)` or `(B)` or `(C)`
- Back references let you reference to your matched groups with `$N`. For example `$1` would mean `(A)`, `$2` would mean `(B)` and `$3` would mean `(C)` and so on
  - `/(A)|(B)|(C)/($1)($2)($3)/` would equal the original string
- `(?1\l$1:)` goes like this:
  - If group `1` matches, replace with `\l$1` (a lowercase version of group `1` match), else with nothing. 
  - It is pretty similar to conditional (ternary) operator in JavaScript, except that the ? comes in the beginning
  - `(?1'THIS':'THAT')`
  - `?1` if group `1` is matched
  - `$1`contents of group `1` match
  - replacements are in the form of `truthy:falsy`. truthy will be executed if group matched, falsy will be executed if no match for that group was found
  - Another example: `(?{3}-:@)` - if Group `3` matched, replace with `-`, else with `@`

match groups:

- `([A-Z])`matches all uppercase word characters, group 1 
- `(\s+)` matches all whitespace characters, group 2
- `(\.[^.]+$)` matches file extensions, group 3

substitution groups:

- `(?1\l$1:)` - if group 1 is matched, replace it with lowercase version of group 1
- `(?2-:)` - if group 2 is matched, replace it with `-`
- `(?3:)` - if group 3 is matched, replace it with nothing

Links
---
- [ST Community Docs - Snippets](https://docs.sublimetext.io/guide/extensibility/snippets.html)
- [RegEx different substitutions based on groups?](https://stackoverflow.com/a/46035491/890814)
- [Perl Format String Syntax](https://www.boost.org/doc/libs/1_44_0/libs/regex/doc/html/boost_regex/format/perl_format.html)