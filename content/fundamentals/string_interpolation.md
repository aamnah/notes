---
title: String interpolation and concatenation
date: 2021-03-31
lastmod: 2022-01-12
draft: true
---

String interpolation is a process substituting values of variables into placeholders in a string.

| Language                | Concatenation Operator |
| ----------------------- | ---------------------- |
| JavaScript / TypeScript | `+`                    |
| PHP                     | `.`                    |

### Python

```python
# f-Strings
print( f"the total of {a} + {b} is: {a + b}" )
print( f"{name} is {age}" )
# f-String with a conditional
print(f"{name} is {age} years old. {'She is super cool.' if isCool else 'She is okay.'}")

# str.format()
print( "{} is {}".format(name, age) )

# string formatting operators
print( "%s is %d" % (name, age) )
```

### JavaScript

In JavaScript, we call them _template literals_

### Go

### Bash

### PHP

Concatenation operator is `.`  
Escape character is `\`

```php
<?php
$name = "Amna";
$age = 32;

// Concatenation
echo $name . ' is ' . $age . ' year(s) old.';
?>
```
