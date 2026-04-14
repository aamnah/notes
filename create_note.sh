#!/bin/bash

# Usage:
#   create_note.sh                      create a new note named by DATE_UUID in uncategorized/
#   create_note.sh "a post title"       create a new note with a slugified, date-prefixed filename in uncategorized/
#   create_note.sh -h | --help          show this help

set -euo pipefail
# set strict mode
# -e means exit when error, do not proceed
# -u means referring to unset (undefined) variables will error out
# -o pipefail means use the exit code of the failure inside the pipeline instead of the last command

# Figure out script directory
# going through the trouble so that directory path is not hardcoded
# because the location of this repo changes on different devices
NOTES_DIR="$(cd "$(dirname "$(realpath "$0")")" && pwd)"
# "$0" - the path the script was invoked as
# realpath "$0" - resolves $0 o a canonical absolute path (follows symlinks)
# dirname "$(realpath "$0")" - strips the filename, leaving just the directory
# cd "$(dirname ...)" && pwd — cd into that directory, then pwd prints the current working directory

# Show usage
if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  sed -n '3,6p' "$0" | sed 's/^# \{0,1\}//'
  exit 0
fi

# Default target for new notes
TARGET_DIR="${NOTES_DIR}/uncategorized"
mkdir -p "$TARGET_DIR"

DATE_UUID=$(date '+%Y-%m-%d-%H%M%S') # 2026-04-14-171053
DATE_STRING=$(date '+%Y-%m-%dT%H:%M:%S%:z') # 2023-11-19T11:55:40+02:00
TITLE="$*" # $* treats all args as one string "$1 $2 $3"
SLUG=$(echo "$TITLE" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
# Slug explained:
  # echo '      this is a post   ' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | tr " " "-" # this-is-a-post

  # use sed to trim space from beginning and end
  # use tr to replace spaces with -
  # use tr to make the slug lowercase

if [ -n "$SLUG" ]; then
  # if filename is provided, use that prefixed with date
  FILENAME="${DATE_UUID}-${SLUG}.md"
else
  # if no filename provided, use the UUID as the filename
  FILENAME="${DATE_UUID}.md"
fi

FILEPATH="${TARGET_DIR}/${FILENAME}"

if [ -e "$FILEPATH" ]; then
  echo "File already exists: $FILEPATH" >&2
  exit 1
fi

cat > "$FILEPATH" <<EOF
---
title: ${TITLE}
date: ${DATE_STRING}
uuid: ${DATE_UUID}
slug: ${SLUG}
draft: true
description:
tags:
---
EOF

# echo "$FILEPATH"
code "$FILEPATH"
