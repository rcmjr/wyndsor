# Windsor
## A Snazzy SASS Composer
### And the easiest way to write responsive front-end css.
<hr>
Wyndsor was made by a ux/ui designer unhappy with the bloat and/or obscurity of most css frameworks. Wyndsor aims to provide a scalable approach to front-end development and enable front-end developers to easily write through a bare minimum vernacular.

Through the power of sass maps, media query consolidation, and the easiest declarations - ever - to code breakpoints, selector aliases, inline mixins, (and more) can rapidly get you from prototype to prod.

> NOTE: *Wyndsor is in beta.* There are a few kinks being worked out, and being very much a young collection of code, please submit any additional bugs you find or ideas for what features/mixins should be integrated into wyndsor.

### TOC
1.


### Installation
1. Clone wyndsor using a git client or download and extract a zip file to your local build.
2. Start terminal and navigate to wyndsor's root.
3. Install npm: `npm install`
3. Install gulp: `npm install gulp`.
4. Install all dependencies: `npm ci`.
5. Run gulp.

#### Using Gulp
##### Commands
Wyndsor has two gulp modes:

- Dev `gulp --dev`
  - Each .scss file is composed to it's own .css file.
  - Each stylesheet link is added to the head of your page files.
  - CSS is not minified.
- Prod `gulp --prod`
  - Each .scss file is combined in style.scss and then composed to a single .scss file.
  - Only style.css is added as stylesheet link to the head of your pages.
  - CSS is minified.

##### Browsersync
In either instance, gulp will automatically start <a href="https://browsersync.io/">browsersync</a> (for realtime browser preview and testing) and open your build in the default browser. You can disable this when starting gulp by including `--nopreview` in the command:
```
gulp --prod --nopreview
```
<hr>

### Sources and Destinations

#### Compatible Filetype
Wyndsor only works with .scss files. It will only compose non-partials.

#### Default Locations
Wyndsor uses the following locations when running wyndsor:
```
/css --- Destination Directory
/wysass --- Source Directory
```

##### Dev Composition
In dev mode, wyndsor composes each wysass file to its own .css file in a subfolder called "dev". This keeps things speedy, nested and easy to debug. Your destination structure will end up looking like this:
```
css/
  dev/
    {wysass-1}.css
    {wysass-2}.css
  style.css
    which includes
    - normalize.css
    - enabled keyframes
    - fonts
    - all toolbox variables
```

##### Prod Composition
In prod mode, wyndsor consolidates all .scss files (in wysass) into style.scss and then composes. This can take a few seconds to complete, is minified and not for debugging. Your final destination structure will look like this:
```
css/
  style.css
    which includes
    - normalize.css
    - enabled keyframes
    - fonts
    - all toolbox variables
    - additional wyndsor partials
    - all your wysass files
```

#### Gulp settings
You can change all of the above locations and parent stylesheet name in Gulpfile.js:
```
ROOT                = 'css/',
SRC_ROOT            = 'wysass/',
STYLE               = 'style.scss',
STYLE_CSS           = 'style.css'
```

<hr>

### Getting Started

#### Your Style Base
It's recommended that you keep all style variables and settings in `_base.scss` Wyndsor considers it a dependency and will automatically look for the partial in your wysass folder. It's' injected into every working .scss file before composing takes place.

*To change the name of this partial or add more to wyndsor's dependencies list see the wyndsor core section*

#### Your Stylesheets
To create your first .scss file, use or duplicate the `_template.scss` file or use the following code:
```
// inject: dependenciesbase //
// endinject: dependenciesbase //

$x-MapName: (

  Begin coding here! :)

);

$Epic-Map: $x-MapName;

// inject: dependenciesepic //
// endinject: dependenciesepic //
```
*Do not change or remove any of the inject or endinject lines, or delete the $Epic-Map variable.*

#### How to Code (wyndsor style)
A typical block of code will look like the following:
```
parentclass: (
  width: 100%,
  height: 100%,

  hover: (
      width: 80%
  ),

  \--sub: (
    background: blue,
    display: (
      base: inline-flex,
      desktop-up: inline-block
    )
  )
)
```
##### Rules for the Road
1. Wyndsor uses *keys* to interpret what kind of selector (parent or child) you're declaring.
2. You can't use a selector name or property twice in a row or more.

##### Parent Selectors
Declaring a parent selector is easy, simply type in a name. Wyndsor will consider it a class, unless you use one of the following keys:
- \# -- ids
- \\\ -- custom selector

##### Classes
###### wysass
```
class-name: (
  width: 100%,
  height: 100%
)
```
###### css
```
class-name: (
  width: 100%,
  height: 100%
)
```

##### Ids
###### wysass
```
#id-name: (
  width: 100%,
  height: 100%
)
```
###### css
```
#id-name {
  width: 100%;
  height: 100%;
}
```

##### Custom Selectors
(*you must use quotation marks following the key*)
###### wysass
```
\\".custom .selector-name > div": (
  width: 100%,
  height: 100%
)
```
###### css
```
.custom .selector-name > div {
  width: 100%;
  height: 100%;
}
```
<br>
<br>
##### Child Selectors
These map keys can be used within any parent to build out your styling.

