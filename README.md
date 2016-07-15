## pipeline-compile-less


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-compile-less| This pipeline compiles LESS files and returns CSS files | 1.0.1 |

# Overview

This pipeline assists the compilation of LESS into CSS, while optionally allowing for autoprefixing and concatination.


## Install
`npm install pipeline-compile-less.git --save-dev`

**note: https://github.com/kenzanlabs/pipeline-compile-less/issues/7**

## Usage
```javascript
var gulp = require('gulp');
var lessPipeline = require('pipeline-compile-less');


gulp.task('default', function() {
  return gulp
    .src(['src/**/*.less'])
    .pipe(lessPipeline.compileLESS());
});

//Usage with options
gulp.task('default', function() {
  return gulp
    .src(['src/**/*.less'])
    .pipe(lessPipeline.compileLESS({concatCSS: true}));
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    * __autoprefix__ If you don't want to have your CSS rules prefixed set this property to __false__.
    
    * __concatCSS__ If set to __false__ the pipeline won't concatenate the files to generate a single CSS file and will output them to the same directory as the original files..

    * __outputFileName__ If __concatCSS__ is set to __true__, this value will be used to name the file. By default, the config is set to get the name of the package that consumes pipeline-compile-less. So for example, it would end up named as `your-project.css`. If you set this value, do not suffix the string with '.css', as this is handled internally.

    * __outputDirectory__ If __concatCSS__ is set to __true__, . If you set this value, the .map and css files will be written to that directory. The default directory, if none is specified, is `dest`.

    * __addSourceMaps__ If set to __false__ source maps won't be generated for the compiled files. By default the pipeline will generate the source maps and store them next to the new generated files with an extension of .map .

    * __plugins__ Gathers all of the specific configurations for the tasks used in the pipeline.

      * __plugins.autoprefix__ Adds vendor specific prefixes automatically for the last 2 versions. Also, you can provide your own autoprefix configuration setting an object-- following [this](https://github.com/postcss/autoprefixer#browsers) rules.


  Default:
  ```javascript
  config = {
    autoprefix: true,
    concatCSS: false,
    outputFileName: '{package-name}.css',  //uses the name of the current package, from package.json
    outputDirectory: './dest/',
    addSourceMaps: true,
    plugins: {
      autoprefix: {browsers: ['last 2 versions']},
    }
  };
  ```  

## Results

This pipeline returns an object. This object receives a stream with the LESS files to compile, and you can call the _compileLESS_ method to execute the compilation. After finishing the process you will have a folder named as _config.output_ . This folder can contain files as follows:

  + All of the CSS files generated; keeping the same folder structure from the source.

  + The CSS rules that need vendor prefixes will be completed based on [Autoprefixer](https://github.com/postcss/autoprefixer).

  + Source maps will be store in _config.output/maps_. This can be avoid setting _config.addSourceMaps_ to __false__.

  + If _config.concatCSS_ is __true__ a `concat.css` file will be generated.
  
  + If _config.outputFileName_ is set, that name will be used (and suffixed with '.css') instead of picking up the consuming package name as a default value. For example, the compiled file would be named as `your-custom-value.css` if you used 'your-custom-value'.

  + If _config.outputDirectory is set, that name will be used to output .map and .css files, provided _config.concatCSS_ is __true__.
  
## LICENSE

Copyright (c) 2015 Kenzan <http://kenzan.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
