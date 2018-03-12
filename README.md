# Windsor
### A snazzy SASS composer, and the easiest way to write responsive front-end css.
<hr>
Wyndsor was made by a ux/ui designer unhappy with the bloat and/or obscurity of most css frameworks. Wyndsor aims to provide a scalable approach to front-end development and enable front-end developers to easily write through a bare minimum vernacular.

Through the power of sass maps, media query consolidation, and the easiest declarations - ever - to code breakpoints, selector aliases, inline mixins, (and more) can rapidly get you from prototype to prod.

> NOTE: *Wyndsor is in beta.* There are a few kinks being worked out, and being very much a young collection of code, please submit any additional bugs you find or ideas for what features/mixins should be integrated into wyndsor.

## TOC
1. Installation
  <br>1.1 Using Gulp
2. Sources and Destinations
  <br>2.1 Compatible Filetype
  <br>2.2 Adding a New .scss File
  <br>2.3 Default Locations
  <br>2.4 Gulp Settings
3. Getting Started
  <br>3.1 Your Style Base
  <br>3.2 Your Stylesheets
  <br>3.3 How to Code
  <br>3.4 Composing
4. Customizing Wyndsor
  <br>4.1 Settings
  <br>4.2 Base
  <br>4.3 Toolbox
  <br>4.4 Custocode
  <br>4.5 Fonts
  <br>4.6 Gulp
5. API and Bugs

## 1. Installation
You will need npm to run wyndsor and gulp. If you do already, skip \#3.
1. Clone wyndsor using a git client or download and extract a zip file to your local build.
2. Start terminal and navigate to wyndsor's root.
3. Install npm: `npm install`
3. Install gulp: `npm install gulp`.
4. Install all dependencies: `npm ci`.
5. Run gulp.

### 1.1 Using Gulp
#### Commands
Wyndsor has two gulp modes:

- Dev `gulp --dev`
  - Each .scss file is composed to it's own .css file.
  - Each stylesheet link is added to the head of your page files.
  - CSS is not minified.
- Prod `gulp --prod`
  - Each .scss file is combined in style.scss and then composed to a single .scss file.
  - Only style.css is added as stylesheet link to the head of your pages.
  - CSS is minified.

#### Browsersync
In either instance, gulp will automatically start <a href="https://browsersync.io/">browsersync</a> (for realtime browser preview and testing) and open your build in the default browser. You can disable this when starting gulp by including `--nopreview` in the command:
```
gulp --prod --nopreview
```
<hr>

## 2. Sources and Destinations

### 2.1 Compatible Filetype
Wyndsor only works with .scss files and will only compose non-partials.

### 2.2 Adding a New .scss File
To fold a new .scss file into the gulp stream and be watched, you must do the following:
1. Create and save your new .scss file in the Source Directory.
2. If gulp is running, stop it from the terminal (<kbd>ctrl</kbd> + <kbd>c</kbd>).
3. Start gulp.
4. Modify your .scss file's code and then save.

### 2.3 Default Locations
Wyndsor uses the following locations when running wyndsor:
```
/css --- Destination Directory
/wysass --- Source Directory
```

#### Dev Composition
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

#### Prod Composition
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

### 2.4 Gulp settings
You can change all of the above locations and parent stylesheet name in Gulpfile.js:
```
ROOT                = 'css/',
SRC_ROOT            = 'wysass/',
STYLE               = 'style.scss',
STYLE_CSS           = 'style.css'
```

<hr>

## 3. Getting Started

### 3.1 Your Style Base
It's recommended that you keep all style variables and settings in `_base.scss` Wyndsor considers it a dependency and will automatically look for the partial in your wysass folder. It's' injected into every working .scss file before composing takes place.

*To change the name of this partial or add more to wyndsor's dependencies list see the Customizing Wyndsor Section*

### 3.2 Your Stylesheets
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

### 3.3 How to Code (wyndsor style)
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
#### Rules for the Road
1. Wyndsor uses *keys* to interpret what kind of selector (parent or child) you're declaring.
2. You can't use a selector name or property twice in a row or more.

#### Parent Selectors
Declaring a parent selector is easy, simply type in a name. Wyndsor will consider it a class, unless you use one of the following keys:
- \# -- ids
- \\\ -- custom selector

#### Classes
##### wysass
```
class-name: (
  width: 100%,
  height: 100%
)
```
##### css
```
class-name: (
  width: 100%,
  height: 100%
)
```

#### Ids
##### wysass
```
#id-name: (
  width: 100%,
  height: 100%
)
```
##### css
```
#id-name {
  width: 100%;
  height: 100%;
}
```

#### Custom Selectors
(*you must use quotation marks following the key*)
##### wysass
```
\\".custom .selector-name > div": (
  width: 100%,
  height: 100%
)
```
##### css
```
.custom .selector-name > div {
  width: 100%;
  height: 100%;
}
```
<br>

#### Child Selectors
These map keys can be used within any parent to build out your styling.

