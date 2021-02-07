---
title: Script for creating Shopify Product import CSV file with Python
date: 2021-02-07
slug: create_csv_shopify_product_import
---

### But why?

- You can have default values pre-populated
- You can create a CSv file ready for import right after you have scraped some data
- Why not?

This script gives you an overview of writing a CSV file with Python. I'm using a dictionary (array data) to populate the sheet

```py
# -------------------------------------
# CSV
# -------------------------------------

# Write these to a CSV file
filename = 'vivo_phones_shopify.csv'

# vivo_phones_shopify.csv file will be created in the current working
with open( filename, 'w', newline='') as file:
  # filednames = a list object which should contain the column headers specifying the order in which data should be written in the CSV file
  fieldnames = ['Handle','Title','Body (HTML)','Vendor','Type','Tags','Published','Option1 Name','Option1 Value','Option2 Name','Option2 Value','Option3 Name','Option3 Value','Variant SKU','Variant Grams','Variant Inventory Tracker','Variant Inventory Qty','Variant Inventory Policy','Variant Fulfillment Service','Variant Price','Variant Compare At Price','Variant Requires Shipping','Variant Taxable','Variant Barcode','Image Src','Image Position','Image Alt Text','Gift Card','SEO Title','SEO Description','Google Shopping / Google Product Category','Google Shopping / Gender','Google Shopping / Age Group','Google Shopping / MPN','Google Shopping / AdWords Grouping','Google Shopping / AdWords Labels','Google Shopping / Condition','Google Shopping / Custom Product','Google Shopping / Custom Label 0','Google Shopping / Custom Label 1','Google Shopping / Custom Label 2','Google Shopping / Custom Label 3','Google Shopping / Custom Label 4','Variant Image','Variant Weight Unit','Variant Tax Code','Cost per item','Status']
  writer = csv.DictWriter(file, fieldnames = fieldnames)
  # writer = csv.writer(file, fieldnames = fieldnames)

  writer.writeheader()

  for title, price, image in zip(titles, prices, images):
    # Basics
    title = title.text.strip()
    price = price.text.strip()
    image = image.get('src').strip()

    # Shopify defaults
    handle = title.lower().replace(' ', '_' ) # Required. Can't be blank or missing.
    # title = '' # Required. Can't be blank or missing.
    body_html = '' # Required, but can be blank.
    vendor = 'Vivo' # Required, but can be blank.
    product_type = 'Smartphone' # Required, but can be blank.
    tags = '' # Required, but can be blank.
    published = 'TRUE' # Required. Leaving the field blank publishes the product.
    option1_name = 'Title' # Required. Can't be blank or missing. For products with only one option, this should be set to 'Title'.
    option1_value = 'Default Title' # Required. Can't be blank or missing. For products with only one option, this should be set to 'Default Title'.
    option2_name = '' # Required, but can be blank.
    option2_value = '' # Required, but can be blank.
    option3_name = '' # Required, but can be blank.
    option3_value = '' # Required, but can be blank.
    variant_sku = '' # Required, but can be blank.
    variant_grams = '350' # Required. Can't be blank or missing. You must enter a value, even if that value is '0'.
    variant_inventory_tracker = '' # Required, but can be blank.
    variant_inventory_qty = '' # Required, but can be blank.
    variant_inventory_policy = 'continue' # Required. Can't be blank or missing. (values: continue, deny). If the existing inventory tracking options are removed, then inventory is no longer tracked.
    variant_fulfillment_service = 'manual' # Required. Can't be blank or missing. (values: manual, shipwire, amazon_marketplace_web etc.)
    variant_price = price # Required. Can't be blank or missing.
    variant_compare_at_price = '' # Required, but can be blank.
    variant_requires_shipping = 'TRUE' # Required, but can be blank.
    variant_taxable = 'FALSE' # Required, but can be blank.
    variant_barcode = '' # Required, but can be blank.
    image_src = image # Required, but can be blank.
    image_position = '' # Required, but can be blank.
    image_alt_text = '' # Required, but can be blank.
    gift_card = 'FALSE' # Required, but can be blank.
    seo_title = '' # Optional (70 chars)
    seo_description = '' # Optional (320 chars)
    google_shopping_google_product_category = '' # Optional
    google_shopping_gender = '' # Optional
    google_shopping_age_group = '' # Optional
    google_shopping_mpn = '' # Optional
    google_shopping_adwords_grouping = '' # Optional
    google_shopping_adwords_labels = '' # Optional
    google_shopping_condition = '' # Optional
    google_shopping_custom_product = '' # Optional
    google_shopping_custom_label_0 = '' # Optional
    google_shopping_custom_label_1 = '' # Optional
    google_shopping_custom_label_2 = '' # Optional
    google_shopping_custom_label_3 = '' # Optional
    google_shopping_custom_label_4 = '' # Optional
    variant_image = '' # Optional
    variant_weight_unit = 'g' # Optional (default is 'kg')
    variant_tax_code = '' # Optional. Available to: Shopify Plus plan
    cost_per_item = '' # Optional
    status = 'draft' # Required (active, draft, archived)

    # Shopify CSV
    writer.writerow({
      'Handle': handle,
      'Title': title,
      'Body (HTML)': body_html,
      'Vendor': vendor,
      'Type': product_type,
      'Tags': tags,
      'Published': published,
      'Option1 Name': option1_name,
      'Option1 Value': option1_value,
      'Option2 Name': option2_name,
      'Option2 Value': option2_value,
      'Option3 Name': option3_name,
      'Option3 Value': option3_value,
      'Variant SKU': variant_sku,
      'Variant Grams': variant_grams,
      'Variant Inventory Tracker': variant_inventory_tracker,
      'Variant Inventory Qty': variant_inventory_qty,
      'Variant Inventory Policy': variant_inventory_policy,
      'Variant Fulfillment Service': variant_fulfillment_service,
      'Variant Price': variant_price,
      'Variant Compare At Price': variant_compare_at_price,
      'Variant Requires Shipping': variant_requires_shipping,
      'Variant Taxable': variant_taxable,
      'Variant Barcode': variant_barcode,
      'Image Src': image_src,
      'Image Position': image_position,
      'Image Alt Text': image_alt_text,
      'Gift Card': gift_card,
      'SEO Title': seo_title,
      'SEO Description': seo_description,
      'Google Shopping / Google Product Category': google_shopping_google_product_category,
      'Google Shopping / Gender': google_shopping_gender,
      'Google Shopping / Age Group': google_shopping_age_group,
      'Google Shopping / MPN': google_shopping_mpn,
      'Google Shopping / AdWords Grouping': google_shopping_adwords_grouping,
      'Google Shopping / AdWords Labels': google_shopping_adwords_labels,
      'Google Shopping / Condition': google_shopping_condition,
      'Google Shopping / Custom Product': google_shopping_custom_product,
      'Google Shopping / Custom Label 0': google_shopping_custom_label_0,
      'Google Shopping / Custom Label 1': google_shopping_custom_label_1,
      'Google Shopping / Custom Label 2': google_shopping_custom_label_2,
      'Google Shopping / Custom Label 3': google_shopping_custom_label_3,
      'Google Shopping / Custom Label 4': google_shopping_custom_label_4,
      'Variant Image': variant_image,
      'Variant Weight Unit': variant_weight_unit,
      'Variant Tax Code': variant_tax_code,
      'Cost per item': cost_per_item,
      'Status' : status,
    })
```
