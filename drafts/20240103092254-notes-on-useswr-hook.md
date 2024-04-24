---
title: Notes on useSWR hook
date: 2024-01-03T09:22:54+02:00
uuid: 20240103092254
slug: notes-on-useswr-hook
draft: true
description: 
tags: 
---

To avoid naming conflicts when using multiple useSWR custom hooks, you don't have to edit the _fetcher_ function, you can assign different variable names when using the hook: 

```ts
const { data, mutate, isLoading, isError } = useInit()
```

```ts
const { data: weather, mutate: mutateWeather, isLoading: isWeatherLoading, error: isWeatherError } = useWeather()
```