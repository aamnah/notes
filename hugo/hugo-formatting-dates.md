---
title: Formatting dates in Hugo
date: 2022-10-28
draft: true
---

```go
{{ $dateMachine := .Date | time.Format "2006-01-02T15:04:05-07:00" }}
  {{ $dateHuman := .Date | time.Format ":date_long" }}
  <time datetime="{{ $dateMachine }}">{{ $dateHuman }}</time>
```

- `01` is month and `02` is date. This one threw me off.
- `15`, `3` or `03` means Hour
- `4` or `04` is Minute
- `5` or `05` is Second
- 	"-0700" "-07:00" "-07" "-070000" "-07:00:00" are Time zone offsets

Links
---
- [time.Format](https://gohugo.io/functions/time/format/)
