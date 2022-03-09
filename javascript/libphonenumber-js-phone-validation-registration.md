---
title: Notes on using libphonenumber-js for mobile phone number validation and formatting
date: 2021-08-24
slug: libphonenumber-js-phone-validation-registration
---

In the browser, you can use it as a script from the CDN

```
https://unpkg.com/libphonenumber-js@1.9.24/bundle/libphonenumber-mobile.js
https://unpkg.com/libphonenumber-js@1.9.24/metadata.min.json
https://unpkg.com/libphonenumber-js@1.9.24/examples.mobile.json
```

For detecting _template_ of mobile numbers in _national_ format (i.e. 0333 1234567 - with a `0` in the beginning), you'll get `xxxx xxxxxxx`. It'll give you a template for numbers in _international_ format as well, you'll get `xxx xxx xxxxxxx`

```js
cont asYouType = new libphonenumber.AsYouType('PK')

asYouType.input('+923331234567') // +92 333 1234567
asYouType.getTemplate() // xxx xxx xxxxxxx

asYouType.input('03331234567') // 0333 1234567
asYouType.getTemplate() // xxxx xxxxxxx

asYouType.input('3331234567') // 3331234567
asYouType.getTemplate() // xxxxxxxxxx
```

Similarly, if you give it a phone number without any indication of what the country is, the validation will fail

```js
const asYouType = new libphonenumber.AsYouType('PK')

console.log(asYouType.input('+923331234567')) // +92 333 1234567
console.log(asYouType.getNumber().number) //  +923331234567
console.log(asYouType.getChars()) // +923331234567
console.log(asYouType.getTemplate()) // xxx xxx xxxxxxx
console.log(asYouType.isValid()) // true
```

```js
// No country value in instantiation but country code in input = valid phone number
const asYouType = new libphonenumber.AsYouType()

console.log(asYouType.input('+923331234567')) // +92 333 1234567
console.log(asYouType.getNumber().number) //  +923331234567
console.log(asYouType.getChars()) // +923331234567
console.log(asYouType.getTemplate()) // xxx xxx xxxxxxx
console.log(asYouType.isValid()) // true
```

```js
// No country value in instantiation and no country code in input = invalid phone number
const asYouType = new libphonenumber.AsYouType()

console.log(asYouType.input('03331234567')) // 03331234567
console.log(asYouType.getNumber().number) // Uncaught TypeError: Cannot read property 'number' of undefined
console.log(asYouType.getChars()) // 03331234567
console.log(asYouType.getTemplate()) // xxxxxxxxxxx
console.log(asYouType.isValid()) // false
```

Since `AsYouType` is a class, you have to instantiate it with `new`

```js
$('#phoneNumber').keyup(function (event) {
  // TODO: Make sure the event is only handled if a number key was pressed (and not the arrow or backspace key for example)
  // if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
  //   event.preventDefault() //stop character from entering input
  // }

  let selectedCountry = 'PK'
  let asYouType = new libphonenumber.AsYouType(selectedCountry)
  let phoneNumber = $(this).val()
  var formatted = asYouType.input(phoneNumber)

  $(this).focus().val('').val(formatted)

  console.log('input:', asYouType.input(formatted)) // '(213) 373-4253'
  console.log('getNumber:', asYouType.getNumber().number) // '+12133734253'
  console.log('getChars:', asYouType.getChars()) // '2133734253'
  console.log('getTemplate:', asYouType.getTemplate()) // '(xxx) xxx-xxxx'
  console.log('isValid:', asYouType.isValid()) // '(xxx) xxx-xxxx'

  if (asYouType.isValid()) {
    $('#phoneNumber').addClass('is-valid')
  } else {
    $('#phoneNumber').removeClass('is-valid')
  }
})
```

You can also parse a phone number and get it in the form of a proper object

```js
try {
  let parsedPhoneNumber = libphonenumber.parsePhoneNumberWithError(phoneNumber, selectedCountry)
  console.log('parsedPhoneNumber:', parsedPhoneNumber, typeof parsedPhoneNumber)
} catch (error) {
  if (error instanceof libphonenumber.ParseError) {
    // Not a phone number, non-existent country, etc.
    console.log('Error parsing number:', error.message)
  } else {
    console.error('something went rogue while parsing phone number')
    // throw error
  }
}
```

Because of the E.164 standard, i know that all phone numbers can only be 15 digits max

- Country code (1 to 3 digits)
- Subscriber number (max 12 digits)

This helps in setting `minlength` and `maxlength` attributes for the phone number `input` field

## Links

- [E.164](https://en.wikipedia.org/wiki/E.164)
- [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js/#cdn)
- [Demo: libphonenumber-js](https://catamphetamine.github.io/libphonenumber-js/)
- [jQuery plugin: International Telephone Input](https://intl-tel-input.com/)
- [Phone numbers in JavaScript using E.164, libphonenumber and Microdata|](https://www.ronaldjamesgroup.com/blog/phone-numbers-in-javascript-using-e164-libphonenumber-and-microdata)
