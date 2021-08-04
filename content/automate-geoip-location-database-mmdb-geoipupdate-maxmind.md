---
title: Automating the updating of GeoLocation database (GeoIP2 by MaxMind)
date: 2021-08-04
slug: automate-geoip-location-database-mmdb-geoipupdate-maxmind-docker-compose-cron-direct-download
---

There are multiple ways of doing this.

- Direct download script (with cron)

```bash
GEOIPUPDATE_LICENSE_KEY=''

#https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=${GEOIPUPDATE_LICENSE_KEY}&suffix=tar.gz

curl "https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=${GEOIPUPDATE_LICENSE_KEY}&suffix=tar.gz" -o GeoLite2-Country.tar.gz \
  && tar -xzvf GeoLite2-Country.tar.gz \
  && mkdir -p /var/opt/maxmind/ \
  && mv GeoLite2-Country_*/GeoLite2-Country.mmdb /var/opt/maxmind/GeoLite2-Country.mmdb
```

- [geoipupdate](https://dev.maxmind.com/geoip/updating-databases) tool with cron

```conf
# top of crontab
MAILTO=your@email.com

38 2 * * 0,4 /usr/local/bin/geoipupdate
# end of crontab
```

- As a [Docker container](https://github.com/whitfin/docker-geoipupdate) using `geoipupdate` tool
- As part of `docker.compose.yml` using official Docker container for [geoipupdate](https://hub.docker.com/r/maxmindinc/geoipupdate)

```yml
geoipupdate:
  container_name: geoip_update
  image: maxmindinc/geoipupdate
  restart: unless-stopped
  environment:
    GEOIPUPDATE_ACCOUNT_ID: ${GEOIPUPDATE_ACCOUNT_ID}
    GEOIPUPDATE_LICENSE_KEY: ${GEOIPUPDATE_LICENSE_KEY}
    GEOIPUPDATE_EDITION_IDS: GeoLite2-Country
    GEOIPUPDATE_FREQUENCY: 96 # number of hours between geoipupdate runs, 96 is four days, GeoIP2 Country is updated twice weekly on Tuesdays and Fridays
  volumes:
    - ./data/maxmind:/usr/local/share/GeoIP
```

This assumes you have a `.env` file in the project root that has your account ID and license key. Otherwise you can just hard code these values

```conf
# .env

# MaxMind Credentials
GEOIPUPDATE_ACCOUNT_ID=123456
GEOIPUPDATE_LICENSE_KEY=7CajsdbjkasbdkKj
```

## Links

- [How to download GeoLite2-Country.mmdb.gz now need to add access code](https://stackoverflow.com/questions/59946333/how-to-download-geolite2-country-mmdb-gz-now-need-to-add-access-code)
- [Docker Geoipupdate](https://github.com/whitfin/docker-geoipupdate)
- [Updating GeoIP and GeoLite Databases](https://dev.maxmind.com/geoip/updating-databases)
