---
title: Creating and Viewing HTML Files with Python
date: 2014-08-26
lastmod: 2026-04-14
uuid: 20140826000000
slug: create-view-html-files-with-in-python
tags:
  - python
---

Writing HTML is just writing a string to a `.html` file. Python gives you the file I/O; your string is the markup.

## Writing an HTML file

```python
f = open('helloworld.html', 'w')

message = """<html>
<head></head>
<body><p>Hello World!</p></body>
</html>"""

f.write(message)
f.close()
```

`'w'` is write mode — creates a new file, overwrites if one exists. Other modes you'll see: `'r'` (read), `'a'` (append).

Modern style uses a `with` block so the file closes automatically:

```python
with open('helloworld.html', 'w') as f:
    f.write(message)
```

## Opening it in a browser

Python's stdlib has a `webbrowser` module that opens a URL (or a local file) in the default browser:

```python
import webbrowser
webbrowser.open_new_tab('helloworld.html')
```

On macOS/Linux you may need the full `file://` path for it to resolve:

```python
webbrowser.open_new_tab('file:///Users/foo/Desktop/helloworld.html')
```

## Wrapping data as HTML

The point of generating HTML from Python is usually to dump **data** into a viewable file — a word frequency list, scrape results, a report. The recipe:

1. Build the body as a string (concatenate, loop, `join`, or f-strings)
2. Drop it into an HTML template
3. Write to disk, open in browser

```python
import datetime, webbrowser

def wrap_html(program, url, body):
    now = datetime.datetime.today().strftime("%Y%m%d-%H%M%S")
    filename = f"{program}.html"

    template = f"""<html>
    <head><title>{program} output - {now}</title></head>
    <body>
      <p>URL: <a href="{url}">{url}</a></p>
      <p>{body}</p>
    </body>
    </html>"""

    with open(filename, 'w') as f:
        f.write(template)

    webbrowser.open_new_tab(filename)
```

Usage — e.g. dumping a word frequency list:

```python
body = ""
for word, count in sorted_freq:
    body += f"{word}: {count}<br />"

wrap_html("word-freq", "http://example.com/source", body)
```

The original lessons use `%s` string interpolation (`frame % 'banana'`). f-strings (Python 3.6+) are the modern equivalent and read more cleanly.
