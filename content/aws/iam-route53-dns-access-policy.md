---
title: IAM User policy to edit DNS records for selected domains
date: 2021-06-27
slug: iam-route53-dns-access-policy
---

Create the following IAM policy and attach it to the user/group

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "route53:GetHostedZone",
        "route53:GetHostedZoneCount",
        "route53:ListHostedZones",
        "route53:ListHostedZonesByName",
        "route53:ListResourceRecordSets",
        "route53:ChangeResourceRecordSets"
      ],
      "Resource": "arn:aws:route53:::hostedzone/<ZONE_ID>"
    },
    {
      "Effect": "Allow",
      "Action": [
        "route53:GetHostedZone",
        "route53:GetHostedZoneCount",
        "route53:ListHostedZones",
        "route53:ListHostedZonesByName",
        "route53:ListResourceRecordSets",
        "route53:ChangeResourceRecordSets"
      ],
      "Resource": "arn:aws:route53:::hostedzone/<ZONE_ID>"
    }
  ]
}
```

Above will only work by going directly to the domain management URL. If you were giving access to someone else, you'll have to provide them with the direct URL for every domain (as well as create their IAM user)

```
https://console.aws.amazon.com/route53/v2/hostedzones#ListRecordSets/<ZONE_ID>
```

You will not be able to list any domains in the Dashboard or get a list of the hosted domains..

If you want them to be able to list all domains as well (but only see or edit records of the selected zone IDS, you can add these three additional grants for `*` resources)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["route53:GetHostedZone", "route53:GetHostedZoneCount", "route53:ListHostedZonesByName"],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "route53:GetHostedZone",
        "route53:GetHostedZoneCount",
        "route53:ListHostedZones",
        "route53:ListHostedZonesByName",
        "route53:ListResourceRecordSets",
        "route53:ChangeResourceRecordSets"
      ],
      "Resource": "arn:aws:route53:::hostedzone/<ZONE_ID>"
    },
    {
      "Effect": "Allow",
      "Action": [
        "route53:GetHostedZone",
        "route53:GetHostedZoneCount",
        "route53:ListHostedZones",
        "route53:ListHostedZonesByName",
        "route53:ListResourceRecordSets",
        "route53:ChangeResourceRecordSets"
      ],
      "Resource": "arn:aws:route53:::hostedzone/<ZONE_ID>"
    }
  ]
}
```

Read access for all hosted zones

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "route53:GetHostedZone",
        "route53:GetHostedZoneCount",
        "route53:ListHostedZones",
        "route53:ListHostedZonesByName",
        "route53:ListResourceRecordSets"
      ],
      "Resource": "*"
    }
  ]
}
```

## Links

- [Allowing access to specific hosted zones with Route 53 and IAM](https://www.culturefoundry.com/cultivate/technology/allowing-access-to-specific-hosted-zones-with-route-53-and-iam/)
- [Using identity-based policies (IAM policies) for Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/access-control-managing-permissions.html)
