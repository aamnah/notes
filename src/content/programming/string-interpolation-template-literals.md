---
title: String interpolation in different programming languages
date: 2020-05-16
---

Here are some interpolation examples for comparison

### Bash

```bash
#!/bin/bash
string = "${someone} was looking for ${something} in the general vicinity of ${somewhere}"
```

#### C# (\$ - string interpolation)

```c#
// csharp

// Composite formatting:
string = "Hello, {0}! Today is {1}, it's {2:HH:mm} now.", name, date.DayOfWeek, date;

// String interpolation:
string = $"{someone} was looking for {something} in the general vicinity of {somewhere}"
```

You can use conditional operators inside the interpolated expression

```c#
Console.WriteLine($"{name} is {age} year{(age == 1 ? "" : "s")} old."); // Sami is 29 years old.
```

#### JavaScript (Template literals)

```js
// javascript
string = `${someone} was looking for ${something} in the general vicinity of ${somewhere}`
```

#### Python (template strings)

```python
# python
# %s is used for strings whereas %d is used for numbers.
string = "%s was looking for %s in the general vicinity of %s" % (someone, something, somewhere)

# python 3.6
string = f"{someone} was looking for {something} in the general vicinity of {somewhere}"
```

#### Ruby

```ruby
# ruby
string = "#{someone} was looking for #{something} in the general vicinity of #{somewhere}"
```

#### PHP

PHP has a HEREDOC syntax

```php
function echo_card($title = "Default Title", $desc = "Default Description", $img = "/images/fallback.jpg") {
   $html = <<<"EOT"
      <div class="card">
         <img src="$img" alt="">
         <h2>$title</h2>
         <p>$desc</p>
      </div>
EOT;

   echo $html;
}
```

```php
echo_card($title, $desc, $img);
```
