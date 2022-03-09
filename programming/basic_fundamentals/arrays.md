---
date: 2022-01-18
title: Arrays in various languages
---

### PHP

Use `print_r()` instead of `echo` to print entire arrays. `echo` can be used to get single values

```php
<?php
  // Array (index based)
  $color = array('red', 'green', 'yellow', 'blue');

  print_r( $colors );
?>
```

```
Array
(
    [0] => red
    [1] => green
    [2] => yellow
    [3] => blue
)
```

```php
// Associative Arrays (strings as keys)
$johnny = array(
  'name' => 'Johny',
  'age' => 32,
  'job' => 'Software Engineer',
);

print_r( $johnny );
```

```
Array
(
    [name] => Johny
    [age] => 32
    [job] => Software Engineer
)
```

```php
echo $johnny['job']; // Software Engineer
```

```php
// Multidimensional (nested) Arrays (index based)
$employees = array(
  $johnny = array(
    'name' => 'Johny',
    'age' => 32,
    'job' => 'Software Engineer',
  ),
    $jack = array(
    'name' => 'Jack',
    'age' => 26,
    'job' => 'Marketing Manager',
  ),
    $jane = array(
    'name' => 'Jane',
    'age' => 23,
    'job' => 'Project Manager',
  ),
);

print_r( $employees );
```

```
Array
(
    [0] => Array
        (
            [name] => Johny
            [age] => 32
            [job] => Software Engineer
        )

    [1] => Array
        (
            [name] => Jack
            [age] => 26
            [job] => Marketing Manager
        )

    [2] => Array
        (
            [name] => Jane
            [age] => 23
            [job] => Project Manager
        )

)
```

```php
// Multidimensional (nested) Arrays (strings as keys)
$employees = array(
 'johnny' => array(
    'name' => 'Johny',
    'age' => 32,
    'job' => 'Software Engineer',
  ),
  'jack' => array(
    'name' => 'Jack',
    'age' => 26,
    'job' => 'Marketing Manager',
  ),
  'jane' => array(
    'name' => 'Jane',
    'age' => 23,
    'job' => 'Project Manager',
  ),
);

print_r( $employees );
```

```
Array
(
    [johnny] => Array
        (
            [name] => Johny
            [age] => 32
            [job] => Software Engineer
        )

    [jack] => Array
        (
            [name] => Jack
            [age] => 26
            [job] => Marketing Manager
        )

    [jane] => Array
        (
            [name] => Jane
            [age] => 23
            [job] => Project Manager
        )

)
```

```php
print_r($employees['jane']);
```

```
Array
(
    [name] => Jane
    [age] => 23
    [job] => Project Manager
)
```

```php
echo $employees['jane']; // PHP Warning:  Array to string conversion in /workspace/Main.php on line 40
```

```php
print_r($employees['jane']['job']);

// OR
echo $employees['jane']['job'];
```
