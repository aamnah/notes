---
title: CSS Media Queries
slug: css-media-queries
date: 2022-11-16
draft: true
---

- Stop worrying too much about device sizes. You only need 3 or 4 different variations of design (mobile, tablet, desktop, tv).
- You can use `rem` units for defining media queries, that eliminates the headache of figuring out the exact pixel dimensions. 
- Use browser stats to figure out what the popular screen sizes are for _your_ designs. For example, if you're [in Pakistan, 91.86% of the users are on mobile devices which are less than 400px in width](https://gs.statcounter.com/screen-resolution-stats/all/pakistan). If you're designing an ecommerce website that only serves the Pakistani audience, there is no point in over optimising for TV resolutions, focus on optimizing the design for mobile first.

Let the screen sizes in pixel be your guide but do not design for hardcoded pixel values, that'll make your life hard and your design less future-proof, because your design would be at the mercy of changing 

###  Screen Resolution Stats Worldwide - September 2022
- 1920x1080 (8.89%)
- 1366x768 (6.62%)
- 360x800 (5.91%)
- 1536x864 (4.08%)
- 414x896 (3.65%)
- 390x844 (3.6%)

### Screen Resolution Stats in Pakistan - September 2022
- 360x800 (15.78%)
- 1366x768 (8.14%)
- 360x640 (6.9%)
- 360x820 (6.75%)
- 385x854 (5.35%)
- 360x780 (4.78%)


**Bootstrap**: 576px, 768px, 992px, and 1200px  
**Foundation**: 40em and 64em  
**Bulma**: 768px, 769px, 1024px, 1216px, and 1408px


```scss
$breakpoint-xs: 400px; // Extra small devices (phones, 400px and down)
$breakpoint-s: 640px; // Small devices (portrait tablets and large phones, 640px and up)
$breakpoint-m: 768px; // Medium devices (landscape tablets, 768px and up)
$breakpoint-l: 1024px; // Large devices (laptops/desktops, 1024px and up)
$breakpoint-xl: 1280px; // Extra large devices (Large laptops and desktops, 1280px and up)
$breakpoint-xxl: 1536px; // Wide devices (TVs, large laptops and desktops, 1536px and up)
```

```
small: 35em // 560px
medium: 55em // 880px
```

Links
---

- https://www.browserstack.com/guide/what-are-css-and-media-query-breakpoints
- https://gs.statcounter.com/screen-resolution-stats
- https://gs.statcounter.com/screen-resolution-stats/all/pakistan
