---
title: Notes on building a custom mechanical keyboard
path: mechanical-keyboard-notes
excerpt: Extensive notes on building a custom mechanical keyboard by sourcing parts
date: 2020-03-24
---

Stuff you need

- PCB ($35-$60)
- Case
- Plate (\$18-\$40)
- Switches ([\$3.85](https://dailyclack.com/collections/switches/products/gateron-yellow-switches) for pack of 10, $5.15 on AliExpress - around $30 for 110 switches)
- Stabilizers ($14-$19)
- Keycaps

Optional

- [Teflon grease - \$11](https://www.amazon.com/dp/B002L5UL92/ref=as_li_ss_tl?cv_ct_id=amzn1.idea.30QJOPDITFI5D&cv_ct_pg=storefront&cv_ct_wn=aip-storefront&ref=exp_cov_taehatypes_dp_vv_d&linkCode=sl1&tag=nathantaehaki-20&linkId=041fd3fa809f71e3ee260d43f66cdf46&language=en_US) for lubing (plastic on plastic)
- [Dielectric grease - \$7](https://www.amazon.com/dp/B000AL8VD2/ref=as_li_ss_tl?cv_ct_id=amzn1.idea.30QJOPDITFI5D&cv_ct_pg=storefront&cv_ct_wn=aip-storefront&ref=exp_cov_taehatypes_dp_vv_d&linkCode=sl1&tag=nathantaehaki-20&linkId=9ca8a8ee47d0d5e4e8ca150ecdad20a5&language=en_US) for stabilizers

Software is also needed to customize the keyboard (e.g. QMK, [Karabiner](https://karabiner-elements.pqrs.org/) for macOS)

A DIY kit on KBDfans cost $129-$299

## PCB

- hot swap or solder?
- RGB or no lights?
- sizes: 40%. 60%, 65%, 75%, 80%, 95%

The PCB will decide which size your case would be, whether your keycaps need to account for backlight (in-switch backlighting) and how many keys you're going to need..

The PCB needs to fit in the case and the screw holes need to match on both.

Could be _hot swap_ or normal one. Hot swap is where you don't have to solder the switches to the board.

I'm gonna go with a hot swap one, because i want to try different switches.

Definitely an RGB, because i can't touch type and need backlighting. Preferably Per-key RGB and in-switch backlighting

60% size = Tenkeyless (TKL) = Don't have numberpad

Options

| Model | Lighting | Hot swap | Layout | Price |
| ----- | -------- | -------- | ------ | ----- |
| GK64  | RGB      | Hot swap | 60%    | \$45  |
| iGK61 | RGB      | Hot swap | \$60   |       |

## Key layout

- ANSI
- ISO (fat Enter)

I need a dedicated PrtScr button, i use it too much
I'd lke macro buttons. So in places of Home/End have macro keys

## Case

is it too high and fat?
how much can the feet be adjusted?
will it last 10 years?

## Switches

Check out the [Cherry MX website](https://www.cherrymx.de/en/) for a good overview of all switches. Most of the competitors use the same naming convention. You can easily figure out what a switch would be like in any brand if you know the main characteristics of a switch. Gaterons are the most popular MX copy and the plastic they use is apparently really good quality.

Here are the two main things that matter

- Do you want a tactile bump when you press the button (Tactile) or do you want the switch to smoothly go down (Linear)?
- How much force do you want to exert when pressing the key? Actuation force.
- How much noise do you want it to make? (Clicky)

Other things to consider

- Low profile switches
- Silent switches
- Speed switches (linear switches with decreased pre-travel (1-1.2mm) and travel (3.2-3.4mm))

I like linear switches with about 50g actuation. That is a Cherry MX Red (or a Gateron Yellow).

The type of _stem_ on the switch will determine the keycaps

Options

| Model                                                                                                  | Price | Mechanism | Force | Pre-travel | Travel |
| ------------------------------------------------------------------------------------------------------ | ----- | --------- | ----- | ---------- | ------ |
| Gateron Yellow                                                                                         | \$45  | Linear    | 50g   |
| [Cherry MX Brown](https://www.cherrymx.de/en/mx-original/mx-brown.html)                                | \$45  | Tactile   | 55g   | 2mm        | 4mm    |
| [Cherry MX Low-Profile RGB Red](https://www.cherrymx.de/en/mx-low-profile/mx-low-profile-red.html)     | \$45  | Linear    | 45g   | 1.2mm      | 3.2mm  |
| [Cherry MX Low-Profile RGB Speed](https://www.cherrymx.de/en/mx-low-profile/mx-low-profile-speed.html) | \$45  | Linear    | 45g   | 1mm        | 3.2mm  |

When ordering, order extra switches. For every 10 that work, 1 may not.

### Gateron switches

- milky top - 2st revision - The tops are slightly too small for GMK sets, the caps sometimes catch when pressing down
- clear top, black/gray bottom - 3rd revision - fixes these issues

#### Pins 3 or 5

Only 2 of the pins are conductors. The rest are plastic feet for stability.

If you use a plate, you are okay with using 3-pins. If you want extra stability, go for a 5-pin.

![Gateron switch - 3pin vs. 5pin](images/gateron-switch-3pin-5pin.jpg)

#### Leaf types?

#### SMD or not?

You need an SMD switch if you're using SMD LEDs on the PCB

## Stabilizers

These are the mounty things you find under keys like Space, Shift, Backspace etc. Longer keys need stabilizers..

## Misc.

## Resources

- **KBDfans** seems to be dropshipping from China, just buy from AliExpress instead.
- [Daily Clack](https://dailyclack.com/)

## Links

- [How to Clip, Lube, and Band-aid Mod Your Stabilizers](https://www.youtube.com/watch?v=cD5Zj-ZgMLA)
- [Gateron Milky top vs Gateron SMD ( Clear top ) switches?](https://www.reddit.com/r/MechanicalKeyboards/comments/5r80f9/gateron_milky_top_vs_gateron_smd_clear_top/?utm_source=share&utm_medium=web2x)

## Further research

- Look into [Gateron Ink switches](https://novelkeys.xyz/products/gateron-ink-v2-switches) use a different type of (non-standard) plastic
- Look into bottom out force, Gateron Yellows bottom out at around 170g. That's heavy!
- Is the light in the switch or in the PCB?
