<p align="center">
    <a href="https://wyndsor.io/" target="\_blank"><img width="250" src="https://wyndsor.io/assets/Asset%207.png"></a><br><br>
    <h3>A snazzy SASS composer, and the easiest way to write responsive dry CSS.</h3>
    <h4>Wyndsor was made by a designer unhappy with most css frameworks. It aims to provide a scalable approach to front-end development, enabling developers to easily write css or build their own framework using a minimal vernacular.<br><br>Through the power of sass maps, media query consolidation, and the easiest declarations - ever - to code breakpoints, selector aliases, inline mixins, (and more), wyndsor can rapidly get you from prototype to prod.</h4><br>
    <p>For ideas, feature requests, bugs or any other conversation:
    <a href="https://github.com/rcmjr/wyndsor/issues">Discuss wyndsor on Github</a>.
</p>
<hr>

> NOTE: *Wyndsor is in beta* and kinks are being worked out.

<br>

## 1. Installation
You will need npm to run wyndsor and gulp. If you do already, skip \#3.
1. Clone wyndsor using a git client or download and extract a zip file to your local build.
2. Start terminal and navigate to wyndsor's root.
3. Install npm: `npm install`
3. Install gulp: `npm install gulp`.
4. Install all dependencies: `npm ci`.
5. Run gulp.

## 1.1 Using Gulp
### Commands
Wyndsor has two gulp modes:

- Dev `gulp --dev`
  - Each .scss file is composed to it's own .css file.
  - Each stylesheet link is added to the head of your page files.
  - CSS is not minified.
- Prod `gulp --prod`
  - Each .scss file is combined in style.scss and then composed to a single .scss file.
  - Only style.css is added as stylesheet link to the head of your pages.
  - CSS is minified.

### Browsersync
In either instance, gulp will automatically start <a href="https://browsersync.io/">browsersync</a> (for realtime browser preview and testing) and open your build in the default browser. You can disable this when starting gulp by including `--nopreview` in the command:
```
gulp --prod --nopreview
```
<hr><br>

## 2. Sources and Destinations

## 2.1 Compatible Filetype
Wyndsor only works with .scss files and will only compose non-partials.

## 2.2 Adding a New .scss File
To fold a new .scss file into the gulp stream and be watched, you must do the following:
1. Create and save your new .scss file in the Source Directory.
2. If gulp is running, stop it from the terminal (<kbd>ctrl</kbd> + <kbd>c</kbd>).
3. Start gulp.
4. Modify your .scss file's code and then save.

## 2.3 Default Locations
Wyndsor uses the following locations when running wyndsor:
```
/css --- Destination Directory
/wysass --- Source Directory
```

### Dev Composition
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

### Prod Composition
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

## 2.4 Gulp settings
You can change all of the above locations and parent stylesheet name in Gulpfile.js:
```
ROOT                = 'css/',
SRC_ROOT            = 'wysass/',
HTML_ROOT           = '../' + ROOT,
STYLE               = 'style.scss',
STYLE_CSS           = 'style.css'
```

<hr><br>

## 3. Getting Started

## 3.1 Your Style Base
It's recommended that you keep all style variables and settings in `_base.scss` Wyndsor considers it a dependency and will automatically look for the partial in your wysass folder. It's' injected into every working .scss file before composing takes place.

*To change the name of this partial or add more to wyndsor's dependencies list see the <a href="#4-customizing-wyndsor">Customizing Wyndsor</a> section*

## 3.2 Your Stylesheets
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

## 3.3 How to Code (wyndsor style)
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
### Rules for the Road
1. Wyndsor uses *keys* to interpret what kind of selector (parent or child) you're declaring.
2. You can't use a selector name or property twice in a row or more.

### Parent Selectors
Declaring a parent selector is easy, simply type in a name. Wyndsor will consider it a class, unless you use one of the following keys:
- \# -- ids
- \\\ -- custom selector

### Classes
**wysass**
```
class-name: (
  width: 100%,
  height: 100%
)
```
**css**
```
class-name: (
  width: 100%,
  height: 100%
)
```

### Ids
**wysass**
```
#id-name: (
  width: 100%,
  height: 100%
)
```
**css**
```
#id-name {
  width: 100%;
  height: 100%;
}
```

### Custom Selectors
(*you must use quotation marks following the key*)
**wysass**
```
\\".custom .selector-name > div": (
  width: 100%,
  height: 100%
)
```
**css**
```
.custom .selector-name > div {
  width: 100%;
  height: 100%;
}
```
<br>

### Child Selectors
These map keys can be used within any parent to build out your styling.

#### Custom Selector
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

#### Children
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
#### Hyphenate
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

#### Underscore
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

#### Namespace
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

#### Preceder
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