###### Custom Selector
**wysass**
```
#parent: (

  \\".child-1 > #blue: (
    background: blue
  ),
  \\" .child-2 > #violet: (
    background: violet
  )

)
```
**css**
```
#parent.child-1 > #blue {
  background: blue;
}
#parent .child-2 > #violet {
  background: violet;
}
```

###### Children
**wysass**
```
#parent: (

  \>child__1: (
    background: blue
  ),
  \>\>child__2: (
    background: violet
  ),
  \>\>\>child__3: (
    background: black
  )

)
```
**css**
```
#parent.child__1 {
  background: blue;
}
#parent .child__2 {
  background: violet;
}
#parent > .child__3 {
  background: black;
}
```
###### Hyphenate
**wysass**
```
#parent: (

  \-child__1: (
    background: blue
  ),
  \--child__2: (
    background: violet
  ),

)
```

**css**
```
#parent-child__1 {
  background: blue;
}
#parent--child__2 {
  background: violet;
}
```

###### Underscore
**wysass**
```
#parent: (

  \-child--1: (
    background: blue
  ),
  \__child--2: (
    background: violet
  ),

)
```
**css**
```
#parent-child--1 {
  background: blue;
}
#parent--child--2 {
  background: violet;
}
```

###### Namespace
**wysass**
```
#parent: (

  \:child__1: (
    background: blue
  )

)
```
**css**
```
#parent\:child__1 {
  background: blue;
}
```

###### Preceder
**wysass**
```
#parent: (

  \~child__1: (
    background: blue
  )

)
```
**css**
```
#parent ~ .child__1 {
  background: blue;
}
```

###### List
**wysass**
```
#parent: (

  \,child__1: (
    background: blue
  )

)
```
**css**
```
#parent ~ .child__1 {
  background: blue;
}
```
*If you use the list key twice at the same level, they will be composed into separate css entries. Use the custom selector key if you need to list more than one.*

###### Immediate
**wysass**
```
#parent: (

  \+child: (
    background: blue
  )

)
```
**css**
```
#parent + .child {
  background: blue;
}
```
<br>

##### Breakpoints/Media Queries
Declaring a breakpoint to create a media query simply involves using a desired breakpoint name within the property you wish to make responsive.

**wysass**
```
class: (

  background: (
    base: blue,
    desktop-dn: violet
  )

)
```
**css**
```
.class {
  background: blue;
}
@media (min-width:1200px) {
  .class {background: violet;}
}

```
*NOTE: To maintain a non-media query value, you must use "base".*

###### Changing Your Breakpoint Settings
Wyndsor's breakpoint system is built on <a href="https://include-media.com/">@include-media</a>. Breakpoint settings are broken into three main parts:
1. Media Sizes
2. Media Expressions
3. Breakpoints

The system is scalable in that you can modify, remove or add to all of the above to accommodate your project scope.

**Media Sizes & Expressions**
<br>By default, wyndsor's media sizes are based on the method outlined in this article by <a href="https://medium.freecodecamp.org/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862">Medium's FreeCodeCamp</a>.

*They can be found in Tools > A-Auto-Code > _brkpoints.scss*

Sizes:
```
tiny: 400px,
phone: 600px,
phablet: 900px,
tablet: 1200px,
desktop: 1400px,
high-desktop: 1800px
```
*NOTE: You can't use numbers in media size names*<br><br>
Expressions:
```
screen: 'screen',
print: 'print',
handheld: 'handheld',
landscape: '(orientation: landscape)',
portrait: '(orientation: portrait)',
retina2x: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)',
retina3x: '(-webkit-min-device-pixel-ratio: 3), (min-resolution: 350dpi), (min-resolution: 3dppx)'
```

**Breakpoints**
<br>Creating or editing breakpoints is fairly easy. You can include media expressions, and/or use the following symbols with your media size names to establish your own breakpoints.

- \> --- Greater Than
- \>= --- Greater Than or Equal To
- < --- Less Than
- <= --- Less Than or Equal To

You must surround each breakpoint value with quotation marks:
```
desktop-up: '>desktop',
desktop-special: 'retina2x', '<desktop'

------

@media (min-width: 1401px) {}
@media (-webkit-min-device-pixel-ratio: 2) and (max-width: 1400px), (min-resolution: 192dpi) and (max-width: 1400px), (min-resolution: 2dppx) and (max-width: 1400px) {}

```

For height based breakpoints, simply include "height" before the media size and symbol:
```
2k: 'height>=high-desktop',
Standard: 'height<desktop'

------

@media (min-height: 1800px) {}
@media (max-height: 1399px) {}

```

*NOTE: Some <a href="https://include-media.com/">@include-media</a> features may not yet be available in wyndsor. **To learn more about the vernacular when creating breakpoints, read their documentation <a href="https://include-media.com/documentation/#mixin-media">here</a>.***
