---
title: Trigger a Netlify build when a Github repo is updated
date: 2023-10-17
draft: true
---

## Why?
I have a separate repo linked to my Hugo site as a Hugo module. That repo contains all the content for my notes section and is separate from the repo for my main website. The main website gets automatically deployed by Netlify.

What does not happen right now is that whenever i update the content for the notes section, the site does not get updated as a deployment is not triggered by Netlify.

## How?
Build hooks.

Netlify allows you to trigger deploys when a webhook is called, and Github allows you to call webhooks after a `push` is made. We link the two and that should take care of triggering deploys for us.