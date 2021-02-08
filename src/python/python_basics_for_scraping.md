---
title: Python Crash Course (Basics needed for web scraping)
description: The basics you need to know in order to scrape data from websites and compile it in CSVs
date: 2021-02-07
---

# scrape data

```py
import requests
from bs4 import BeautifulSoup

url = 'https://www.samplestore.pk/search/?keywords=amazfit&dataBi=k1'

page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')

titles = soup.select('h2.title > a')
prices = soup.select('p.price > .shop_s')

# iterate over an array
# for title in titles:
#   print(title.text)

# # iterate over values from multiple arrays
for title, price in zip(titles, prices):
  print(title.text, price.text)
```

# scrape: - find elements by classname

```py
prices = soup.select('p.price > .shop_s')
```

```py
# BeautifulSoup 4.1.2+
soup.find_all("div", class_="stylelistrowone stylelistrowtwo")
```

```py
# BeautifulSoup 4+

# single classname
mydivs = soup.find_all('div', 'class_name')

#  pass the list of class names as parameter like :
mydivs = soup.find_all('div', ['class1', 'class2'])
```

# iterate over arrays

```py
# iterate over an array
for title in titles:
  print(title.text)

for price in prices:
  print(price.text)

# iterate over values from multiple arrays
for title, price in zip(titles, prices):
  print(title.text, price.text)
```

```py
for f, b in zip(foo, bar):
  print(f, b)
```

# write a CSV from dictionary (array data)

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

## Links

- [Looping Through Multiple Lists](https://www.oreilly.com/library/view/python-cookbook/0596001673/ch01s15.html)
- [Writing CSV files in Python](https://www.programiz.com/python-programming/writing-csv-files)
- [Reading and Writing CSV Files in Python](https://realpython.com/python-csv/)