#### List
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

#### Immediate
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

### Breakpoints/Media Queries
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

#### Changing Your Breakpoint Settings
Wyndsor's breakpoint system is built on <a href="https://include-media.com/">@include-media</a>. Breakpoint settings are broken into three main parts:
1. Media Sizes
2. Media Expressions
3. Breakpoints

The system is scalable in that you can modify, remove or add to all of the above to accommodate your project scope.

**Media Sizes & Expressions**
<br>By default, wyndsor's media sizes are based on the method outlined in this article by <a href="https://medium.freecodecamp.org/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862">Medium's FreeCodeCamp</a>. They can be found in `/Tools/_toolbox`.

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
The breakpoint list can be found in `/Tools/_toolbox`. To learn more about the @include-media vernacular when creating breakpoints, read their documentation <a href="https://include-media.com/documentation/#mixin-media">here</a>.

*NOTE: Some @include-media <a href="https://include-media.com/#features">features</a> may not yet be available in wyndsor.*
<br>
<br>

### Pseudos
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
#### Toolbox List
Wyndsor references the `$pseudos` list in Tools > \_toolbox.scss to determine pseudo states. The list, by default, contains a limited number of the most commonly used pseudo states and can be modified to suit your project scope.

```
$pseudos: (
  hover: ':hover',
  active: ':active',
  after: '::after',
  ...);
```
The value in each state is pulled by wyndsor and injected while composing. An example of this can be seen by comparing the `hover` and `after` states.
<br>
<br>

### HTML Elements
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
#### Toolbox List
Wyndsor references the `$html-elements` list in Tools > \_toolbox.scss to determine what is and what isn't an html element. The list, by default, contains all html elements.
```
$html-elements:
  \*, a, abbr, acronym,
  address, applet, area,
  article, ...;
```
*NOTE: Modifying this list is not recommended.*
<br>
<br>

### Aliases
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
There is a setting that changes what wyndsor applies aliases to, to learn more see the <a href="#4-customizing-wyndsor">Customizing Wyndsor</a> section.
<br>

### Important
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
There is a setting that modifies how wyndsor interprets the `important` and `!important` flags, to learn more see the <a href="#4-customizing-wyndsor">Customizing Wyndsor</a> section.
<br>
<br>

### Vars
Vars are wyndsor's approach to css custom properties. Wyndsor has an automated process for generating custom property names based on the selector stack (this includes all selector names and by default any breakpoint name in which the key is used).

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
Custom properties can still be declared within a wysass map like usual:
**wysass**
```
classname: (
  --manualcustom-property: black,
  width: 100%,
)
```
*NOTE: This is a experimental feature, and may not work as expected.*
<br>
<br>

### Autocode
Autocode are mixins currently included in wyndsor by default. They can be called and run automatically from any level (below the parent level) of your .scss DOM. Some are called as properties, while others can be called within a css property.

- Hover-CSS
- Animations-CSS
- Instagram-CSS
- Font-Awesome 5 Free
- Chart Generator
- Color Generator
- Pattern Generator
- Type Generator
- Repeater

#### Whole Property Autocode
Whole property autocode can write new properties and values, and generate additional selectors. To initiate, simply use the `auto` declaration followed by the mixin name, and any required variables.

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

#### Property Value Autocode
Property Value autocode differs from it's whole sibling, in that it activates only when used in specific properties, manipulating only the value. To initiate, simply use `-auto` prior to any required variables.
```
classname: (
  color: (-auto, rgba, $black, .5, darken)
)

-----

.classname {
  color: rgba(6, 8, 38, 0.5); }
```
#### Custom Autocode
Custom autocode differs from autocode, in that the process to integrate into wyndsor is more plug-and-play and requires different declarations. To integrate your own mixin as custom autocode see the <a href="#4-customizing-wyndsor">Customizing Wyndsor</a> section.

To use custom autocode, simply use `custo` followed by your mixin name or `-custo`, and any required variables.
```
classname: (
  custo: (your-mixin, {any}, {#ofvariables}, {yourequire})
),

#id-name: (
  width: (-custo, {your}, {variables}, {here})
)
```
#### Keyframes
Certain mixins require css keyframes. By default these are mostly disabled in wyndsor to prevent css bloat. You can enable them for Hover-css and Animations-css by adding the hover or animation name in their respective lists:

```
//// --- HOVER KEYFRAMES --- ////////////////////////////
  $hover-keyframes: (
    bob, buzz
  );

//// --- ANIMATIONS KEYFRAMES --- ////////////////////////////
  $animate-keyframes: (
    bounce
  );
```
You can find these in Tools > \_toolbox.scss

#### Individual Autocode Instructions
Detailed overviews and instructions for each integrated mixin is coming soon.
<br>
<br>

