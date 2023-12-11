#!/bin/bash

<<usage
# Commands
> notes - open the notes repo/dir in VS code
> notes new - create a new note in the notes dir with a UUID based on date as the filename
> notes new "this is a post title" - create a new note in the notes dir with the filename being the title converted to a slug, prefixed with UUID based on date

# TODO
- 'if' filename is provided, use that prefixed with date
- 'if' no filename provided, use the UUID as the filename
- prefix filename with date
- 'if' slug has spaces ' ', replace them with hypens '-'
- add template
usage


DATE_UUID=$(date '+%Y%m%d%H%M%S') # 20231119115517
DATE_STRING=$(date '+%Y-%m-%dT%H:%M:%S%:z') # 2023-11-19T11:55:40+02:00
TITLE="$1"
SLUG=$(echo "${1}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | tr " " "-" | tr "[:upper:]" "[:lower:]")
EXTENSION=".md"
FILENAME="${DATE_UUID}-${SLUG}${EXTENSION}"

create_slug() { 
  # echo '      this is a post   ' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | tr " " "-" # this-is-a-post
  
  # use sed to trim space from beginning and end
  # use tr to replace spaces with -
  # TODO: make the slug lowercase
  SLUG=$(echo "${1}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | tr " " "-" | tr "[:upper:]" "[:lower:]")
  return $SLUG
}

create_file() {
  # if filename is provided, use that prefixed with date
  # if no filename provided, use the UUID as the filename
  touch "${FILENAME}"
}

add_template() {
  echo -e "---
title: ${TITLE}
date: ${DATE_STRING}
uuid: ${DATE_UUID}
slug: ${SLUG}
draft: true
description: 
tags: 
---
" >> ${FILENAME}
}

open_in_vscode() {
  DIR='/media/amna/Files/Sites/notes'
  code $DIR
}



create_file
add_template

if [ "$#" == 0 ]; then
open_in_vscode
fi



notes() {

  DIR='/media/amna/Files/Sites/notes'

  if [ "$#" == 0 ]; then
    code $DIR
  fi

  if [ "$1" == 'new' ]; then
    EXT='.md'
    PREFIX=$(date '+')
    touch 

  fi
}

