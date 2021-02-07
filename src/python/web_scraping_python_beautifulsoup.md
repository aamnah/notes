---
title: Scraping with Python and BeautifulSoup
date: 2021-02-07
---

### Find all H2 headings with a class of `title`

```py
import requests
from bs4 import BeautifulSoup

url = 'https://www.samplestore.pk/search/?keywords=amazfit&dataBi=k1'

page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')

# find all <h3> with a class of 'title'
# titles = soup.find_all('h2', {"class": "title"})

# As of Beautiful Soup 4.1.2, you can search by CSS class using the keyword argument class_:
titles = soup.find_all("h2", class_="title")

for title in titles:
  print(title)
```

```html
<h2 class="title">
  <a href="amazfit-stratos-multisport-gps-smartwatch.html" title="">Amazfit Stratos Multisport GPS...</a>
</h2>
<h2 class="title"><a href="amazfit-gtr-smartwatch.html" title="">Amazfit GTR Smartwatch</a></h2>
<h2 class="title"><a href="amazfit-gts-sports-smart-watch.html" title="">Amazfit GTS Sports Smart Watch</a></h2>
<h2 class="title"><a href="amazfit-bip-lite-smartwatch.html" title="">Amazfit Bip Lite Smartwatch</a></h2>
<h2 class="title"><a href="amazfit-gts-gtr-charging-cable.html" title="">Amazfit GTS/GTR Charging Cable</a></h2>
<h2 class="title"><a href="amazfit-t-rex.html" title="">Amazfit T-Rex Military Smart W...</a></h2>
<h2 class="title"><a href="amazfit-airrun-treadmill.html" title="">Amazfit AirRun Treadmill</a></h2>
<h2 class="title"><a href="amazfit-neo.html" title="">Amazfit Neo Retro Design</a></h2>
<h2 class="title"><a href="amazfit-gtr-2.html" title="">Amazfit GTR 2</a></h2>
<h2 class="title"><a href="amazfit-gts-2.html" title="">Amazfit GTS 2 Smart Watch</a></h2>
<h2 class="title"><a href="amazfit-bip-u.html" title="">Amazfit Bip U</a></h2>
```

### `select` vs `find_all`

- i prefer `select` over `find_all` because `select` and it's CSS like syntax is familiar to me as a web developer.
- `find` is a bit clunky when it comes to finding _nested_ elements.
- `select` returns an array, even if there is only one result

```py
titles = soup.find_all("h2", class_="title")
```

```html
<h2 class="title">
  <a href="amazfit-stratos-multisport-gps-smartwatch.html" title="">Amazfit Stratos Multisport GPS...</a>
</h2>
<h2 class="title"><a href="amazfit-gtr-smartwatch.html" title="">Amazfit GTR Smartwatch</a></h2>
<h2 class="title"><a href="amazfit-gts-sports-smart-watch.html" title="">Amazfit GTS Sports Smart Watch</a></h2>
<h2 class="title"><a href="amazfit-bip-lite-smartwatch.html" title="">Amazfit Bip Lite Smartwatch</a></h2>
<h2 class="title"><a href="amazfit-gts-gtr-charging-cable.html" title="">Amazfit GTS/GTR Charging Cable</a></h2>
<h2 class="title"><a href="amazfit-t-rex.html" title="">Amazfit T-Rex Military Smart W...</a></h2>
<h2 class="title"><a href="amazfit-airrun-treadmill.html" title="">Amazfit AirRun Treadmill</a></h2>
<h2 class="title"><a href="amazfit-neo.html" title="">Amazfit Neo Retro Design</a></h2>
<h2 class="title"><a href="amazfit-gtr-2.html" title="">Amazfit GTR 2</a></h2>
<h2 class="title"><a href="amazfit-gts-2.html" title="">Amazfit GTS 2 Smart Watch</a></h2>
<h2 class="title"><a href="amazfit-bip-u.html" title="">Amazfit Bip U</a></h2>
```

```py
titles = soup.select('h2.title > a')
```

```
<a href="amazfit-stratos-multisport-gps-smartwatch.html" title="">Amazfit Stratos Multisport GPS...</a>
<a href="amazfit-gtr-smartwatch.html" title="">Amazfit GTR Smartwatch</a>
<a href="amazfit-gts-sports-smart-watch.html" title="">Amazfit GTS Sports Smart Watch</a>
<a href="amazfit-bip-lite-smartwatch.html" title="">Amazfit Bip Lite Smartwatch</a>
<a href="amazfit-gts-gtr-charging-cable.html" title="">Amazfit GTS/GTR Charging Cable</a>
<a href="amazfit-t-rex.html" title="">Amazfit T-Rex Military Smart W...</a>
<a href="amazfit-airrun-treadmill.html" title="">Amazfit AirRun Treadmill</a>
<a href="amazfit-neo.html" title="">Amazfit Neo Retro Design</a>
<a href="amazfit-gtr-2.html" title="">Amazfit GTR 2</a>
<a href="amazfit-gts-2.html" title="">Amazfit GTS 2 Smart Watch</a>
<a href="amazfit-bip-u.html" title="">Amazfit Bip U</a>
```

# Scraping data

- extract data from a page/site

  - title
  - price
  - image
  - description
  - stock status (sold out, in stock)
  - discounts (price, discounted price, is there a promotion running on this product)

- create a CSV file with that data
- Crawl through all Product pages on the site and populate a spreadsheet
- Schedule the crawling to run on a frequency (e.g. once a day)

- How to find nested tags?

```py
# Write these to a CSV file
filename = 'products.csv'

# products.csv file will be created in the current working
with open( filename, 'w', newline='') as file:
  # filednames = a list object which should contain the column headers specifying the order in which data should be written in the CSV file
  fieldnames = ['Title', 'Price']
  writer = csv.DictWriter(file, fieldnames = fieldnames)

  # first row that contains the column headings
  writer.writeheader()

  for title, price in zip(titles, prices):
    writer.writerow({'Title': title.text, 'Price': price.text})
```

Here are the contents of `products.csv`

```csv
Title,Price
Amazfit Stratos Multisport GPS...,"Rs 28,000"
Amazfit GTR Smartwatch,"Rs 22,500"
Amazfit GTS Sports Smart Watch,"Rs 23,499"
Amazfit Bip Lite Smartwatch,"Rs 9,000"
Amazfit GTS/GTR Charging Cable,Rs 800
Amazfit T-Rex Military Smart W...,"Rs 23,500"
Amazfit AirRun Treadmill,"Rs 149,000"
Amazfit Neo Retro Design,"Rs 6,499"
Amazfit GTR 2,"Rs 31,499"
Amazfit GTS 2 Smart Watch,"Rs 30,599"
Amazfit Bip U,"Rs 11,000"
```
