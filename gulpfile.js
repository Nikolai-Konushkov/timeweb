var gulp       = require('gulp'), //  Gulp
    sass         = require('gulp-sass'), // Sass ,
    browserSync  = require('browser-sync'), //  Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // сжатие JS
    cssnano      = require('gulp-cssnano'), // минификация CSS
    rename       = require('gulp-rename'), // Библиотека для переименования файлов
    del          = require('del'), // Библиотека для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Библиотека для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Библиотека для работы с png
    cache        = require('gulp-cache'), // Библиотека кеширования
    autoprefixer = require('gulp-autoprefixer');// Автопрефиксер

gulp.task('sass', function() { 
    return gulp.src('app/sass/**/*.sass') 
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function() {
    return gulp.src([ 
        // PLugins
        ])
        .pipe(concat('libs.min.js')) 
        .pipe(uglify()) 
        .pipe(gulp.dest('app/js'));
});

gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-libs', function() {
    return gulp.src('app/sass/libs.sass')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('clean', async function() {
    return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('prebuild', async function() { // Таск на production

    var buildCss = gulp.src([
        'app/css/main.css',
        'app/css/libs.min.css',
        'app/css/bootstrap.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); 
    gulp.watch('app/*.html', gulp.parallel('code')); 
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});
gulp.task('default', gulp.parallel('css-libs', 'sass', /*'scripts',*/ 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', /*'scripts'*/));