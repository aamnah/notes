---
title: Changing the domain of a WordPress multisite setup
date: 2020-04-30
path: wordpress_multisite_transfer_update_domain
---

import { Gist } from "../components/common"

You need to update five different tables in the database in order to change the domain, as well as updating the `wp-config.php` file

The following SQL script takes care of updating all tables in one go. Make sure to replace `newdomain.com` and `olddomain.com` (minus the `http://` at the begining and `/` at the end) with the domain you want to change to before running the SQL commands

In `wp-config.php`, update the following line:

```php
define( 'DOMAIN_CURRENT_SITE', 'newdomain.com' );
```

<Gist id="98a0c31bb9fc3fff27de00cf4c172c8d" file="updateDomain.sql"/>
