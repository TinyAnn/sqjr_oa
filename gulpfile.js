var
    gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    csslint = require('gulp-csslint'),
    rev = require('gulp-rev'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    revCollector = require('gulp-rev-collector'),
    minifyHtml = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    path = require('path'),
    group = require('gulp-group-files'),
    gulpImports = require('gulp-imports'),
    spritesmith = require('gulp.spritesmith');

var condition = true;

var fontFiles = {
    'font': {
        src: "./src/static/fonts/*",
        dest: "./dist/static/fonts/"
    }
}
var fontRev = "src/static/rev/font";

//font处理 TODO:font内联
gulp.task('font:complie', function() {
    return group(fontFiles, function(key, fileset) {
        return gulp.src(fileset.src)
            .pipe(gulpif(
                condition, rev()
            ))
            .pipe(gulp.dest(fileset.dest))
            .pipe(gulpif(
                condition, rev.manifest()
            ))
            .pipe(gulpif(
                condition, gulp.dest(imgRevPath)
            ))

    })();
});

var imgFiles = {
    'img': {
        src: "./src/static/imgs/*.*",
        dest: "./dist/static/imgs/"
    }
}

var imgRevPath = "src/static/rev/img";

//img处理 TODO:雪碧图
gulp.task('img:complie', function() {
    return group(imgFiles, function(key, fileset) {
        return gulp.src(fileset.src)
            .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
            .pipe(gulpif(
                condition, rev()
            ))
            .pipe(gulp.dest(fileset.dest))
            .pipe(gulpif(
                condition, rev.manifest()
            ))
            .pipe(gulpif(
                condition, gulp.dest(imgRevPath)
            ))
    })();
});

var spiritImgFolders = {
    "icons": {
        src: "./src/static/imgs/icons/*"
    }
}
var imgPath = "./src/static/imgs";

gulp.task("img:spirit", function() {
    return group(spiritImgFolders, function(key, fileset) {
        return gulp.src(fileset.src)
            .pipe(spritesmith({
                imgName: "../imgs/icons.png", //保存合并后图片的地址
                cssName: "../css/spirit/spirit_imgs.scss", //保存合并后对于css样式的地址
                padding: 10, //合并时两个图片的间距
                algorithm: "binary-tree", //top-down、left-right、diagonal、alt-diagonal、binary-tree
                cssTemplate: "./src/static/configs/spirit_config.css" //css模板
            }))
            .pipe(gulp.dest(imgPath));
    })();
});



var cssDest = "./dist/static/css/";
var sassFiles = {
    "css": {
        src: "./src/static/css/*.scss",
        dest: cssDest
    }
};
var
    cssRev = "src/static/rev/css",
    cssRevTmp = "src/static/cssrev",
    cssRevTmpFiles = "src/static/cssrev/*";


//CSS里更新引入文件版本号
gulp.task('css:rev', function() {
    return gulp.src(['src/static/rev/**/*.json', cssRevTmpFiles])
        .pipe(revCollector())
        .pipe(gulpif(
            condition, rev()
        ))
        .pipe(gulp.dest(cssDest))
        .pipe(gulpif(
            condition, rev.manifest()
        ))
        .pipe(gulpif(
            condition, gulp.dest(cssRev)
        ))
});

//编译scss、压缩、postcss
gulp.task('sass:compile', function() {
    return group(sassFiles, function(key, fileset) {
        return gulp.src(fileset.src)
            .pipe(cleanCSS({
                compatibility: 'ie7',
                inliner: true, // css@import
                processImport: true,
                processImportFrom: './',
                keepSpecialComments: 0 // 注释
            }))
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['> 1%']
            }))
            .pipe(gulp.dest(cssRevTmp));
    })();
});


var jsDest = "./dist/static/js";
var jsSrc = "./src/static/js";
var jsSrcFiles = "./src/static/js/*";
var jsRev = "src/static/rev/js";
var commonjsSrc = "./src/static/js/common/*.js";

//合并工具js
gulp.task('js:combo', function() {
    return gulp.src(commonjsSrc)
        .pipe(concat("common.js"))
        .pipe(gulp.dest(jsSrc))
});

gulp.task('js:compile', function() {
    return gulp.src(jsSrcFiles)
        .pipe(gulpImports())
        .pipe(gulpif(
            condition, uglify()
        ))
        .pipe(gulpif(
            condition, rev()
        ))
        .pipe(gulp.dest(jsDest))
        .pipe(gulpif(
            condition, rev.manifest()
        ))
        .pipe(gulpif(
            condition, gulp.dest(jsRev)
        ))
});

var htmlSrc = "./src/app/**/*";
//压缩Html/更新引入文件版本
gulp.task('html:compile', function() {
    return gulp.src(['src/static/rev/**/*.json', htmlSrc])
        .pipe(revCollector())
        .pipe(gulpif(
            condition, minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            })
        ))
        .pipe(gulp.dest('dist/app'));
});

gulp.task('rev:delFiles', function() {
    del([cssRevTmp]);
})

gulp.task('clean', function() {
    return gulp.src(['dist', 'src/static/rev', cssRevTmp], { read: false })
        .pipe(clean());
});

//开发构建
gulp.task('dev', ['clean'], function(done) {
    condition = false;
    runSequence(
        ['js:combo'], ['font:complie', 'img:complie', 'sass:compile', 'js:compile'], ['css:rev'], ['html:compile'],
        done);
});

//正式构建
gulp.task('build', ['clean'], function(done) {
    runSequence(
        ['js:combo', 'img:spirit'], ['font:complie', 'img:complie', 'sass:compile', 'js:compile'], ['css:rev'], ['html:compile', 'rev:delFiles'],
        done);
});

gulp.task('default', ['build']);

gulp.task('coding', ['dev', 'watch']);

gulp.task('watch', function() {

    gulp.watch(jsSrcFiles, ["js:compile"]);
    gulp.watch("src/static/css/*", function() {
        runSequence(['sass:compile'], ['css:rev']);
    });

});
