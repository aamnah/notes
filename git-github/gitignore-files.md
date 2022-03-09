---

title: What to .gitignore
slug: files-gitignore
date: 2015-01-19
---

- Cache folders (`.DS_Store`, `sass_cache`)
- Modules/Packages folders generated by dependency managers (`node_modules`, `vendor`)
- Any folders that can be easily regenrated on the other end by a config file
- Configuration files. Anything that contains private usernames and passwords

Following are common files added to my `.gitignore`

```bash
# Mac OS X
.DS_Store
*/.DS_Store

# Opencart
image/cache
system/cache # OC 1x
system/storage/cache # OC 2x
vqmod/vqcache

# Webhost
cgi-bin

# Dependency and Package folders
node_modules
vendor

# Sass
sass_cache
```