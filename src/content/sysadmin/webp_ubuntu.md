---
title: Getting started with WebP on Ubuntu
date: 2020-11-24
slug: webp_ubuntu
---

```bash
sudo apt update
sudo apt install webp
```

```bash
cwebp -q 100 sample_image.png -o sample_image.webp
```

```bash
# convert all jpeg files in a folder
for F in *.jpg; do cwebp $F -o `basename ${F%.jpg}`.webp; done

# Convert all files in a directory
for file in images/*; do cwebp "$file" -o "${file%.*}.webp"; done
```

### using the `<picture>` tag

Before:

```html
<img src="flower.jpg" alt="" />
```

After:

```html
<!-- order of listing matters in source tag. top will be tried first -->
<picture>
  <source type="image/webp" srcset="flower.webp" />
  <source type="image/jpeg" srcset="flower.jpg" />
  <!-- img tag should always be included, and it should always be last -->
  <img src="flower.jpg" alt="" />
</picture>
```

## key takeaways

- i can automate the process of generating webp version whenever a new image file is uploaded
- i can serve the images using `mod_rewrite`, and take care of it on a server level. No need to add `<picture>` elements inside existing code
- going through the sample gallery, PNG files seem to look better after converted to WEBP
- WebP offers both lossless and lossy compression. In lossless compression no data is lost. Lossy compression reduces file size, but at the expense of possibly reducing image quality.
- you can use _imagemin-webp_ as an npm package and integrate it into your bundler (Webpack, Grunt etc.)
- In `<picture>`, the browser uses the first listed source that's in a format it supports. If the browser does not support any of the formats listed in the `<source>` tags, it falls back to loading the image specified by the `<img>` tag.

## Links

- [WebP](https://developers.google.com/speed/webp)
- [How To Create and Serve WebP Images to Speed Up Your Website](https://www.digitalocean.com/community/tutorials/how-to-create-and-serve-webp-images-to-speed-up-your-website)
- [cwebp manual](https://developers.google.com/speed/webp/docs/cwebp)
- [comparison pictures gallery](https://developers.google.com/speed/webp/gallery)
- [Use WebP images](https://web.dev/serve-images-webp/)
- [imagemin-webp](https://github.com/imagemin/imagemin-webp)
