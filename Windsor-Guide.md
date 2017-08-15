// Windsor - The Fantastically Snazzy CSS Framework for Designers //
//////////////////////////////////////////////////// by Creatable.

TOC:
I. HTML Structure
II. SASS Structure


------- HTML Structure -------

1. Base : Section Divs
  2. Sand/Surfacing : Background Styling (color/pattern/picture/etc)
    3. Frame/Box : Section Padding, Column/Row Gutters
      4. Play Areas : Rows
        5. Bins/Slide Anchors : Columns/Divs
            a. Toys/Slide Parts : HTML/PHP Elements
            b. Weeds - Absolute Elements with Bleed


------- SASS Structure -------

1. Tool-Chest (these are where the magic happens)
  a. Automations (vendor prefixes, auto generate, etc.)
  b. Breakpoints
  c. Fonts (import fonts and establish ms)
  d. Colors
  e. Animations
	f. Layout (Alignment, positioning, etc.)
2. Your Style
	a. Base Settings
	b. Artboard (Header/Footer, Rows, columns, etc.)
  c. Typography (Type Styles)
  d. Palette (Style Colors, textures, patterns, bg, etc.)
  e. Design Principles (Padding, Margin, alignemnt, layout, etc. settings)
  f. Creative Library (Theme-wide object styles, animations, and classes)
3. Your Components (all should be extending % and creating .classes)
  a. Blocks (Components, like specific divs or sections)
  c. Buttons
  d. Modals
  e. Nav
  f. Footer
  e. Forms
  f. Logos
  g. Hover
  h. Breakpoint/IE Messages

	State rules. In this section, the various statuses of the modules and the basis of the site are prescribed. This is the only section in which the use of the keyword "! Important" is acceptable.


  ------- CSS Component Makeup -------

  t-{tool} = For all of the fundamentals
  s-{style} = For all of the styles
  c-{component} = For all of the components

	Block: blok
	Buttons: bttn
	Modals: modl
	Footer: fttr
	Hover: hovr
	Brkpnt/IE Messages: nope
  Grids: grid
  Create: cr8
  Start: strt
  Name: n
  Number: nmbr

------- Comment Markup -------

//// •••••• FUNDAMENTAL IMPORTS •••••• ////
//// ▸▸▸ UPPERMOST FUNDAMENTAL IMPORTS ▸▸▸ ////
//// ▾▾▾ NETHERMOST FUNDAMENTAL IMPORTS ▾▾▾ ////

//// --- SECTION --- ////////////////////////////
  //// 1 //////////// Code/Sass Snippet Name
    //// a //////////// Snippet Sub
//// --- END SECTION --- ////////////////////////
