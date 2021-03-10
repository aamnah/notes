---
title: Notes on hosting my own email server
date: 2020-08-28
status: draft
slug: host-email-server-postfix-dovecot
---

- MUA is an email client (Outlook or Thunderbird)
- MTA transmits email between servers (applications like Exim, sendmail, Postfix, and qmail)
- MDA gets messages from server into user's inbox using protocols like IMAP and POP(Dovecot)

### Postfix and Dovecot

Postifx and Dovecot is a great combination. Previosuly, you could install both of them with `mail-stack-delivery`, but now it only installs `dovecot-core` and does no config as part of the install.

```bash
DOMAIN=domain.tld
HOSTNAME=host.domain.tld

# install Postfix and Dovecot
# sudo apt install -y mail-stack-delivery
sudo apt install -y dovecot-core dovecot-imapd dovecot-pop3d

# Set options for Postfix for non-interactive install
debconf-set-selections <<< "postfix postfix/mailname string ${FQDN}"
debconf-set-selections <<< "postfix postfix/main_mailer_type string 'Internet Site'"
sudo apt install -y postfix

# reconfigure Postfix
# sudo dpkg-reconfigure postfix
```

You can get all Postfix configuration with

```bash
# sudo apt install debconf-utils
debconf-get-selections | grep postfix
```

### Configure Postfix

Rather than editing the configuration file directly, you can use the `postconf -e` command to change the Postfix parameters.

```bash
sudo postconf -e 'home_mailbox = Maildir/'
sudo postconf -e 'mydomain = <example.com>'
```

_maps_ or _hashes_ need to be created, these are just mroe flat files for configs..

- `/etc/mailname` contains the hostname (mail.yourdomain.com)
- `/etc/postfix/virtual` maps email addresses to a username (pattern of `<email@domain.com> <username>`)

```conf
# Mail server identity options
sudo postconf -e 'mydomain = domain.tld'

# FQDN
sudo postconf -e 'myhostname = host.domain.tld'

# FQDN and some common alternate names
sudo postconf -e 'mydestination = $mydomain, $myhostname, localhost.$myhostname, , localhost'

# your local LAN network segment in CIDR notation
sudo postconf -e 'mynetworks = 127.0.0.0/8 192.168.0.0/24 [::ffff:127.0.0.0]/104 [::1]/128'
```

```conf
## Customized Dovecot and virtual user-specific settings
canonical_maps = hash:/etc/postfix/canonical
home_mailbox = Maildir/
message_size_limit = 104857600
virtual_alias_maps = hash:/etc/postfix/virtual
virtual_mailbox_domains = hash:/etc/postfix/virtual-mailbox-domains
virtual_mailbox_maps = hash:/etc/postfix/virtual-mailbox-users
virtual_transport = dovecot

## This setting will generate an error if you restart Postfix before
## adding the appropriate service definition in master.cf, so make
## sure to get that taken care of!
dovecot_destination_recipient_limit = 1

## Other customized mail server settings
default_destination_concurrency_limit = 5
disable_vrfy_command = yes
relay_destination_concurrency_limit = 1
```

### Firewall

```bash
sudo ufw allow Postfix
```

### SSL configuration

```conf
## customized TLS parameters

# ask remote servers to identify themselves with a certificate.
smtpd_tls_ask_ccert = yes

smtpd_tls_cert_file = /etc/ssl/private/ssl-chain-mail-yourdomain.pem
smtpd_tls_key_file = /etc/ssl/private/ssl-key-decrypted-mail-yourdomain.key

# smtpd_tls_CAfile is used by Postfix to validate remote servers' certificates.
# Ubuntu comes with a large Certificate Authority bundle file at /etc/ssl/certs/ca-certificates.crt
smtpd_tls_CAfile = /etc/ssl/certs/ca-certificates.crt
smtpd_tls_ciphers = high
smtpd_tls_loglevel = 1

# "May" tells Postfix that it should use SSL/TLS if the remote host supports it.
smtpd_tls_security_level = may
smtpd_tls_session_cache_timeout = 3600s
```

`smtpd_tls_ask_ccert = yes` should be set

```bash
# Email to send renewal and security notices to
EMAIL=me@domain.com

# Domains to install cert on (comma separated list)
FQDNS="mail.domain.com"

sudo apt install -y certbot

sudo certbot certonly --standalone --agree-tos --non-interactive --email ${EMAIL} --domains ${FQDNS}
```

Certs are saved in `/etc/letsencrypt/live/mail.domain.com`

