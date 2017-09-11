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

I. Tools (these are where the magic happens)
  A. Breakpoints
  B. Automations (vendor prefixes, generators, etc.)
  C. Fonts (import fonts and @font-faces)

II. Your Style (IDs are not allowed unless they are for uber-specific website elements)
	1. Principles
  2. Palette (Style Colors, textures, patterns, bg, etc.)
  3. Typography (Type Styles and other type related variables)

  $s3-Base-Typography
  $s3-Custom-Typography

  $s1-Base-ColumnSets
  $s1-Base-RowSets

  $s1-Base-GlobalSpecs
  $s1-Base-RowSets

  $s3-Base-ParagraphAlignments


  .patt_stripev

  .grid_col-fxd-5

  .type_bowtie

  .glob_bg

  .glob_fg

  .glob_grid-cntr

  .glob_padd-dflt

  .glob_WxH-fill

  .para_txt-left

  .glob_grid

  .grid_justify-start

  .grid_justify-end

  .clr_chara-white

  .clr_bg-night

III. Your Components
  a. Brand
      -Logos/Marks
      -Header
      -Footer
      -About-SubFooter
  a. Artboards
      -Home
      -Folio
      -Folio-Pieces
      -About
      -Resume
      -Blog
  c. Elements
     -Modals
     -Buttons
     -Nav
     -Forms
     -Displays
     -Compatibility Dialogs (Breakpoint/IE Messages)

     .artb_home-sect-1

     .artb_home-base
     .artb_folio-base
     .artb_foliopiece-base

     brnd_logo-header clr_svg-white

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
