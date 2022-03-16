---
title: Shopify theme optimization notes
date: 2021-11-22
draft: true
---

### `{%- -%}` vs. `{% %}`

The hyphen `-` [removes whitespace](https://shopify.github.io/liquid/basics/whitespace/) from left and right of rendered tag

### Alt text on images

`.alt` on an Image object will give you the `alt` text for. Make sure you escape it

```liquid
<img
    alt="{{ variant.image.alt | escape }}"
/>
```

### img_url vs. image_url

[image_url](https://shopify.dev/api/liquid/filters/url-filters#image_url) has replaced [img_url](https://shopify.dev/api/liquid/filters/deprecated-filters#img_url) ([deprecated](https://shopify.dev/api/liquid/filters/deprecated-filters#img_url) [usage](https://www.shopify.com/partners/blog/img-url-filter))

### Recommended image sizes

Your product and collection images can be any size up to **4472 x 4472 px**, or **20 megapixels**. Product and collection images need to have a file size smaller than 20 MB to be added to Shopify.

If you cannot use the `<img srcset>` markup, and have to hardcode specific maximum sizes, [Cloudflare recommends](https://developers.cloudflare.com/images/image-resizing/url-format#recommended-image-sizes) the following sizes:

- Maximum of 1920 pixels for desktop browsers.
- Maximum of 960 pixels for tablets.
- Maximum of 640 pixels for mobile phones.

```liquid
<img
    alt="{{ initial_image.alt | escape }}"
    src="{{ initial_image | image_url: width: 1445 }}"
    srcset="
        {%- if initial_image.width >= 240 -%}{{ initial_image | image_url: width: 240}} 240w,{%- endif -%}
        {%- if initial_image.width >= 480 -%}{{ initial_image | image_url: width: 480}} 480w,{%- endif -%}
        {%- if initial_image.width >= 600 -%}{{ initial_image | image_url: width: 600}} 600w,{%- endif -%}
        {%- if initial_image.width >= 800 -%}{{ initial_image | image_url: width: 800}} 800w,{%- endif -%}
        {%- if initial_image.width >= 1024 -%}{{ initial_image | image_url: width: 1024}} 1024w,{%- endif -%}
        {%- if initial_image.width >= 1100 -%}{{ initial_image | image_url: width: 1100 }} 1100w,{%- endif -%}
        {%- if initial_image.width >= 1445 -%}{{ initial_image | image_url: width: 1445 }} 1445w,{%- endif -%}
        {%- if initial_image.width >= 1680 -%}{{ initial_image | image_url: width: 1680 }} 1680w,{%- endif -%}
        {%- if initial_image.width >= 2048 -%}{{ initial_image | image_url: width: 2048 }} 2048w,{%- endif -%}
        {%- if initial_image.width >= 2200 -%}{{ initial_image | image_url: width: 2200 }} 2200w,{%- endif -%}
        {%- if initial_image.width >= 2890 -%}{{ initial_image | image_url: width: 2890 }} 2890w,{%- endif -%}
        {%- if initial_image.width >= 4096 -%}{{ initial_image | image_url: width: 4096 }} 4096w,{%- endif -%}
        {{ initial_image }} {{ initial_image.width }}w"
    sizes="
        (min-width: 750px) calc(100vw - 22rem),
        1100px"
    loading="lazy"
    width="1100"
    height="{{ 1100 | divided_by: initial_image.aspect_ratio | ceil }}"
    class="productitem--image-primary"
    data-media-id="{{ media.id }}"
>
```

```liquid
<img
    srcset="{%- if block.settings.image.width >= 550 -%}{{ block.settings.image | img_url: '550x' }} 550w,{%- endif -%}
    {%- if block.settings.image.width >= 720 -%}{{ block.settings.image | img_url: '720x' }} 720w,{%- endif -%}
    {%- if block.settings.image.width >= 990 -%}{{ block.settings.image | img_url: '990x' }} 990w,{%- endif -%}
    {%- if block.settings.image.width >= 1100 -%}{{ block.settings.image | img_url: '1100x' }} 1100w,{%- endif -%}
    {%- if block.settings.image.width >= 1500 -%}{{ block.settings.image | img_url: '1500x' }} 1500w,{%- endif -%}
    {%- if block.settings.image.width >= 2200 -%}{{ block.settings.image | img_url: '2200x' }} 2200w,{%- endif -%}
    {%- if block.settings.image.width >= 3000 -%}{{ block.settings.image | img_url: '3000x' }} 3000w,{%- endif -%}
    {{ block.settings.image | img_url: 'master' }} {{ block.settings.image.width }}w"
    src="{{ block.settings.image | img_url: '1500x' }}"
    sizes="(min-width: {{ settings.page_width }}px) {% if section.blocks.size == 1 %}calc({{ settings.page_width }}px - 100px){% else %}{{ settings.page_width | minus: 100 | times: 0.67 | round }}px{% endif %}, (min-width: 750px){% if section.blocks.size == 1 %} calc(100vw - 100px){% else %} 500px{% endif %}, calc(100vw - 30px)"
    alt="{{ block.settings.image.alt | escape }}"
    loading="lazy"
    width="{{ block.settings.image.width }}"
    height="{{ block.settings.image.height }}"
    class="collage-card__image"
>
```

```
{%- if image.width >= 100 -%}{{ image | image_url: width: 100 }} 100w,{%- endif -%}
{%- if image.width >= 150 -%}{{ image | image_url: width: 150 }} 150w,{%- endif -%}
{%- if image.width >= 200 -%}{{ image | image_url: width: 200 }} 200w,{%- endif -%}
{%- if image.width >= 250 -%}{{ image | image_url: width: 250 }} 250w,{%- endif -%}
{%- if image.width >= 300 -%}{{ image | image_url: width: 300 }} 300w,{%- endif -%}
{%- if image.width >= 350 -%}{{ image | image_url: width: 350 }} 350w,{%- endif -%}
{%- if image.width >= 400 -%}{{ image | image_url: width: 400 }} 400w,{%- endif -%}
{%- if image.width >= 450 -%}{{ image | image_url: width: 450 }} 450w,{%- endif -%}
{%- if image.width >= 500 -%}{{ image | image_url: width: 500 }} 500w,{%- endif -%}
{%- if image.width >= 550 -%}{{ image | image_url: width: 550 }} 550w,{%- endif -%}
{%- if image.width >= 600 -%}{{ image | image_url: width: 600 }} 600w,{%- endif -%}
{%- if image.width >= 700 -%}{{ image | image_url: width: 700 }} 700w,{%- endif -%}
{%- if image.width >= 800 -%}{{ image | image_url: width: 800 }} 800w,{%- endif -%}
{%- if image.width >= 900 -%}{{ image | image_url: width: 900 }} 900w,{%- endif -%}
{%- if image.width >= 1000 -%}{{ image | image_url: width: 1000}} 1000w,{%- endif -%}
{%- if image.width >= 1100 -%}{{ image | image_url: width: 1100}} 1100w,{%- endif -%}
{%- if image.width >= 1445 -%}{{ image | image_url: width: 1445 }} 1445w,{%- endif -%}
{%- if image.width >= 1680 -%}{{ image | image_url: width: 1680 }} 1680w,{%- endif -%}
{%- if image.width >= 2048 -%}{{ image | image_url: width: 2048 }} 2048w,{%- endif -%}
{%- if image.width >= 2200 -%}{{ image | image_url: width: 2200 }} 2200w,{%- endif -%}
{%- if image.width >= 2890 -%}{{ image | image_url: width: 2890 }} 2890w,{%- endif -%}
{%- if image.width >= 4096 -%}{{ image | image_url: width: 4096 }} 4096w,{%- endif -%}
```

```liquid
<!-- Simple -->
{{ image | image_url: width: 100 }} 100w,
```

```liquid
<!-- Check if the uploaded image is actually that big -->
{%- if image.width >= 100 -%}{{ image | image_url: width: 100}} 100w,{%- endif -%}
```

### `<img>` vs. `<picture>`

- `img` can have `loading="lazy"`. `<picture>` can as well apparently https://stackoverflow.com/a/60405256/890814

> Also, the picture element itself does not display anything; it merely provides a context for its contained img element that enables it to choose from multiple URLs.

- `<picture>` can have `media` as well as `srcset` and `sizes`

### devicePixelRatio

`window.devicePixelRatio` will give you the density value. For example, `1` is for my Asus VX241 2560x1440 (2K/QHD) monitor, while `3` is the density for my 2020 M1 MacBook Pro

```liquid
srcset="
    {{ image | image_url: width: 127 }} 0.5x,
    {{ image | image_url: width: 254 }} 1x,
    {{ image | image_url: width: 381 }} 1.5,
    {{ image | image_url: width: 508 }} 2x,
    {{ image | image_url: width: 762 }} 3x,
    {{ image | image_url: width: 1016 }} 4x,
    ">
```

[More on pixel density here](https://medium.com/@peternowell/pixel-density-demystified-a4db63ba2922)

## Working code sample

```liquid
<img
alt="{{ image_alt }}"
srcset="
    {%- if image.width >= 100 -%}{{ image | image_url: width: 100 }} 100w,{%- endif -%}
    {%- if image.width >= 128 -%}{{ image | image_url: width: 128 }} 128w,{%- endif -%}
    {%- if image.width >= 180 -%}{{ image | image_url: width: 180 }} 180w,{%- endif -%}
    {%- if image.width >= 236 -%}{{ image | image_url: width: 236 }} 236w,{%- endif -%}
    {%- if image.width >= 256 -%}{{ image | image_url: width: 256 }} 256w,{%- endif -%}
    {%- if image.width >= 360 -%}{{ image | image_url: width: 360 }} 360w,{%- endif -%}
    {%- if image.width >= 380 -%}{{ image | image_url: width: 380 }} 380w,{%- endif -%}
    {%- if image.width >= 472 -%}{{ image | image_url: width: 472 }} 472w,{%- endif -%}
    {%- if image.width >= 508 -%}{{ image | image_url: width: 508 }} 508w,{%- endif -%}
    {%- if image.width >= 540 -%}{{ image | image_url: width: 540 }} 540w,{%- endif -%}
    {%- if image.width >= 708 -%}{{ image | image_url: width: 708 }} 708w,{%- endif -%}
    {%- if image.width >= 762 -%}{{ image | image_url: width: 762 }} 762w,{%- endif -%}
    {%- if image.width >= 1016 -%}{{ image | image_url: width: 1016 }} 1016w,{%- endif -%}
    {{ image | image_url: width: image.width }}"
sizes="
    (max-width: 320px) 100px,
    (min-width: 321px) and (max-width: 425px) 128px,
    (min-width: 426px) and (max-width: 768px) 236px,
    (min-width: 767px) 256px,
    360px"
src="{{ image | image_url: width: image.width }}"
loading="lazy"
>
```

- The widths in `sizes` need to match the width in one of the files in the `srcset`. It won't display the right image if you specify a _size_ that has no corresponding file in `srcset`.
- To adjust for pixel density, just add the respective 1x, 1.5x, 4x etc. image file in the `srcset`
- If you see a rendered image for 254x254 px but the intrinsic image loaded was 762x762px, then Chrome is probably loading the image for `DPR: 3.0`. You can change that in Chrome DevTools in responsive mode
- Either disable cache, hard refresh every time, or load the site in Incognito mode. "Once the browser loads higher resolution image, it will not go back to lower resolution image and run the code first in browser size less than 1920px to see the smaller resolution image and once you start increasing the browser size, you will be able to see the larger image"

## Links

- [image_url](https://shopify.dev/api/liquid/filters/url-filters#image_url)
- [img_url](https://shopify.dev/api/liquid/filters/deprecated-filters#img_url)
- [responsive images srcset not working](https://stackoverflow.com/questions/28650327/responsive-images-srcset-not-working)
