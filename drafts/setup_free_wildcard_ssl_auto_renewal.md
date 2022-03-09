---
title: Setup free Wildcard SSL and automatic renewal
slug: setup_free_wildcard_ssl_auto_renewal
date: 2020-01-29
lastmod: 2020-07-31
draft: true
---

#### tl;dr

```bash
sudo wget -O -  https://get.acme.sh | sh

export  AWS_ACCESS_KEY_ID='XXXXXXXXXX'
export  AWS_SECRET_ACCESS_KEY='XXXXXXXXXXXXXXXXXXXX'

acme.sh --issue --dns dns_aws -d '*.mydomain.com'
```

---

### The Plan

I'm going to setup a wildcard SSL with automatic renewal by setting up an integration with Amazon Route 53

Why do i need the Route 53 integration? Because every time a certificate is renewed, it generates new TXT records that you need to update at the server. If i don't do the integration to automate it all, i'll have to manually update the records every three months or else the certificate won't work.

### The Process

- install `acme.sh`
- [setup a user](https://github.com/acmesh-official/acme.sh/wiki/How-to-use-Amazon-Route53-API) at Amazon Route 53 and get API keys
- add your AWS API keys to the config file by exporting them
- [use DNS API mode](https://github.com/acmesh-official/acme.sh/wiki/dnsapi#10-use-amazon-route53-domain-api) to generate the wildcard certificate (so that it automatically updates TXT records needed for renewal)
  - You speciy a DNS Api with the `--dns` flag.
  - `dns_aws` is the one for Amazon Route 53

Here's a script to take care of it all. Update the variables before running it

```bash
MAIN_DOMAIN='example.com' # FQDN, without the www
WILDCARD_DOMAIN='*.example.com' # all subsomains, www is automatically included
ACCOUNT_EMAIL='webmaster@example.com' # this is where renewal emails will be sent
AWS_ACCESS_KEY_ID='XXXXXXXXXX'
AWS_SECRET_ACCESS_KEY='XXXXXXXXXXXXXXX'

# install socat if you're going to use standalone mode (recommended)
sudo apt-get install socat

# sudo curl https://get.acme.sh | sh # sudo is not required but recommended
sudo wget -O -  https://get.acme.sh | sh

# enable auto-upgrade for acme.sh (optional)
acme.sh --upgrade --auto-upgrade

# add AWS config to conf file
# these will be saved in ~/.acme.sh/account.conf and reused when needed
export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

# specify email used to register account to Let's Encrypt,
# you will receive renewal notice email here. Default is empty.
export ACCOUNT_EMAIL=${ACCOUNT_EMAIL}

# generate SSL
acme.sh --issue --dns dns_aws -d ${MAIN_DOMAIN} -d ${WILDCARD_DOMAIN}
```

After the install is succesful, it'll tell you where all the generated files are (usually `~/.acme.sh/domain.com/`). It'll also give you a link where you can download the cert from (useful when you need to share the cert)

```
https://acme-v02.api.letsencrypt.org/acme/cert/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Issuing a wildcard certifcate is simple, just pass a wildcard domain to the `-d` flag,

```bash
acme.sh  --issue -d example.com  -d '*.example.com'  --dns dns_aws
```

All certs are renewed automatically every **60** days

### Downloading the generated files

In case you need all the files that were generated and not just the cert, create an archive of all files with `tar`

```bash
tar -czvf mydaomin.com.tar.gz mydomain.com/
```

and download on your system with `scp`

```bash
# scp -i ~/.ssh/SSH_KEY REMOTE_USER@REMOTE_SERVER:REMOTE_FILE_PATH LOCAL_SAVE_LOCATION
scp -i ~/.ssh/id_rsa root@myserver.com:home/root/mydomain.tar.gz ~/Downloads
```

#### Maintenance

```bash
# update acme.sh to the latest code
acme.sh --upgrade

# enable auto upgrade
acme.sh --upgrade --auto-upgrade

# Disable auto upgrade
acme.sh --upgrade --auto-upgrade 0
```

#### Troubleshooting

If you get `acme.sh: command not found` after install, either restart your Terminal, or source the `~/.bashrc`/`~/.bash_profile`/`~/.zshrc` to make sure the `acme.sh` alias has been added

```bash
source ~/.bashrc
```

## Links

- [acme.sh](https://github.com/acmesh-official/acme.sh)
- [acme.sh - How to issue a cert](https://github.com/acmesh-official/acme.sh/wiki/How-to-issue-a-cert)
- [acme.sh - How to use Amazon Route53 API](https://github.com/acmesh-official/acme.sh/wiki/How-to-use-Amazon-Route53-API)
- [acme.sh - Advanced installation](https://github.com/acmesh-official/acme.sh/wiki/How-to-install#4-advanced-installation)
- [`tar`](https://notes.aamnah.com/commands/tar-compressed-archives/)
- [`scp`](https://notes.aamnah.com/commands/scp-secure-copy/)
