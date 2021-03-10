---
title: Notes on React Navigation v5
slug: notes-react-navigation
date: 2020-08-04
---

Options that you want to apply to all screen in a navigator are passed as `screenOptions` to the `Navigator`

```tsx
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>This is home screen</Text>
      <Button onPress={() => navigation.navigate('Other')} title="Go to other screen" />
    </View>
  )
}

function OtherScreen() {
  return (
    <View>
      <Text>This is another screen. Tap the Back icon to go back to Home</Text>
    </View>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Other" component={OtherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
```

### Moving to another screen

Pass the `navigation` param to the component, and use `navigation.navigate('screenName')` to navigate to that screen. `screenName` is whatever value you gave for `name` when setting up the screen in a navigator.

```tsx
function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>This is home screen</Text>
      <Button onPress={() => navigation.navigate('Other')} title="Go to other screen" />
    </View>
  )
}
```
