---
title: Automatically sort import statements in React projects
date: 2020-07-28
slug: sort-import-statements-react-eslint-automatic
---

### Why

Less cognitive load, faster file scanning!

### Solution

ESLint! Because:

- it'll do it automatically on file save
- it'll do it for the other devs in the team as well

### Config

```bash
npm i -D eslint eslint-plugin-import @typescript-eslint/parser
```

My config is in YAML because i prefer YAML (it has comments). You can [convert it to JSON](https://www.convertjson.com/yaml-to-json.htm) if you use JSOn.

```yml
# .eslintrc.yaml
# Configuration: https://eslint.org/docs/user-guide/configuring
# Using with Prettier: https://prettier.io/docs/en/integrating-with-linters.html#recommended-configuration

extends:
  - eslint:recommended
  - plugin:import/errors
  - plugin:import/warnings
  - plugin:import/typescript

plugins:
  - import

settings:
  import/resolver:
    node:
      extensions: ['.js', '.jsx', '.ts', '.tsx']
      moduleDirectory: ['node_modules', 'src/']

rules:
  import/order:
    - error
    - groups:
        - builtin
        - external
        - internal
        - - parent
          - sibling
      pathGroups:
        - pattern: react
          group: external
          position: before
      pathGroupsExcludedImportTypes:
        - builtin
      newlines-between: always
      alphabetize:
        order: asc
        caseInsensitive: true
```

### Result

```jsx
// React import (Always at the top)
import React, { useState, useEffect } from 'react'

// External
import { LinearGradient } from 'expo-linear-gradient'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationActions, NavigationRoute } from 'react-navigation'
import { useNavigation } from 'react-navigation-hooks'
import { NavigationStackOptions, NavigationStackProp } from 'react-navigation-stack'
import { useDispatch, useSelector } from 'react-redux'

// Internal imports
import { SvgIcon } from 'components/icons'
import { Routes } from 'components/navigation'
import { Profile as TextLocalization } from 'helpers'
import { selectUser } from 'store/auth'
import { contactStateSelector, sendContact, clearContact, selectContactStateById } from 'store/contact'
import { archiveConversationRequest } from 'store/conversation'
import { selectConversationByUserId } from 'store/conversations'
import { blockUserRequest } from 'store/report'
import { RootState } from 'store/rootReducer'
import { getUserDetails, clearUser, getUserByIdSelector } from 'store/user'
import { UserSearch, ContactType, ContactState, UserDetails, UserProfile } from 'types'

// Parent & Sibling imports
import { Dimension, Color } from '../../Theme'
import { DateTimeUtils, Localization, Sex } from '../../utils'
import OptionsMenu, { Option } from '../common/OptionsMenu'
import { Carousel } from '../profile/Carousel'
import { ProfileActionButton } from '../profile/ProfileActionButton'
import { ProfileTabs } from '../profile/ProfileTabs'
import { styles, placeholderBgColor, placeholderFgColor, viewportWidth } from './Profile.style'
```

## Troubleshooting
- If VS Code Prettier isn't formatting on Save, set Prettier as the [Default Formatter](https://github.com/microsoft/vscode/issues/108447#issuecomment-706642248) in Settings
- Enable ESLint as a formatter, and set it as the default formatter for VS Code, that'll format the doument for import statements.

## Links

- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)
- [import/order: Enforce a convention in module import order](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md)
- [Sorting your imports correctly in React](https://dev.to/otamnitram/sorting-your-imports-correctly-in-react-213m)
