---
title: Creating a Slack app that uses Webhooks to send messages to a channel
slug: create_slack_app
date: 2020-05-12
draft: true
---

## Create an app

- Create a new slack app https://api.slack.com/apps?new_app=1 or https://api.slack.com/start
- Activate Incoming Webhooks
- Add new Webhook URL for Channel (could be #channel, @username)

- (Optional) Add an icon (less than 16mb, between 500x500px and 2000x2000px) https://api.slack.com/apps/XXXXXXXX/general?

_Settings > Basic Information > Display Information_

## Sending messages

Once you have the webhook URL, you can try it out by sending it sample data

```bash
curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/XXXXXX/YYYYYY/XyXyY123xxxY
```

This will post a fairly straight forward `Hello, World!` message to your channel

![monit-slack-message-screenshot](./images/monit-slack-message-screenshot.png)

## Customizing message layout

Block kit

## Links

- [https://api.slack.com/start](https://api.slack.com/start)
- [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks)
