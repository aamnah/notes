#!/bin/bash

DATE_UUID=$(date '+%Y%m%d%H%M%S')
DATE_STRING=$(date '+%Y-%m-%dT%H:%M:%S%:z')
SLUG=$1
EXTENSION="md"
FILENAME="${DATE_UUID}-${SLUG}.${EXTENSION}"

# prefix filename with date
# if slug has spaces ' ', replace them with hypens '-'
# add template

create_file() {
  touch "${FILENAME}"
}

add_template() {
  echo -e "---
title: 
date: ${DATE_STRING}
uuid: ${DATE_UUID}
slug: ${SLUG}
description: 
---
" >> ${FILENAME}
}

create_file
add_template