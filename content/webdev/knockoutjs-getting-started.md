---
title: KnockoutJS
date: 2021-04-02
---

> the viewmodel properties are just plain JavaScript strings, they have no way of notifying anybody that they've changed, so the UI stays static. That's why Knockout has a concept of observables - these are properties that automatically will issue notifications whenever their value changes.

Observables

They are just properties that advertise to the UI when they are changed

- to read/write an observable's value, you call it as a function

### Simplest KnockoutJS example

```html
<body>
  <!-- Bind an HTML element -->
  <h1 data-bind="text: animal">Monkey</h1>

  <!-- Import Knockout -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"></script>

  <script>
    // Create a ViewModel
    var viewModel = {
      animal: ko.observable(),
    }

    viewModel.animal('Elephant')

    // Activate KnockoutJS so that it updates values for `data-bind`
    ko.applyBindings(viewModel)
  </script>
</body>
```

## Notes

- Without Typescript, there are no errors. If you have a `data-bind` that doesn't exist, it'll fail silently (took me an hour to figure out that one). If you're binding a ViewModel that doesn't exist, it'll fail silently. Typescript is pretty much a necessity if you want to keep your sanity and save your time..

- make sure you have the browser console open, that's one place that'll show you some errors.

- `var self = this` saving a reference/alias to `this` as `self` is a common convention in ES5 (and Knockout). it is useful when you have functions inside function and they have their own `this` and you need to reference back to `self` (i.e. the parent function's this..)

- `applyBindings()` takes an instance of the ViewModel and a Selector (node inside the DOM tree). Selector is useful when you have multiple ViewModels and want to restrict the activation to a certain area..

- `ko.computed()` let's you take values from other observables and create a consolidated result

```ts
ko.computed(() => {
  // return `${self.firstName} ${self.lastName}` // [object Object] [object Object]
  return `${self.firstName()} ${self.lastName()}` // Aamnah Awesome
})
```

- _Observables_ are special JavaScript objects that can notify subscribers about changes and can automatically detect dependencies. Think of observables as pieces of state that can change

- Observables are actually **functions** in KnockoutJS because not all browsers support JavaScript _getters_ and _setters_

## Links

- [](http://learn.knockoutjs.com/#/?tutorial=intro)
