---
title: Netlify Functions and Netlify Edge Functions
date: 2023-12-30T11:17:41+02:00
uuid: 20231230111741
slug: netlify-edge-functions
draft: true
description: 
tags: 
---

## URLs and Paths

The default URLs for Netlify Functions are:

```
# Directory
YOUR_BASE_DIRECTORY/netlify/functions

# Local (Netlify Dev)
http://localhost:8888/.netlify/functions/<FUNCTION NAME>

# Deployed
https://<YOUR DOMAIN>/.netlify/functions/<FUNCTION NAME>
```

and for Netlify Edge Functions:

```
# Directory
YOUR_BASE_DIRECTORY/netlify/edge-functions

# Local (Netlify Dev)
http://localhost:8888/<FUNCTION PATH>

# Deployed
yoursitename.netlify.app/<FUNCTION NAME>
```

## Troubleshooting

### Returning HTML instead of expected JSON
Check the URL for the function. It is most likely not hitting the right URL and the function is not being called.