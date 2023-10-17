---
title: Install Embedded Dart Sass on Netlify
slug: install-embedded-dart-sass
date: 2023-02-06
description: If you want to use Embedded Dart Sass in your Hugo sites on Netlify, this is how you would set it up in your build environment
---

NOTE: In 2023, the Sass team deprecated Embedded Dart Sass in favor of Dart Sass. Embedded Dart Sass is no longer a requirement since version Hugo version `0.114.0`. If you have been using Embedded Dart Sass1 with Hugo v0.113.0 and earlier, uninstall Embedded Dart Sass, then install Dart Sass. If you have installed both, Hugo will use Dart Sass.

---

To install embedded-dart-sass you need to download and extract it to a location that's in the system `$PATH`. 

- Create a bash script called `build.sh` and add the steps for installing `dart-sass-embedded` and building your site in there. 
- In your `netlify.toml` you'd specify the script as the value for the build command for your context `command = "./build.sh"`. The value is a path to the script file relative to your base. If you had an existing `command` there, move it to the end of the `build.sh` file

Here's the code for the `build.sh` file

```bash
#!/bin/bash

DARTSASS_VERSION="1.58.0"
BIN_DIR="/opt/build/repo/node_modules/.bin"

echo "==== Installing Dart Sass Embedded"
mkdir -p ${BIN_DIR}

curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${DARTSASS_VERSION}/sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

tar -xvf sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;
mv sass_embedded/* ${BIN_DIR}
rm -rf sass_embedded*;

echo "==== dart-sass-embedded successfully installed"
dart-sass-embedded --version

echo "==== building site"
hugo --gc --minify
```

![improved netlify build logs](../images/netlify-build-logs.png)

The only thing you may need to change in the script above is the value for `DARTSASS_VERSION`

A successful install is indicated with the output below. If you see anything else, something went wrong..

```
{
	"protocolVersion": "1.0.0",
	"compilerVersion": "1.52.1",
	"implementationVersion": "1.52.1",
	"implementationName": "Dart Sass",
	"id": 0
}
```


#### Figuring out $PATH in Netlify build images
How do we know what's in `$PATH` when you're deploying sites on Netlify? Simple, we log it out, by adding a `echo ${PATH}` to our build command/script. I know from experimentation that the following dirs in the $PATH inside the build image

```
/opt/build/repo/node_modules/.bin
/opt/build/node_modules/.bin
/opt/node_modules/.bin
/node_modules/.bin
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
```

The `/usr/` ones might need you to `chmod` files in order to work. I picked `/opt/build/repo/node_modules/.bin` because `/opt/build/repo/` is the default base directory in the build image for your repo, no ownership and access issues. I have installed and tested stuff in `/opt/build/repo/node_modules/.bin` and it has worked fine for me so far.


Links
---
- [dart-sass-embedded Releases](https://github.com/sass/dart-sass-embedded/releases)
- [Hugo: installing dart-sass-embedded](https://discourse.gohugo.io/t/installing-dart-sass-embedded/32468/2)
- [sample build.sh](https://github.com/bep/hugo-dartsass-testrepo/blob/main/build.sh)
