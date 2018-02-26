# Windsor
## A Snazzy SASS Composer
> Wyndsor provides a simpler way to sass. Compose css via sass maps, easily write responsive code by simply using a breakpoints name under a specific css property and integrate your own sass mixins.

<hr>

### Mapping with Wyndsor
Wyndsor will always treat any parent name as a class selector unless you use:
- "#" for ids
- "\\\" for custom selector names (i.e., .class .class-2 + div)

#### Map Keys:
Map keys can be used within any parent to build out styles. They cascade and will be composed in the order they are written.

Universally, when writing any name within a parent, you must use a backward (escape) slash "\\".
- Child
  - \\> == .parent.child
  - \\>\\> == .parent .child
  - \\>\\>\\> == .parent > .child
- Hyphen-class
  - \\- == .parent-child
  - \\-- == .parent--child
- Under-class
  - \\_ == .parent_child
  - \\____ == .parent_\_child
- Namespace
  - \: == .parent\:child
- Preceder
  - \\~ == .parent ~ .child
- Secondary Class
  - \, == .parent, .child
- Immediate
  - \+ == .parent + .child
- Custom
  - \\\".everything #anything div" == .everything #anything div


#### Layout
  ##### Methods
    - Display
    - Flexbox
    - Floats
    - Overflow
    - Vertical Alignment
    - Visibility
    - Z-Index
    - Positioning
    - Appearance (remove browser default styling)
  ##### Spacing & Size
    - Margins
    - Padding
    - Widths
    - Heights
    - Size
  #### Grids & Blocks
    - Grid Template Areas
    - Default Widths
    - Blocks (Grid Areas)
#### Palette
  ##### Colors & BGs
    - Backgrounds
    - Colors
    - Patterns
    - Opacity
    - SVG
  ##### Strokes
    - Borders
    - Border Radius
    - Shadows
    - Outline
  ##### Typography
    - Columns
    - Styles
    - Text Transform
    - Kerning/Leading
    - Text-Transform

#### Elements
  - Alerts
  - Buttons
  - Cards
  - Forms
  - Navigation
  - SVG
  - Logos & Marks
  - IE Nope
<hr>

#### Tools:
  1. CSS Custom Properties (--custom-name)
  2. CSS Namespaces (Class/:namespace = Class:namespace)
  3. CSS Classes/IDs (.Class-Name-ELement or #ID-Name-Element)
  4. CSS Direct Children (.Class.child)

#### Style Naming Syntax:
##### Class Suffixes
  - **x** -- Experience _(Margins, grid, flexbox, etc.)_
  - **p** -- Palette _(Color, Background, Border, Typography, etc.)_
  - **e** -- Element _(Forms, buttons, logos, modals, etc.)_

##### Syntax

Dapper uses the SBM approach. SBM is based on BEM, but changes up the syntax to accommodate Dapper's structural framework.

SBM
  > suite__block---modifier</br>
  > suite__block---modifier-clarifiers

  Subclass:
  > x__styler---modifier

  Namespace:
  > x__styler:modifier

  Direct Child:
  > x__styler.modifier


  p-chara-black
  t-h1:60
  e-button-large p_bg-black:hvr-blue

  Block: blok
  Buttons: bttn
	Modals: modl
	Footer: fttr
	Hover: hovr
	Brkpnt/IE Messages: nope
  Grids: grid
  Create: cr8
  Start: strt
  Name: name
  Number: nmbr

------- Comment Markup -------

//// •••••• FUNDAMENTAL IMPORTS •••••• ////
//// ▸▸▸ UPPERMOST FUNDAMENTAL IMPORTS ▸▸▸ ////
//// ▾▾▾ NETHERMOST FUNDAMENTAL IMPORTS ▾▾▾ ////

//// --- SECTION --- ////////////////////////////
  //// 1 //////////// Code/Sass Snippet Name
    //// a //////////// Snippet Sub
//// --- END SECTION --- ////////////////////////


####------- New Feature Dev List -------

1. Multiple Pseudos in one sitting.
2. Alt css property list and generator in the event a browser doesn't support a specific property.
