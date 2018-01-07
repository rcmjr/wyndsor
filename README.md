# Windsor </br> A Snazzy SASS Composer + Styleset
## <i>Made for designers, by a designer.</i>
</br>

### The Dapper Framework

> A really debonair description, coming soon.

<hr>

#### Levels:
1. Base Styles
2. Element Blocks
3. Style Modifiers

#### Layout
  ##### Form
    - Display
    - Flexbox
    - Floats
    - Overflow
    - Vertical Alignment
    - Grids
    - Container
  ##### Symmetry
    - Positioning
    - Sizing
    - Spacing
  ##### Tactics
    - Visibility
    - Z-Index
    - Appearance (remove browser default styling)
    - Interactivity
#### Palette
  ##### Bases
    - Backgrounds
    - Opacity
    - Patterns
  ##### Effects
    - Borders
    - Border Radius
    - Shadows
    - Outline

#### Typography
  ##### Paragraph
    - Styling
    - Columns
    - Line-height
  ##### Character
    - Styling
    - Lists
    - Text Transform
    - Kerning/Leading

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

  Subclass:
  > x-{property name}-modifier

  Namespace:
  > x-{property name}:modifier

  Direct Child:
  > x-{property name}.modifier


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