##### Custom Selector
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

##### Children
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
##### Hyphenate
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

##### Underscore
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

##### Namespace
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

##### Preceder
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

##### List
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

##### Immediate
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

#### Breakpoints/Media Queries
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

##### Changing Your Breakpoint Settings
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
The breakpoint list can be found in Tools > \_toolbox.scss. To learn more about the @include-media vernacular when creating breakpoints, read their documentation <a href="https://include-media.com/documentation/#mixin-media">here</a>.

*NOTE: Some @include-media <a href="https://include-media.com/#features">features</a> may not yet be available in wyndsor.*
<br>
<br>

#### Pseudos
Pseudo states are automatically detected by wyndsor and can be used at any level below the parent level in your .scss DOM.

**wysass**
```
#id-name: (

  hover: (
    background: blue
  )

)
```

**css**
```
#id-name:hover {
  background: blue;
}
```
##### Toolbox List
Wyndsor references the `$pseudos` list in Tools > \_toolbox.scss to determine pseudo states. The list, by default, contains a limited number of the most commonly used pseudo states and can be modified to suit your project scope.

```
//// --- PSEUDOS --- ////////////////////////////
  $pseudos: (
    hover: ':hover',
    active: ':active',
    after: '::after',
    before: ':before',
    selection: '::selection',
    focus: ':focus',
    visited: ':visited',
    checked: ':checked',
    invalid: ':invalid',
    optional: ':optional',
    required: ':required'
  );
```
The value in each state is pulled by wyndsor and injected while composing. An example of this can be seen by comparing the `hover` and `after` states.
<br>
<br>

#### HTML Elements
HTML Elements are automatically detected by wyndsor and can be used at any level in your .scss DOM.

**wysass**
```
section: (

  \>\>div: (
    background: blue
  )

)
```

**css**
```
section div {
  background: blue;
}
```
##### Toolbox List
Wyndsor references the `$html-elements` list in Tools > \_toolbox.scss to determine what is and what isn't an html element. The list, by default, contains all html elements.
```
//// --- HTML ELEMENTS LIST --- ////////////////////////////
  $html-elements:
    \*, a, abbr, acronym,
    address, applet, area,
    article, aside, audio,
    b, base, basefont,
    bdi, bdo, big,
    blockquote, body, br,
    button, canvas, caption,
    center, cite, code,
    col, colgroup, datalist,
    dd, del, details,
    dfn, dialog, dir,
    div, dl, dt,
    em, embed, fieldset,
    figcaption, figure, font,
    footer, form, frame,
    frameset, h1, h2,
    h3, h4, h5,
    h6, h6, head,
    header, hr, html,
    i, iframe, img,
    input, ins, kbd,
    label, legend, li, logo,
    link, main, map,
    mark, menu, menuitem,
    meta, meter, nav,
    noframes, noscript, object,
    ol, optgroup, option,
    output, p, param,
    picture, pre, progress,
    q, rp, rt,
    ruby, s, samp,
    script, section, select,
    small, source, span,
    strike, strong, style,
    sub, summary, sup,
    svg, table, tbody, td,
    textarea, tfoot, th,
    thead, time, title,
    tr, track, tt,
    u, ul, var,
    video, wbr;
```
*NOTE: Modifying this list is not recommended.*
<br>
<br>

#### Aliases
Aliases can be used to include additional selectors on a parent level class, id or custom selector. An alias is applied to all subsidiary child selectors in addition to its parent.

**wysass**
```
classname: (

  alias: ".alterego",
  width: 100%,
  hover: (
    width: 80%
  )

)
```
**css**
```
.classname, .alterego {
  width: 100%;
}

.classname:hover, .alterego:hover {
  width: 80%;
}
```
There is a setting that changes what wyndsor applies aliases to, to learn more see the Customizing Wyndsor section.
<br>

#### Important
Wyndsor's approach to `!important` is to mitigate the usage of this flag by moving a selector and property to the bottom of the css stack, only if `important` (without an `!`) is used as the flag in a property value.

Wyndsor prioritizes breakpoint/media queries over the `important` flag, and will not move a property to the end if it is also within a breakpoint. The `!important` can be used, however, wyndsor will not move a property with this flag to the end of the stack.

**wysass**
```
classname: (
   color: blue important,
   background: violet !important
),

#id-name: (
  color: (desktop: black important)
)
```
**css**
```
.classname {
  background: violet !important;
}

@media (min-width: 1201px) and (max-width: 1400px) {
  #id-name {color: black;}
}

.classname {
  background: blue;
}
```
There is a setting that modifies how wyndsor interprets the `important` and `!important` flags, to learn more see the Customizing Wyndsor section.
<br>
<br>

#### Vars
Vars are wyndsor's approach to css custom properties. If you ever need to implement custom properties, wyndsor automates the process by generating a custom property name based on the selector stack (this includes all selector names and by default any breakpoint name in which the key is used).