```
cert.pem
chain.pem
fullchain.pem
privkey.pem
```

in `/etc/dovecot/conf.d/10-ssl.conf` add

```bash
ssl = required
ssl_cert = </etc/letsencrypt/live/mail.domain.com/fullchain.pem
ssl_key = </etc/letsencrypt/live/mail.domain.com/privkey.pem
```

```bash
systemctl restart dovecot.service
```

read also https://wiki.dovecot.org/SSL/DovecotConfiguration

```bash
# Update /etc/postfix/main.cf
sudo postconf -e 'smtpd_tls_cert_file = /etc/letsencrypt/live/<your.domain>/fullchain.pem'
sudo postconf -e 'smtpd_tls_key_file = /etc/letsencrypt/live/<your.domain>/privkey.pem'
```

```bash
systemctl restart postfix.service
```

read also http://www.postfix.org/TLS_README.html

#### Secure the SSL keys

```bash
chown root:root ssl-key-*
chmod 400 ssl-key-*
```

```bash
/etc/letsencrypt/cli.ini
```

### smtpd config

```conf
# don't reveal too much info about your system, just the minimum correct response required
smtpd_banner = $myhostname ESMTP

# remote servers must identify themselves before you'll accept e-mail commands from them - spammers often don't issue proper HELO responses.
smtpd_helo_required = yes

smtpd_helo_restrictions = permit_mynetworks,
	reject_non_fqdn_helo_hostname, reject_invalid_helo_hostname,
	reject_unknown_helo_hostname, permit
smtpd_recipient_restrictions = reject_unknown_client_hostname,
	reject_unknown_sender_domain, reject_unknown_recipient_domain,
	reject_unauth_pipelining, permit_mynetworks,
	permit_sasl_authenticated, reject_unauth_destination,
	reject_invalid_hostname, reject_non_fqdn_sender
smtpd_sender_restrictions = reject_unknown_sender_domain,
	reject_sender_login_mismatch
smtpd_sender_login_maps = $virtual_mailbox_maps

## Dealing with rejection: use permanent 550 errors to stop retries
# reject messages that match the our rejection criteria with a 550 error,
# which should tell the remote server that its message wasn't delivered and it shouldn't try to send it again
# (as opposed to the default 450 error, which implies that the remote server should retry sending.
unknown_address_reject_code = 550
unknown_hostname_reject_code = 550
unknown_client_reject_code = 550
```

### Setting up SMTP authentication

- `smtpd` is the SMTP daemon—the process that sends mail

```bash
# SASL is the protocol that Dovecot uses to authenticate itself to Postfix

# have Postfix advertise AUTH support (default: no)
sudo postconf -e 'broken_sasl_auth_clients = yes'

# Enable SASL authentication in the Postfix SMTP server. (default: no)
sudo postconf -e 'smtpd_sasl_auth_enable = yes'

# Report the SASL authenticated user name in the smtpd Received message header. (default: no)
sudo postconf -e 'smtpd_sasl_authenticated_header = yes'

# The name of the Postfix SMTP server's local SASL authentication realm. e.g. $mydomain or $myhostname (default: empty)
sudo postconf -e 'smtpd_sasl_local_domain = $myhostname'

# Implementation-specific information that the Postfix SMTP server passes through to the SASL plug-in implementation that is selected with smtpd_sasl_type. Typically this specifies the name of a configuration file or rendezvous point. (default: smtpd)
sudo postconf -e 'smtpd_sasl_path = private/auth'

# Restrict what authentication mechanisms the Postfix SMTP server will offer to the client. The list of available authentication mechanisms is dependent on smtpd_sasl_type. (default: noanonymous)
sudo postconf -e 'smtpd_sasl_security_options = noanonymous'

sudo postconf -e 'smtpd_sasl_type = dovecot'
sudo postconf -e 'smtpd_recipient_restrictions = permit_sasl_authenticated,permit_mynetworks,reject_unauth_destination'
```

