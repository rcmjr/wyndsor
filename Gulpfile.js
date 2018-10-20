var $                 = require('gulp-load-plugins')({lazy: true, camelize: true}),
    argv              = require('yargs').argv,
    browser           = require('browser-sync'),
    sequence          = require('run-sequence'),
    gulp              = require('gulp'),
    sass              = require('gulp-sass'),
    inject            = require('gulp-inject'),
    gulpcached        = require('gulp-cached'),
    gulpif            = require('gulp-if'),
    concat            = require('gulp-concat'),
    imported          = require('gulp-sass-partials-imported'),
    cssnano           = require('gulp-cssnano'),
    autoprefixer      = require('gulp-autoprefixer');

    // Check for --dev or --prod flag
    isDevelopment     = !!(argv.dev),
    isProduction      = !!(argv.prod),
    noPreview         = !!(argv.nopreview),

    // Gulp-Sass Options
    sassOptions       = {errLogToConsole: true, outputStyle: 'nested'};

    // Source, Destination and Port Vars
    var ROOT                = '../css/',
        SRC_ROOT            = 'wysass/',
        HTML_ROOT           = '../',
        STYLE               = 'style.scss',
        STYLE_CSS           = 'style.css';

    // WARNING: THESE REFERENCE CORE LOCATIONS - CHANGE AT YOUR OWN RISK //
    var SRC_ALL             = SRC_ROOT + '**/*.scss',
        DEST_STYLE          = ROOT,
        DEST_STYLES_DEV     = ROOT + 'dev/',
        DEST_HTML_ALL       = HTML_ROOT + '*.html',
        PORT                = 8000,
        STYLE_BASE          = 'Admin/Partials/_base.scss',
        STYLE_DEPENDANCIES  = ['Admin/Partials/_reset.scss',
                                'wysass/_fonts.scss',
                                'Tools/_toolbox.scss',
                                'Tools/Mixins/Animations-css/_animations.scss',
                                'Tools/Mixins/Hover-css/_keyframes.scss',
                                'Tools/Mixins/FontAwesome/_awesomeness.scss'],
        STYLE_MAPS          = 'Admin/_maps.scss',
        STYLE_EPIC          = 'Admin/Core/_the-epic.scss';

    // Build Vars
    server_build_load       = (isDevelopment === true) ? ['build'] : null,
    server_run              = (noPreview === false) ? ['server'] : null,
    scss_build_task         = $.if(isDevelopment, ['build'], ['inject_style-PROD']),
    style_build             = [STYLE],
    style_build_task        = $.if(isDevelopment, ['inject_style-DEV'], ['inject_style-PROD']),
    style_head_inject       = $.if(isDevelopment, '**/*.css', STYLE_CSS),
    style_post_css          = $.if(isDevelopment, [DEST_STYLES_DEV], [DEST_STYLE]);

    // Messages
    if (isDevelopment) {
      console.log('Starting wyndsor in dev mode.')
    } else {
      console.log('Starting wyndsor in prod mode')
    }

  ///////////////////////////////////////////////////
  // Injects dependencies into individual style scss files only when in dev mode
  gulp.task('build', function () {
    gulp.src(SRC_ALL)

    // Uses only partials that have changed
    .pipe(gulpcached('sassfiles'))

    // Injects dependencies into dev files
    .pipe($.inject(gulp.src(STYLE_BASE, {read: false}), {
      relative: true,
      starttag: '// inject: dependenciesbase //',
      endtag: '// endinject: dependenciesbase //',
      transform: function (filepath) {
          return '@import "' + filepath + '";';
      }}))
    .pipe($.inject(gulp.src(STYLE_EPIC, {read: false}), {
      relative: true,
      starttag: '// inject: dependenciesepic //',
      endtag: '// endinject: dependenciesepic //',
      transform: function (filepath) {
          return '@import "' + filepath + '";';
      }}))

      // Sends error if something goes wrong
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      // Declares css destination as docs/css/Style
      .pipe(gulp.dest(DEST_STYLES_DEV))
      .pipe(browser.reload({stream: true}));
  });

  // Imports for Prime DEV
  gulp.task('inject_style-DEV', function () {
    var sources = gulp.src(STYLE_DEPENDANCIES, {read: false});
    gulp.src(STYLE)
    .pipe(inject(sources, {relative: true,
      starttag: '// inject: styledependencies //',
      endtag: '// endinject: styledependencies //',
      transform: function (filepath) {
          return '@import "' + filepath + '";';}}))
      // Sends error if something goes wrong
      .pipe(sass(sassOptions).on('error', sass.logError))
      // Adds Prefixes
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      // Declares css destination
      .pipe(gulp.dest(DEST_STYLE))
      .pipe(browser.reload({stream: true}));
  });

  // Imports for PROD
  gulp.task('inject_style-PROD', function () {

    // Adds base, all styles, the maps and the epic to style.scss
    STYLE_DEPENDANCIES.unshift(STYLE_BASE);
    STYLE_DEPENDANCIES.push(SRC_ALL, STYLE_MAPS, STYLE_EPIC);
    var sources = gulp.src(STYLE_DEPENDANCIES, {read: false});
    gulp.src(STYLE)
    // Starts injection
    .pipe(inject(sources, {relative: true,
      starttag: '// inject: styledependencies //',
      endtag: '// endinject: styledependencies //',
      transform: function (filepath) {
          return '@import "' + filepath + '";';}}))
      // Sends error if something goes wrong
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      // Minifies CSS
      .pipe(cssnano())
      // Declares css destination
      .pipe(gulp.dest(DEST_STYLE))
      .pipe(browser.reload({stream: true}));
  });

  // Injects css files into html header // WORKING
  gulp.task('inject_header', function () {
    var target  = gulp.src(DEST_HTML_ALL);
    var sources = gulp.src([DEST_STYLE + style_head_inject], {read: false});
    return target.pipe(inject(sources, {relative: true}))
      .pipe(gulp.dest(HTML_ROOT))
      .pipe(browser.reload({stream: true}));
  });

  ////////////////////////////////////////
  // Start a server with LiveReload to preview the site in  /// WORKING
  gulp.task('server', server_build_load, function() {
    browser.init({
      server: [HTML_ROOT], port: PORT
    });
  });


  // Watches for changes
  gulp.task('default', server_run, function() {
    gulp.watch([SRC_ALL], scss_build_task); // Watches individual scss
    gulp.watch(style_build, style_build_task); // Watches style SCSS
    gulp.watch([DEST_HTML_ALL], ['inject_header']); // Reloads if html files updates
  });
