---
title: Working with Grunt
category: Workflow
date: 2014-09-14
---

## Installation

#### Node.js and NPM
Install Node by downloading the package from [their website](http://nodejs.org/) and running the install. You can also install it on a Mac via homebrew (Mac) by running the command

	brew install node
    
NPM (Node Package Manager) comes with Node by default.

#### Grunt CLI
Install Grunt CLI:

	npm install -g grunt-cli

(the -g means to install it globally on your OS so that you can use the grunt command where ever you are on your system).

## Getting started with Grunt
You install Grunt on a per-project basis. Go to your project’s folder. It needs a file there named `package.json` at the root level. You can just create one and put it there.

The contents of that file should be this:

```javascript
{
  "name": "example-project",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.1"
  }
}
```

Once you have the package.json file in place, activate Grunt with the following command:

	npm install

### Installing packages

	npm install grunt-contrib-packagename --save-dev
    
OR

	npm install grunt-packagename --save-dev

Plugins with a `contrib` in name are officially maintained Grunt plugins. 

When installing plugins this way your package.json file will automatically be updated to include this new dependency. the `--save-dev` flag means our package.json file gets automatically updated to include the dependency we've just installed.

### [ImageOptim](https://github.com/JamieMason/grunt-imageoptim):  
	
    npm install grunt-imageoptim --save-dev
    
For usage: https://github.com/JamieMason/grunt-imageoptim

## Configuration (Gruntfile.js)
### Tasks 
    
You need to create a default task in the Gruntfile. This task will be run when you enter the 'grunt' command.

```javascript
// the default task can be run just by typing "grunt" on the command line
grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
```

You can also create custom tasks

```javascript
// this would be run by typing "grunt test" on the command line
grunt.registerTask('test', ['jshint', 'qunit']);
```

### Sass
Sass is that it can do concatenation and minification all by itself. 
    
    
    
Links
---

- [Grunt for People Who Think Things Like Grunt are Weird and Hard](http://24ways.org/2013/grunt-is-not-weird-and-hard/)
- [Sample Grunt file](http://gruntjs.com/sample-gruntfile)
- [ImageOptim-CLI](https://github.com/JamieMason/ImageOptim-CLI#installation)
- [Grunt Boilerplate](http://www.integralist.co.uk/Grunt-Boilerplate.html)

### Packages
- Imageoptim
- compass
- sass
- livereload
- concat
- uglify