```bash
# TLS configuration
# configure Postfix to provide TLS encryption for both incoming and outgoing mail.

# Ask a remote SMTP client for a client certificate. (default: no)
sudo postconf -e 'smtpd_tls_ask_ccert = yes'

# may is for Opportunistic TLS: announce STARTTLS support to remote SMTP clients, but do not require that clients use TLS encryption.  (default: empty)
sudo postconf -e 'smtp_tls_security_level = may'
sudo postconf -e 'smtpd_tls_security_level = may'

# 1 means Log only a summary message on TLS handshake completion  — no logging of client certificate trust-chain verification errors if client certificate verification is not required. (default: 0)
sudo postconf -e 'smtpd_tls_loglevel = 1'

# Log the hostname of a remote SMTP server that offers STARTTLS, when TLS is not already enabled for that server. (default: no)
sudo postconf -e 'smtp_tls_note_starttls_offer = yes'

# Request that the Postfix SMTP server produces Received: message headers that include information about the protocol and cipher used, as well as the remote SMTP client CommonName and client certificate issuer CommonName. This is disabled by default, as the information may be modified in transit through other mail servers. Only information that was recorded by the final destination can be trusted. (default: no)
sudo postconf -e 'smtpd_tls_received_header = yes'

# Enable only "HIGH" grade OpenSSL ciphers.  (default: medium)
sudo postconf -e 'smtpd_tls_ciphers = high'
```

### Mapping email addresses to user accounts (virtual aliases)

```bash
sudo nano /etc/postfix/virtual
```

```
postmaster@example.com root
root@example.com root
info@exampe.com info
```

```bash
# Postfix is final destination for the specified list of virtual alias domains, that is, domains for which all addresses are aliased to addresses in other local or remote domains.
# Example: virtual_alias_domains = virtual1.tld virtual2.tld
sudo postconf -e 'virtual_alias_domains = $mydomain'

sudo postconf -e 'virtual_alias_maps = hash:/etc/postfix/virtual'

sudo postmap /etc/postfix/virtual

sudo systemctl restart postfix
```

### Hardening

- Allow only specified users to login via SSH

```bash
sudo nano /etc/ssh/sshd_config
```

```
AllowUsers youraccount
```

```bash
sudo restart ssh
```

### Config files

- Postfix configuration `/etc/postfix/main.cf`

### Hosting email for multiple domains

External DNS for example1.com

```
example1.com      7200 MX 10 mail.example1.com.
mail.example1.com 3600 A  213.xx.xx.xx
```

External DNS for example2.com

```
example2.com      7200 MX 10 mail.example1.com.
mail.example1.com 3600 A  213.xx.xx.xx
```

### DKIM, SPF and PTR

You ARE NOT emailing Yahoo and AOL and sometimes Time Warner, Google, Microsoft, Comcast and a few other carriers without adding setting up RDNS (PTR) records to this list.

Then add SPF records into the mix. This won't help with the first two places without RDNS but they really improve your reputation.

## Links

- [How to run your own e-mail server with your own domain](https://arstechnica.com/information-technology/2014/02/how-to-run-your-own-e-mail-server-with-your-own-domain-part-1/1/)
- [Mail Stack Delivery](https://jaas.ai/u/ivoks/mail-stack-delivery)
- [What replaced mail-stack-delivery?](https://askubuntu.com/questions/1234960/what-replaced-mail-stack-delivery)
- [How to use Let’s Encrypt certificates with Postfix/Dovecot software](https://community.letsencrypt.org/t/how-to-use-lets-encrypt-certificates-with-postfix-dovecot-software/94689/2)
- [A Simple Setup and Installation Script for Let's Encrypt SSL Certificates](https://www.exratione.com/2016/06/a-simple-setup-and-installation-script-for-lets-encrypt-ssl-certificates)
- [Let's Encrypt / Dovecot / Postfix / UFW firewall / Certbot](https://gist.github.com/mrothNET/cb6f313e9cbe896f3e0fdec80ad2f3fa)
- [How to secure Postfix using Let’s Encrypt](https://upcloud.com/community/tutorials/secure-postfix-using-lets-encrypt/)
- [Hosting multiple domains on a single email server with one IP](https://serverfault.com/questions/385054/hosting-multiple-domains-on-a-single-email-server-with-one-ip)
- [How to setup a Postfix SMTP-only for multiple domains](https://serverfault.com/a/234816)
- [postfix Manual](http://www.postfix.org/postconf.5.html)
- [Taking e-mail back, part 2: Arming your server with Postfix and Dovecot](https://arstechnica.com/information-technology/2014/03/taking-e-mail-back-part-2-arming-your-server-with-postfix-dovecot)
- [Taking e-mail back, part 3: Fortifying your box against spammers](https://arstechnica.com/information-technology/2014/03/taking-e-mail-back-part-3-fortifying-your-box-against-spammers/)
- [Taking e-mail back, part 4: The finale, with webmail & everything after](https://arstechnica.com/information-technology/2014/04/taking-e-mail-back-part-4-the-finale-with-webmail-everything-after/)
