---
path: create_slack_app
title: Creating a Slack app that uses Webhooks to send messages to a channel
date: 2020-05-12
status: draft
---

## Create an app

## Sending messages

Once you have the webhook URL, you can try it out by sending it sample data

```bash
curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/XXXXXX/YYYYYY/XyXyY123xxxY
```

This will post a fairly straight forward `Hello, World!` message to your channel

![monit-slack-message-screenshot](../images/monit-slack-message-screenshot.png)

## Customizing message layout

Block kit

## Links

- [https://api.slack.com/start](https://api.slack.com/start)
- [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks)
