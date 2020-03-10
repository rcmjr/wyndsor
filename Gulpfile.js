    // GULP REQUIRED PACKAGES
    const $                 = require('gulp-load-plugins')({lazy: true, camelize: true}),
          argv              = require('yargs').argv,
          server            = require('browser-sync').create(),
          gulp              = require('gulp'),
          sass              = require('gulp-sass'),
          inject            = require('gulp-inject'),
          gulpcached        = require('gulp-cached'),
          dependents        = require('gulp-dependents'),
          cssnano           = require('cssnano'),
          autoprefixer      = require('autoprefixer'),
          replace           = require('gulp-replace'),
          del               = require('del'),
          postcss           = require('gulp-postcss'),
          log               = require('fancy-log');


    // SOURCE, DESTINATION AND FILE VARIABLES
    const CSS_ROOT            = 'css/',       // Root of css files
          SASS_ROOT           = 'wysass/',    // Root of wyndsor files
          HTML_ROOT           = 'html/',      // Root of html files
          SASS_STYLE          = 'style.scss', // Your main style.scss file
          CSS_STYLE           = 'style.css',  // Your main style.css file
          BROWSER_PORT        = 8000;         // BrowserSync Port

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    //// --- DANGER ZONE - CHANGE ANY OF THIS AT YOUR OWN RISK --- /////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // THESE DEFINE CORE LOCATIONS & FILES
    const SASS_ALL_FILES       = [SASS_ROOT + '**/*.scss', '!' + SASS_ROOT + '_*/**/*', '!' + SASS_ROOT + '**/_*.scss'],  // Accounts for the scss files in your sass root/folders
          SASS_PROD_DEST       = CSS_ROOT + 'prod/',                                                                      // Where gulp temorarily saves individual scss files
          SASS_ALL_FILES_PROD  = SASS_PROD_DEST + '**/*.scss',                                                            // Gets all scss files in the temp prod folder
          CSS_DEST             = CSS_ROOT,                                                                                // Where all your css files are
          CSS_DEV_DEST         = CSS_ROOT + 'dev/',                                                                       // Where all dev css files end up except for your style.css file
          HTML_ALL_FILES       = HTML_ROOT + '*.html',                                                                    // Accounts for all html files in your html root/folders
          WYSASS_BASE          = SASS_ROOT + '__admin/partials/_include-partials.scss',                                   // Where the wyndsor includes file is
          WYSASS_MAPS          = SASS_ROOT + '__admin/_maps.scss',                                                        // Where the wyndsor maps file is
          WYSASS_EPIC          = SASS_ROOT + '__admin/core/_the-epic.scss',                                               // Where the wyndsor epic file is
          WYSASS_DEPENDENCIES  = [SASS_ROOT + '__admin/partials/_reset.scss',                                             // List of all wyndsor dependencies
                                  SASS_ROOT + '_fonts.scss',                                                              // Location of your font includes file
                                  SASS_ROOT + '__tools/_toolbox.scss',                                                    // Location of your toolbox file
                                  SASS_ROOT + '__tools/mixins/_criticals.scss'];                                          // Where the mixin toolbox is

    // CHECKS FOR --dev, --prod, --nopreview FLAGS
    isDevelopment     = !!(argv.dev),
    isProduction      = !!(argv.prod),
    noPreview         = !!(argv.nopreview),

    // SASS & POSTCSS OPTIONS
    sassOptions       = {errLogToConsole: true, outputStyle: 'nested'},
    plugins           = $.if(isDevelopment, [autoprefixer({cascade: true})], [autoprefixer({cascade: true}), cssnano()]);

    // ANCHORS & TAGS FOR WYSASS AND STYLE FILES, & WATCHER SERIES/PARALLELS
    const /// Scss file anchors
          wysassOpen                  = '$w: (',
          wysassClose                 = '); // w',
          wysassMap                   = '$Epic-Map: $w;',

          /// Scss file tags
          scssFile_HdStartTag         = '// **',
          scssFile_HdEndTag           = '// *',
          scssFile_FtStartTag         = '// ~~',
          scssFile_FtEndTag           = '// ~',

          /// Style file tags
          styleFile_1StartTag         = '// <<',
          styleFile_1EndTag           = '// >>',
          styleFile_2StartTag         = '// ▽▽',
          styleFile_2EndTag           = '// △△',
          styleFile_3StartTag         = '// ^^',
          styleFile_3EndTag           = '// ^',
          styleFile_4StartTag         = '// ##',
          styleFile_4EndTag           = '// #',

          /// Scss file anchor variables
          scssAnchorHeader            = wysassOpen,
          scssReplacementHeader       = scssFile_HdStartTag + '\n' + scssFile_HdEndTag + '\n' + scssAnchorHeader,
          scssAnchorFooter            = wysassClose,
          scssReplacementFooter       = scssAnchorFooter + '\n' + wysassMap + '\n' + scssFile_FtStartTag + '\n' + scssFile_FtEndTag;

          /// Gulp Build Vars
          build_css_files             = $.if(isDevelopment,
                                                          gulp.series(buildScssFiles, postCSS, inject_header, reload),
                                                          gulp.series(buildScssFilesforProd, buildStyleFileforProd, postCSS, inject_header, reload, cleanup)),        // Either builds css files separately or merges them into style.css.
          build_style_sheet           = $.if(isDevelopment,
                                                          gulp.series(buildStyleFileforDev, postCSSStyle, inject_header, reload),
                                                          gulp.series(buildScssFilesforProd, buildStyleFileforProd, postCSSStyle, inject_header, reload, cleanup)),   // Either injects links to css files or merges all sass files into style.css.
          inject_css_in_html          = $.if(isDevelopment,
                                                          '**/*.css',
                                                          CSS_STYLE);                                                                                                 // Injects links to your css files into the header of your html files

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    //// --- GULP DEFAULT TASK --- /////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // DEFAULT BUILD TASK
    /// Starts the task without BrowserSync.
    if (noPreview) {
      gulp.task('default', gulp.parallel(watch_wysass, watch_style));}

    /// Starts the task with BrowserSync.
    else {
      gulp.task('default', gulp.series(run_server, gulp.parallel(watch_wysass, watch_style)));}

    /// Default Build Description
    gulp.task('default').description = "This is the default task, it runs the server and starts wyndsor.";

    // LOG START
    if (isDevelopment) {console.log('STARTING WYNDSOR IN DEV MODE!')}
    else {console.log('STARTING WYNDSOR IN PROD MODE!')}

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    //// --- PRIMARY FUNCTIONS --- /////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // FUNCTION THAT BUILDS WYSASS SCSS FILES (IN DEV MODE ONLY)
    function buildScssFiles(cb) {
      console.log("STARTING TO BUILD YOUR SCSS FILES!");

      /// Loads all sass files into the stream
      return gulp.src(SASS_ALL_FILES)

      /// Uses only partials that have changed
      .pipe(gulpcached('sassfiles'))
      .pipe(dependents())

      /// Replaces anchors
      .pipe(replace(scssAnchorHeader, scssReplacementHeader))
      .pipe(replace(scssAnchorFooter, scssReplacementFooter))

      /// Injects WYSASS BASE file
      .pipe(inject(gulp.src(WYSASS_BASE, {read: false}), {
              relative: true,
              starttag: scssFile_HdStartTag,
              endtag: scssFile_HdEndTag,
              transform: function (filepath) {
                  return '@import "' + filepath + '";';}}))

      /// Injects WYSASS EPIC file
      .pipe(inject(gulp.src(WYSASS_EPIC, {read: false}), {
              relative: true,
              starttag: scssFile_FtStartTag,
              endtag: scssFile_FtEndTag,
              transform: function (filepath) {
                  return '@import "' + filepath + '";';}}))

      /// Runs sass and sends error if something goes wrong
      .pipe(sass(sassOptions).on('error', sass.logError))

      /// Declares css destination and saves files
      .pipe(gulp.dest(CSS_DEV_DEST));

      /// Callback
      cb();
    }


    // FUNCTION THAT BUILDS THE WYSASS STYLE FILE (IN DEV MODE ONLY)
    function buildStyleFileforDev(cb) {
      console.log("BUILDING YOUR STYLESHEET.");

      /// Loads your style.scss into the stream
      return gulp.src(SASS_STYLE)

      /// Injects @import file statements into style.css
      .pipe(inject(gulp.src(WYSASS_DEPENDENCIES, {read: false}), {relative: true,
        starttag: styleFile_1StartTag,
        endtag: styleFile_1EndTag,
        transform: function (filepath) {
            return '@import "' + filepath + '";';}}))

      /// Runs Sass and sends error if something goes wrong
      .pipe(sass(sassOptions).on('error', sass.logError))

      /// Declares css destination
      .pipe(gulp.dest(CSS_DEST));

      /// Callback
      cb();
    }


    // FUNCTION THAT BUILDS YOUR COMPREHENSIVE WYSASS STYLE FILE (IN PROD MODE ONLY)
    function buildStyleFileforProd(cb) {
      console.log("COMBINING WYNDSOR FILES INTO STYLESHEET.");

      /// Adds wysass base to the end of wysass dependencies
      /// and loads the style.scss file into the stream.
      WYSASS_DEPENDENCIES.unshift(WYSASS_BASE)
      return gulp.src(SASS_STYLE)

      /// Injects wysass dependencies into the style.scss file
      .pipe(inject(gulp.src(WYSASS_DEPENDENCIES, {read: false}), {relative: true,
              starttag: styleFile_1StartTag,
              endtag: styleFile_1EndTag,
              transform: function (filepath) {
                  return '@import "' + filepath + '";';}}))

      /// Replaces second set of tags in style.scss in prep for all wysass files.
      .pipe(replace(styleFile_2StartTag, wysassOpen))
      .pipe(replace(styleFile_2EndTag, wysassClose))

      /// Injects all wysass scss files into style.scss.
      .pipe(inject(gulp.src(SASS_ALL_FILES_PROD), {relative: true,
              starttag: styleFile_3StartTag,
              endtag: styleFile_3EndTag,
              transform: function(filepath, file) {
                 return file.contents.toString();}
              }))

      /// Injects wyndsor maps and epic into style.scss.
      .pipe(inject(gulp.src([WYSASS_MAPS, WYSASS_EPIC], {read: false}), {relative: true,
              starttag: styleFile_4StartTag,
              endtag: styleFile_4EndTag,
              transform: function (filepath) {
                  return '@import "' + filepath + '";';}}))
      .on('end', function () {log("RUNNING GULP-SASS, HANG FOR JUST A SEC.")})

      /// Runs Sass and Sends error if something goes wrong
      .pipe(sass(sassOptions).on('error', sass.logError))

      /// Declares css destination
      .pipe(gulp.dest(CSS_DEST));

      /// Callback
      cb();
    }

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    //// --- FUNCTION DEPENDENCIES --- /////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // FUNCTION THAT PREPARES SCSS FILES FOR INJECTING INTO STYLE.SCSS (IN PROD MODE ONLY)
    function buildScssFilesforProd(cb) {
      console.log("PREPPING SCSS FILES FOR COMBINING.");

      /// Loads all wysass scss files into the stream
      return gulp.src(SASS_ALL_FILES)

        /// Replaces anchors in all of the files
        .pipe(replace(scssAnchorHeader, ''))
        .pipe(replace(scssAnchorFooter, ''))

        /// Saves the files to a temporary file
        .pipe(gulp.dest(SASS_PROD_DEST));

        /// Callback
        cb();
    }


    // FUNCTION THAT ADDS PREFIXES AND MINIFIES STYLE.CSS FILE
    function postCSSStyle(cb) {
      console.log("ADDING PREFIXES AND MINIFYING.");

      /// Loads style.scss into stream
      return gulp.src(CSS_ROOT + CSS_STYLE)

        /// Runs postcss
        .pipe(postcss(plugins))

        /// Saves files back to your css destination
        .pipe(gulp.dest(CSS_DEST))

        /// Callback
        cb();
    }


    // FUNCTION THAT ADDS PREFIXES AND MINIFIES CSS FILES
    function postCSS(cb) {
      console.log("ADDING PREFIXES.");

      /// Loads all css files into stream
      return gulp.src(CSS_ROOT + '**/*.css')

        /// Runs postcss
        .pipe(postcss(plugins))

        /// Saves files back to your css destination
        .pipe(gulp.dest(CSS_DEST))

        /// Callback
        cb();
    }


    // FUNCTION THAT INJECTS LINKS TO CSS FILES IN HTML HEADER
    function inject_header(cb) {
      console.log("ADDING ALL YOUR CSS FILES TO YOUR HTML HEAD.");

      /// Sets all your html files as the target
      var target  = gulp.src(HTML_ALL_FILES),

          /// Sets css files and/or style.css as the sources
          sources = gulp.src([CSS_DEST + inject_css_in_html], {read: false});

      /// Loads and injects files
      return target.pipe(inject(sources, {relative: true}))

        /// Saves the files back to your html root
        .pipe(gulp.dest(HTML_ROOT));

        /// Callback
        cb();
    }


    // FUNCTION THAT STARTS BROWSERSYNC AND LOCAL SERVER
    function run_server(cb) {

      /// Initiates Server
      server.init({
        server: [HTML_ROOT],
        port: BROWSER_PORT
      });

      /// Callback
      cb();
    }


    // FUNCTION THAT RELOADS BROWSER ON CHANGE COMPLETITION
    function reload(cb) {

      /// Reloads browser
      server.reload();

      /// Callback
      cb();
    }


    // FUNCTION THAT DELETES TEMP FOLDERS
    function cleanup(cb) {
      console.log("CLEANING UP, HANG TIGHT.");

      /// Deletes temp folders
      return del([SASS_PROD_DEST, CSS_DEV_DEST], {force:true})

      /// Callback
      cb();
    }

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    //// --- WATCHERS --- //////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // WATCHES ALL YOUR WYSASS FILES (DO NOT USE FOR REGULAR SCSS FILES)
    function watch_wysass() {

      /// Watches all wysass scss files for changes
      return gulp.watch(SASS_ALL_FILES,
                        build_css_files
                        );}

    // WATCHES FOR CHANGES IN YOUR STYLE.SCSS FILE
    function watch_style() {

      /// Watches style.scss file for changes
      return gulp.watch([SASS_STYLE],
                        build_style_sheet
                        );}
