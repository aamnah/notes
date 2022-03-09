---
title: Show a countdown timer and enable button after the time is up (plain JavaScript)
date: 2021-08-21
slug: countdown-timer-enable-button
---

### Example use case

- SMS verification during registration

### JavaScript used

- `setTimeOut()`
- `setInterval()`
- `clearInterval()`
- `document.querySelector()`
- `.removeAttribute()`

### Code

```html
<p>
  Resend code in <strong>00:<span id="resend-verification-code-timer">59</span></strong>
</p>
<button id="resend-verification-code" disabled>Resend code</button>
</div>
```

```js
let timerDuration = 60000 // milliseconds
let endTime = Date.now() + timerDuration // keep track of the time difference explicitly
const resendCodeTrigger = document.querySelector('#resend-verification-code')
const resendCodeTimerElement = document.querySelector('#resend-verification-code-timer')

// Start countdown timer and show the time passing
const setResendCodeTimer = setInterval(() => {
  let delta = endTime - Date.now() // milliseconds remaining till endTime
  let remainingSeconds = Math.floor(delta / 1000) // convert milliseconds to seconds
  resendCodeTimerElement.innerHTML = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds // show 00:07 instead of 00:7
}, 1000) // update remaining time display every second

function stopResetCodeTimer() {
  clearInterval(setResendCodeTimer)
}

// Enable the resend code button after timer duration (60 seconds) is up
function enableResendCodeButton() {
  setTimeout(() => {
    resendCodeTrigger.removeAttribute('disabled')
    stopResetCodeTimer()
  }, timerDuration - 1000)
}

enableResendCodeButton()
```
