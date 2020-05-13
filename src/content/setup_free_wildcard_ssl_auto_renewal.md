---
title: Setup free Wildcard SSL and automatic renewal
path: setup_free_wildcard_ssl_auto_renewal
date: 2020-01-29
status: draft
---

```bash
WILDCARD_DOMAIN='*.example.com'
ACCOUNT_EMAIL='' # this is where renewal emails will be sent

# install
sudo curl https://get.acme.sh | sh # sudo is not required but recommended
sudo apt-get install socat

# add AWS config to conf file
export  AWS_ACCESS_KEY_ID=XXXXXXXXXX
export  AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXX

# generate SSL
acme.sh --issue --dns dns_aws -d example.com -d ${WILDCARD_DOMAIN}
```

- setup the DNS module for adding TXT records for automatic renewal
- `--dns dns_aws` is for AWS Route 53
