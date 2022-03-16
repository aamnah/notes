---
title: Monitoring Ubuntu system with Monit and sending alerts in Slack
slug: server_monitoring_ubuntu_slack
date: 2020-05-12
draft: true
---

### Monit

```bash
sudo apt install monit -y

monit --version
```

### Slack

- Create an app
- Activate incoming webhooks (by installing the app to your workspace)
- Select an existing channel or create a new one (e.g. #monit)

```bash
# test the Webhook by sending sample data
curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/XXXXXX/YYYYYY/XyXyY123xxxY
```

This will post a fairly straight forward `Hello, World!` message to your channel

![monit-slack-message-screenshot](./images/monit-slack-message-screenshot.png)

```bash
sudo tee /etc/monit/slack-url <<EOF
https://hooks.slack.com/services/XXXXXX/YYYYYY/XyXyY123xxxY
EOF
```

## Links

- [Monit configuration with Slack](https://peteris.rocks/blog/monit-configuration-with-slack/)
- [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks)
