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

There are various ways of doing this:

- Change the URL from the site admin (will not update post content)
- Do it manually by running SQL queries on the database (effective, but _may_ cause issues with serialized data)
- Use `wp-cli` to update the site URL (not sure how effective on multisite networks, also redundant as it will not update post content)
- Use a [search and replace tool](https://github.com/interconnectit/Search-Replace-DB) to do a dry run and run SQL queries

#### Change URL from Admin

Change URL from the Dashboard > Settings first and see how/where it updates the values in the database. Another option is changing it via `wp-cli`

```bash
wp option update home 'http://newsiteurl.com'
wp option update siteurl 'http://newsiteurl.com'
```

#### Use search and replace tool

Use this recommended [search and replace tool by Interconnect IT](https://github.com/interconnectit/Search-Replace-DB) to run your queries (you can also do a safe dry run). You should be wary of updating database fields, something to do with WordPress storing data in serialized arrays and PHP relying on the _string length_ of each piece of data to be able to read it properly.. [ref](https://wordpress.stackexchange.com/a/54225)

#### Manually editing database

Do this for all sites in the network

| Table name    | Desc.                                                                                                                                                                                                                                           | Notes                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `wp_options`  | Select the options table and look for the entries named `siteurl`, `home` (and `fileupload_url`)                                                                                                                                                | required to have the http:// at the beginning                             |
| `wp_site`     |                                                                                                                                                                                                                                                 | can NOT have http:// or a trailing slash at the end of the domain name    |
| `wp_sitemeta` | Select the option named `siteurl` name.                                                                                                                                                                                                         | required to have http:// at the beginning and a trailing slash at the end |
| `wp_blogs`    | Select any entries in the `domains` column that have the old domain                                                                                                                                                                             | can NOT have http:// or a trailing slash at the end of the domain name    |
| `wp_#options` | Each sub-site will have sets of tables that correspond to the `blog_id` in the `wp_blogs` table. You need to go to the `wp#_options` table, where `#` corresponds to the `blog_id`, and update the `siteurl` and `home` settings in that table. |                                                                           |
| `wp_posts`    | URL is mentioned in the `guid` and sometimes in `post_content`                                                                                                                                                                                  |                                                                           |

```sql
-- find the places where the URL is used

-- Main domain site
SELECT * FROM `wp_blogs` WHERE `domain` LIKE CONCAT('%', 'old.siteurl.com', '%'); -- has the main site for the entire network and paths for individual sites
SELECT * FROM `wp_site` WHERE `domain` LIKE CONCAT('%', 'old.siteurl.com', '%');
SELECT * FROM `wp_sitemeta` WHERE `meta_value` LIKE CONCAT('%', 'old.siteurl.com', '%');
SELECT * FROM `wp_options` WHERE `option_value` LIKE CONCAT('%', 'old.siteurl.com', '%');
SELECT * FROM `wp_posts` WHERE `guid` LIKE CONCAT('%', 'old.siteurl.com', '%'); -- this guid is kind of like permalink, mentions the entire site URL
SELECT * FROM `wp_posts` WHERE `post_content` LIKE CONCAT('%', 'old.siteurl.com', '%'); -- media file links
SELECT * FROM `wp_postmeta` WHERE `meta_value` LIKE CONCAT('%', 'old.siteurl.com', '%');

-- Additional sites
SELECT * FROM `wp_2_options` WHERE `option_value` LIKE CONCAT('%', 'old.siteurl.com', '%');
SELECT * FROM `wp_2_posts` WHERE `guid` LIKE CONCAT('%', 'old.siteurl.com', '%');
SELECT * FROM `wp_2_posts` WHERE `post_content` LIKE CONCAT('%', 'old.siteurl.com', '%');
SELECT * FROM `wp_2_postmeta` WHERE `meta_value` LIKE CONCAT('%', 'old.siteurl.com', '%');
```

```sql
-- replace old URL with new URL
UPDATE `wp_blogs` SET `domain` = REPLACE(domain, 'www.oldurl.com', 'www.newurl.com');-- must NOT have http:// or a trailing slash
UPDATE `wp_site` SET `domain` = REPLACE(domain, 'www.oldurl.com', 'www.newurl.com'); -- must NOT have http:// or a trailing slash
UPDATE `wp_options` SET `option_value` = REPLACE(option_value, 'http://www.oldurl', 'http://www.newurl') WHERE option_name = 'home' OR option_name = 'siteurl';
UPDATE `wp_posts` SET `guid` = REPLACE(guid, 'http://www.oldurl','http://www.newurl');
UPDATE `wp_posts` SET `post_content` = REPLACE(post_content, 'http://www.oldurl', 'http://www.newurl');
UPDATE `wp_postmeta` SET `meta_value` = REPLACE(meta_value,'http://www.oldurl','http://www.newurl');
```

- the `guid` in `wp_posts` is kind of like permalink, mentions the entire site URL. Consequently, the results for `guid` will be a lot more than `post_content` which is checking for links inside the post content itself. (7457 vs. 253)

You also need to check for **directory paths** if you have changed them during the migration. For example `/var/www/html/wp-content/` vs. `/var/www/mysite.com/public_html/wp-content/`

```sql
-- Main domain site
UPDATE wp_options SET option_value = REPLACE(option_value, '/var/www/html/wp-content/', '/var/www/mysite.com/public_html/wp-content/');

-- Additional sites
UPDATE wp_2_options SET option_value = REPLACE(option_value, '/var/www/html/wp-content/', '/var/www/mysite.com/public_html/wp-content/');
```

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
- [Moving WordPress Multisite](https://wordpress.org/support/article/moving-wordpress/#moving-wordpress-multisite)
- [Changing The Site URL](https://wordpress.org/support/article/changing-the-site-url/)
- [SQL LIKE Keyword](https://www.w3schools.com/sql/sql_ref_like.asp)
- [Update WordPress posts for SSL https](https://github.com/aamnah/notes/blob/main/content/databases/WP_update-posts-https.md)