### Overrides and Enables
Wyndsor sports two additional declarations that can be handy during the dev or debugging process. They are used within the context of applying an attribute globally to a selector's immediate properties, or it and its subsidiary child selectors/properties.
1. `override` -- A way to apply a breakpoint, all breakpoints or an important flag.
2. `enable` -- A way to enable custom properties (and future attributes).

#### Attributes
The following attributes are used as the values of the override and enable declarations. Multiple attributes can be used, though only in `override` at this time.
- `all-breakpoints` -- All of a selector's immediate properties will be composed to every breakpoint.
- `{breakpoint}` -- All of a selector's immediate properties will be moved into the specific breakpoint used.
- `important` -- All of a selector's immediate properties will be moved to the bottom of the css stack.
- `custom-props` -- Can only be used with the enable declaration and will force all of a selector's immediate properties to convert to custom properties.
- `breakname` -- Adds breakpoint names that have been declared within a selector to the end of its name.

#### Optional
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
There are a few settings that modify how wyndsor interprets overrides and enables, to learn more see the <a href="#4-customizing-wyndsor">Customizing Wyndsor</a> section.

*NOTE: These are highly experimental features, and are buggy.*
<br>
<br>

## 3.4 Composing
Composing is a fairly straightforward and automated process. Make sure you started wyndsor by running `gulp --dev` or `gulp --prod`. This will automatically have gulp watch your .scss files and any (by default) html files for changes.

Simply save the file you're working in and gulp will initiate wyndsor to compose it. Note that gulp will only process .scss files that have had a change made to them.

### Before Prod
Before saving in prod mode. All your .scss map names must be up-to-date in wyndsor's `_maps` file. It is located in `/Admin`.
```
$Epic-Map: map-combine(
  --- Only Change These
  $w-Hero,
  $i-Intro,
  ...
  ---------------------
true);
```
*NOTE: Modifying anything other than your map names is not recommended and will break wyndsor's core (while gulp is in prod mode).*
<hr><br>

## 4. Customizing Wyndsor
Wyndsor was built to be flexible and scalable and provide a coding environment as minimal and human as possible. To facilitate this, wyndsor has a robust amount of settings and customizability.

## 4.1 Settings
Settings are located in `/Admin`. Switches, global parameters, and keys can be modified here. Whenever a setting is adjusted, you must re-save your .scss files in order for the updated setting to apply.

### Switches
Switches can modify wyndsor's behavior and how it interprets different keys.

`$Enable-Overrides: yes|no` --- Enables or disables overrides.

`$Scope-BreakpointOverride: norm|all` --- Switch between overriding everything but existing breakpoints (norm) or everything regardless of existing breakpoints (all).

`$Enable-Features: yes|no` --- Turns on or off enables.

`$Enable-ImportantEpic: yes|no` --- Enables or disables important. If disabled, all css with the `important` tag will be disregarded during composing.

`$Disable-TrueImportantTag: no|yes` --- Enables or disables allowing !important tags while composing.

`$Enable-NameBreak: yes|no` --- Enables or disables the addition of breakpoints names to the ends of selectors.

`$Alias-BreakpointOnly: no|yes` --- Adds breakpoint name to aliases and only allows them within breakpoints/media queries.

### Global Parameters
`$Global-Default-Unit: px|rem|%|etc` --- This is used in the repeater mixin as the default unit when one isn't included with an individual number.

`$Global-NameBreak-Separator: default|default-under|direct-child|child|namespace` --- This is used when adding breakpoint names onto selectors is enabled. Options: direct-child `'.'`, child `' .'`, namespace `'\:'`, default `'-'`, default-under `'_'`.

### Keys
Keys are wyndsor's method of identifying if you're declaring a selector, creating an alias, or using overrides/enables. When using special characters, you must use an escape slash `\`.
```
--- Default Key for Child
$sass-child: "\>";

--- Custom Key for Child
$sass-child: "\%";
```

### Override & Enable Keys
You can change the default keys used for override and enable attributes and optional settings.
```
--- Default Key for Custom Property Attribute
$wy-customprops: custom-props;