To enable a var for a specific property, merely include `-var` after a value or as the value itself. Additionally, you can set the value of the variable by using `-var-full`.

**wysass**
```
classname: (

  color: blue -var-full,
  background: violet -var

)
```
**css**
```
.classname {
  --classname-c: blue;
  color: --var(--classname-c);
  background: --var(--classname-b);
}
```
*NOTE: This is a experimental feature, and may not work as expected.*
<br>
<br>

#### Autocode
Autocode are mixins currently included in wyndsor by default. They can be called and run automatically from any level (below the parent level) of your .scss DOM.

- Hover-CSS
- Animations-CSS
- Instagram-CSS
- Font-Awesome 5 Free
- Chart Generator
- Color Generator
- Pattern Generator
- Type Generator
- Repeater

To use autocode, simply use the `auto` declaration followed by the mixin name, and any required variables.

**Example:**
```
classname: (
  auto: (hover-css, buzz)
)

-----

.classname {
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-box-shadow: 0 0 1px transparent;
  box-shadow: 0 0 1px transparent; }
  .classname:hover, .classname:focus, .classname:active {
    -webkit-animation-name: buzz;
    animation-name: buzz;
    -webkit-animation-duration: 0.15s;
    animation-duration: 0.15s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite; }
```

##### Keyframes
Certain autocode results require css keyframes. By default these are mostly disabled in wyndsor to prevent css bloat. You can enable them for Hover-css and Animations-css by adding the hover or animation name in their respective lists:

```
//// --- HOVER KEYFRAMES --- ////////////////////////////
  $hover-keyframes: (
    bob, buzz
  );

//// --- ANIMATIONS KEYFRAMES --- ////////////////////////////
  $anime-keyframes: (
    bounce
  );
```
You can find these in Tools > \_toolbox.scss

##### Individual Autocode Instructions
Detailed overviews and instructions for each integrated mixin is coming soon.
<br>
<br>

#### Custocode
Custocode differs from autocode, in that the process to integrate into wyndsor is more plug-and-play and requires a different call. To integrate your own mixin see the Customizing Wyndsor Section.

To use custocode, simply use the `custo` declaration followed by your mixin name, and any required variables.
**Example:**
```
classname: (
  custo: (your-mixin, {any}, {#ofvariables}, {yourequire})
)

-----

.classname {
  // Your mixin's results here.
}
```
<br>

#### Overrides and Enables
Wyndsor sports two additional declarations that can be handy during the dev or debugging process. They are used within the context of applying an attribute globally to a selector's immediate properties, or it and its subsidiary child selectors/properties.
1. `override` -- A way to apply a breakpoint, all breakpoints or an important flag.
2. `enable` -- A way to enable custom properties (and future attributes).

##### Attributes
The following attributes are used as the values of the override and enable declarations. Multiple attributes can be used, though only in `override` at this time.
- `all-breakpoints` -- All of a selector's immediate properties will be composed to every breakpoint.
- `{breakpoint}` -- All of a selector's immediate properties will be moved into the specific breakpoint used.
- `important` -- All of a selector's immediate properties will be moved to the bottom of the css stack.
- `custom-props` -- Can only be used with the enable declaration and will force all of a selector's immediate properties to convert to custom properties.

##### Optional
The following keys can be used to expand an attributes reach or change its result.
- `applesauce` -- This will force wyndsor to apply an override or enable attribute(s) to the entire parent selector's stack.
- `-full` -- Can only be used with `custom-props`, and will generate the custom properties' values.

**wysass**
```
classname: (

  override: important,
  width: 100%,
  height: 100%

),

#id-name: (

  enable: custom-props-full applesauce,
  background: blue,
  hover: (color: violet)

)
```
**css**
```
#id-name {
  --id-name-b: blue;
  background: --var(--id-name-b);
}

#id-name:hover {
  --id-name-hover-c: violet;
  color: --var(--id-name-hover-c);
}

.classname {
  width: 100%;
  height: 100%;
}
```
There are a few settings that modify how wyndsor interprets overrides and enables, to learn more see the Customizing Wyndsor section.

*NOTE: These are highly experimental features, and are buggy.*
<br>
<br>

### 3.4 Composing
Composing is a fairly straightforward and automated process. Make sure you started wyndsor by running `gulp --dev` or `gulp --prod`. This will automatically have gulp watch your .scss files and any (by default) html files for changes.

Simply save the file you're working in and gulp will initiate wyndsor to compose it.

<hr>

## 4. Customizing Wyndsor
Wyndsor was built to be as flexible and scalable as possible, and provide a coding environment as minimal and human as possible. To facilitate this, wyndsor has a robust amount of settings and customizability.

### 4.1 Settings
Settings are located in `/Admin`. Switches, global parameters, and keys can be modified here.

### 4.2 Base
### 4.3 Toolbox
### 4.4 Custocode
### 4.5 Fonts
### 4.6 Gulp
