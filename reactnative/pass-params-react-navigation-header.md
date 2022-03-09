---
title: Passing params to React Navigation Header in Functional Components
slug: pass-params-react-navigation-header-functional-components
date: 2020-07-22
---

You set the param first with `navigation.setParams`. If it's gonna change often, you'll probably set it in `useEffect()`

```jsx
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'

export function Conversations() {
  const navigation = useNavigation()

  const [showArchived, setShowArchived] = useState(false)
  const [search, setSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    navigation.setParams({ showArchived })
    navigation.setParams({ setShowArchived })
    navigation.setParams({ isSearching })
    navigation.setParams({ setIsSearching })
    navigation.setParams({ search })
    navigation.setParams({ setSearch })
  }, [showArchived, isSearching, search])

return ()
}

Conversations.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationStackProp<NavigationRoute>,
}): NavigationStackOptions => {
  const showArchived = navigation.getParam('showArchived', false)
  const setShowArchived = navigation.getParam('setShowArchived', false)
  const isSearching = navigation.getParam('isSearching', false)
  const setIsSearching = navigation.getParam('setIsSearching', false)
  const search = navigation.getParam('search', '')
  const setSearch = navigation.getParam('setSearch', '')

  return {}
}
```