--- Custom Key for Custom Property Attribute
$wy-customprops: vars;
```

### Typography
These settings control the behavior of the typography generator.

`$Enable-ATG: no|yes` --- Enables or disables the typography generator.

`$sass-autotype: "type-style"` --- You can change the primary key to initiate the typography generator.

`$base-fontsize: 100%` --- Change this to alter the ratio of px to rem.

`$base-lineheight: 1.6` --- Sets the base line-height.

<br>
*NOTE: 1) All keys must be unique or wyndsor's core will break. 2) Changing any of the sass variable names in wyndsor's settings will result in an error, you must change all instances or not at all.*

## 4.2 Base
The base file contains all the necessary dependencies of a vanilla wyndsor install. You should add any dependencies required on a global project scale here (such as, additional partials with project variables), rather than in the gulpfile.

The base file is located in `/Admin/Partials`.

## 4.3 Toolbox
The toolbox contains lists for different aspects of wyndsor including, breakpoints, pseudos, html element recognition, and the typography generator.

### Breakpoints, Media Sizes and Expressions
Add, remove or modify your project's media query breakpoints here. You will need to reference your media sizes and expressions as you build out your breakpoints.
```
--- Breakpoint
desktop: ('>tablet', '<=desktop')

--- Media Size
desktop: 1400px,

--- Media Expression
screen: 'screen'
```
All of these can be found in `Tools/toolbox`.

### Keyframes
By default, most keyframes are disabled to prevent bloat. In order for some Hover.css or Animation.css results to work correctly, the hover or animation name must be added to its respective list in the toolbox.
```
// Hover-css
$hover-keyframes: (
  bob, buzz
);

// Animations-css
$animate-keyframes: (
  bounce
);
```
For a full breakdown of hover or animation names please see the <a href="http://ianlunn.github.io/Hover/#effects">Hover.css list</a> and <a href="https://github.com/daneden/animate.css#basic-usage">Animate.css list</a>.

### Custom Autocode
The custom autocode section of the toolbox is where you add calls to your custom mixins. Wyndsor will look here while composing and initiate listed mixins.

The `$splitter` variable is generated by the wyndsor switchboard and determines whether a custom whole property or property value autocode is being requested.
```
  --- Whole Property Autocode
  @if $splitter == custo-prop {}
  --- Property Value Autocode
  @else if $splitter == custo-val {}
```
See the <a href="#5-api--bugs">API</a> section for what variables need to be included in your toolbox mixin call.

### Pseudos List
You can modify the list of pseudos that wyndsor will look for when composing.
```
$pseudos: (
  hover: ':hover',
  active: ':active',
  after: '::after',
  ...
);
```

### HTML Elements List
You can modify the list of html elements that wyndsor will look for when composing. However, modifying this list is not recommended.
```
$html-elements:
  \*, a, abbr, acronym,
  address, applet, area,
  article, aside, audio,
  ...
);
```

### Typography Generator
You can adjust which keys wyndsor will look for before running the typography generator and what units the generator will convert.
```
$ATG:
  "font-size",
  "type-style";

$Units:
  px, rem, em,
  %, ch, pc,
  in, cm, mm,
  pt, ex, vw,
  vh, vmin, vmax;
```

*NOTE: The typography generator is an experimental feature, and may not work as intended.*

<hr><br>

## 5. API & Bugs
## API
Wyndsor's api is used to integrate custom mixins, which are called by the custom whole property `custo` or property value `-custo` declarations.

### Redline & Redline String
Redline is a variable that carries a list version of a property. It should be for validation and/or to alter a mixin's behavior.
```
$redline
$redline-str
```
### Greenline & Greenline String
Greenline is a variable that carries a list of a property's values.
```
$greenline
$greenline-str
```
### Greenline Length
Greenline Length is a count of the Greenline List. It can be used to validate the presence of a specific amount of values in a property.
```
$greenline-length
```
*NOTE: Both Redline and Greenline String versions are converted by the switchboard from lists before they are used in a mixin.*

### Splitter
Splitter carries the type of autocode being called by a declaration in a wysass map. For Custom autocode there are two types:

`custo-prop` = `custo` --- Whole Property Autocode

`custo-val` = `-custo` --- Property Value Autocode

Splitter is used in the toolbox to initiate types of mixins relative to the declaration used. Please see the <a href="#43-Toolbox">Toolbox</a> section for how this area works.
```
$splitter
```
### Breakpoint
Breakpoint carries breakpoint names used in a property. It should be used for validation and/or media queries.
```
$breakpoint
```
### Epic Act
Epic Act carries the act the switchboard is in. Wyndsor's core will use this to determine which part of the-epic the switchboard will make a connection to, for each property. There are three main acts: `breakpoint`, `important`, `normal`. This should be used in conjunction with Breakpoint and/or for validation.
```
$EpicAct
```
### Important Check
Important Check carries true|false depending on whether an `!important` flag has been used.
```
$important-check
```
### Functions
A wide variety of functions are at use in wyndsor's core and can be used in your custom mixins. These can be found in `/Admin/Core/_automations`.

<hr><br>

## Known Bugs
- Single values that require quotation marks, such as font-family names (e.g. `"myriad-pro"`), must be double-quoted (e.g. `"'myriad-pro'"`).
- Custom properties are missing hyphens between different segments.
- And all future ones waiting to be found!
