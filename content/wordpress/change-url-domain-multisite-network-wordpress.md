---
title: Changing the URL for a WordPress multisite network
date: 2021-07-27
slug: change-url-domain-multisite-network-wordpress
---

changing the URL for multisite network

1. Update database
2. Update `wp-config.php`
3. Update `.htaccess` (if needed, in case custom modifications were made to the file)

### Update database table

Change URL from the Dashboard > Settings first and see how/where it updates the values in the database. Another option is changing it via `wp-cli`

```bash
wp option update home 'http://newsiteurl.com'
wp option update siteurl 'http://newsiteurl.com'
```

Do this for all sites in the network

| Table name    | Desc.                                                                                                                                                                                                                                           | Notes                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `wp_options`  | Select the options table and look for the entries named `siteurl`, `home` (and `fileupload_url`)                                                                                                                                                | required to have the http:// at the beginning                             |
| `wp_site`     |                                                                                                                                                                                                                                                 | can NOT have http:// or a trailing slash at the end of the domain name    |
| `wp_sitemeta` | Select the option named `siteurl` name.                                                                                                                                                                                                         | required to have http:// at the beginning and a trailing slash at the end |
| `wp_blogs`    | Select any entries in the `domains` column that have the old domain                                                                                                                                                                             | can NOT have http:// or a trailing slash at the end of the domain name    |
| `wp_#options` | Each sub-site will have sets of tables that correspond to the `blog_id` in the `wp_blogs` table. You need to go to the `wp#_options` table, where `#` corresponds to the `blog_id`, and update the `siteurl` and `home` settings in that table. |                                                                           |

```sql
-- find the places where the URL is used

-- Main domain site
select * from wp_site where domain LIKE CONCAT('%', 'old.siteurl.com', '%');
select * from wp_sitemeta where meta_value LIKE CONCAT('%', 'old.siteurl.com', '%');
select * from wp_blogs where domain LIKE CONCAT('%', 'old.siteurl.com', '%');
select * from wp_options where option_value LIKE CONCAT('%', 'old.siteurl.com', '%');
select * from wp_posts where guid LIKE CONCAT('%', 'old.siteurl.com', '%');
select * from wp_posts where post_content LIKE CONCAT('%', 'old.siteurl.com', '%');
select * from wp_postmeta where meta_value LIKE CONCAT('%', 'old.siteurl.com', '%');

-- Additional sites
select * from wp_2_options where option_value LIKE CONCAT('%', 'old.siteurl.com', '%');
select * from wp_2_posts where guid LIKE CONCAT('%', 'old.siteurl.com', '%');
select * from wp_2_posts where post_content LIKE CONCAT('%', 'old.siteurl.com', '%');
select * from wp_2_postmeta where meta_value LIKE CONCAT('%', 'old.siteurl.com', '%');
```

```sql
-- replace old URL with new URL
UPDATE wp_options SET option_value = replace(option_value, 'http://www.oldurl', 'http://www.newurl') WHERE option_name = 'home' OR option_name = 'siteurl';
UPDATE wp_posts SET guid = replace(guid, 'http://www.oldurl','http://www.newurl'); -- this guid is kind of like permalink, mentions the entire site URL
UPDATE wp_posts SET post_content = replace(post_content, 'http://www.oldurl', 'http://www.newurl');
UPDATE wp_postmeta SET meta_value = replace(meta_value,'http://www.oldurl','http://www.newurl');
```

- the `guid` in `wp_posts` is kind of like permalink, mentions the entire site URL. Consequently, the results for `guid` will be a lot more than `post_content` which is checking for links inside the post content itself. (7457 vs. 253)

### Update `wp-config.php`

Update the values for `WP_HOME`, `WP_SITEURL` and `DOMAIN_CURRENT_SITE`

```php
// wp-config.php

define( 'WP_HOME', 'http://example.com' ); // <-- change this
define( 'WP_SITEURL', 'http://example.com' ); // <-- change this

define('WP_ALLOW_MULTISITE', true);
define( 'MULTISITE', true );
define( 'SUBDOMAIN_INSTALL', true );
$base = '/';
define( 'DOMAIN_CURRENT_SITE', 'old.siteurl.com' ); // <-- change this
define( 'PATH_CURRENT_SITE', '/' );
define( 'SITE_ID_CURRENT_SITE', 1 );
define( 'BLOG_ID_CURRENT_SITE', 1 );
```

## Links

- [How to Change a WordPress Multisite Primary Domain](https://www.hostgator.com/help/article/how-to-change-a-wordpress-multisite-primary-domain)
- [Moving WordPress](https://wordpress.org/support/article/moving-wordpress/)
- [Changing The Site URL](https://wordpress.org/support/article/changing-the-site-url/)
- [SQL LIKE Keyword](https://www.w3schools.com/sql/sql_ref_like.asp)
