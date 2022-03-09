---
slug: http-server-with-ssl-https
title: HTTPS Secure Server with SSL for local development
date: 2020-06-09
---

## ngrok

```bash
# install on Ubuntus
sudo snap install ngrok

# connect your account
ngrok authtoken XXXXXXXXXXXXXjeZhwV6zXXXXXXXXXXpvyAj5yKXXXXXXXXXX

# start tunnel
ngrok http 443

# point ngrok to your local web server
# 127.0.0.1:8080 is default url for http-server
ngrok http 127.0.0.1:8080 -host-header="127.0.0.1:8080"
```

Keep in mind that `ngrok` is not a [web server](https://stackoverflow.com/a/41177042), it won't work for development. It's just a _tunnel_ that'll make _your webserver_ available over HTTPS

## http-server

```bash
# install
npm i -g http-server

# go to the folder where all global node modules are installed
cd `npm root -g`

# go to http-server
cd http-server/bin

# create an SSL cert
# https://github.com/http-party/http-server#tlsssl
# give 127.0.0.1 for common name
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

# add alias so it always starts with SSL
alias http-server='cd $(npm root -g)/http-server/bin/ && ./http-server -S -C cert.pem'
```

This entire thing is probably flawed since we want to serve within a directory and not want to `cd` to node root every time.

If i try to use keys (`cert.pem` and `key.pem`) from a different directory than the one from where i am running `http-server` it fails to find the key.

I guess i have to generate new keys inside every folder where i want to run it?
