---

title: 'OpenCart: Bulk update prices of Products'
slug: bulk-update-product-prices-opencart-phpmyadmin-mysql
tags: ['how-to', 'opencart', 'mysql']
date: 2015-02-13
---

Changing the currency of an OpenCart store

- update product price
- update discount and special prices
- update order totals

MySQL Commands
---
Multiply all prices in a column by 3.67000008
    
```sql
UPDATE `oc_product` SET `price` = `price` * 3.670008
```

Round the numbers of an entire column

```sql
UPDATE `oc_product` SET `price` = ROUND(`price`)
```
 
Select `price` column and create a new column ROUND(`price`) by rounding the value of `price`

```sql
SELECT `price`, ROUND(`price`) from `oc_product`
```

#### Why?
I have an opencart that is setup with multiple currencies. When it started, the currency was USD and all the prices were entered in USD but later on we wanted to show AED so another currency was set up and a conversion rate was used to convert USD prices and show them in AED to the users. The side effect of this was having to enter the product prices in USD (after taking a calculator and converting price) while the business worked in AED. 

#### Solution
To fix this, i needed to a) multiply (multiply because USD is stronger than AED, otherwise it'd have been divide) the USD prices with a certain amount to get the equivalent of AED and b) change the default store currency.

I also had to update product discounts:

```sql
UPDATE `oc_product_discount` SET `price` = `price` * 3.67000008;
UPDATE `oc_product_discount` SET `price` = ROUND(`price`)
```

and product specials:

```sql
UPDATE `oc_product_special` SET `price` = `price` * 3.67000008;
UPDATE `oc_product_special` SET `price` = ROUND(`price`)
```
