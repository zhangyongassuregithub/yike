var gulp = require('gulp');
var less=require('gulp-less');
var cssmin=require('gulp-cssmin');
var concat=require('gulp-concat');
var autoprefixer=require('gulp-autoprefixer');
var rev=require('gulp-rev');
var revCollector=require('gulp-rev-collector');
var uglify=require('gulp-uglify');
var html=require('gulp-htmlmin');
var imagemin=require('gulp-imagemin');
var useref=require('gulp-useref');
var gulpif=require('gulp-if');
var rename=require('gulp-rename');

gulp.task('css',function(){
    //return 可以让依赖异步加载，同步执行 这是guLp3的依赖关系处理
    gulp.src('./public/less/main.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rev())
    .pipe(gulp.dest('./release/public/css'))
    .pipe(rev.manifest())
    .pipe(rename('css-manifest.json'))
    .pipe(gulp.dest('./release/rev'));
});

gulp.task('image',function(){
    gulp.src(['./public/images/**/*','./upload/*'],{base:'./'})
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./release'))
    .pipe(rev.manifest())
    .pipe(rename('image-manifest.json'))
    .pipe(gulp.dest('./release/rev'))
});

gulp.task('js',function(){
     gulp.src('./index.html')
    .pipe(useref())
    .pipe(gulpif('*.js',uglify()))
    .pipe(rev())
    //可以判断当只是js文件是在添加版本号
    // .pipe(gulpif('*.js',rev()))
    .pipe(gulp.dest('./release'))
    .pipe(rev.manifest())
    .pipe(rename('js-manifest.json'))
    .pipe(gulp.dest('./release/rev'));
})
//gulp3
//('rev',['css','js','image'])这是guLp3的依赖关系 return
//gulp4
//gulp.series：按照顺序执行
//gulp.parallel：可以并行计算
gulp.task('rev',gulp.parallel('css','js','image',function(){
     gulp.src('./release/rev/*.json')
    .pipe(revCollector())
    .pipe(gulp.dest('./release'));
}));

gulp.task('other',function(){
    gulp.src(['./api/*','./public/fonts/*','./public/libs/*'],{base:'./'})
    .pipe(gulp.dest('./release'));
})
//只输入gulp 时默认执行任务
gulp.task('default',gulp.parallel('rev','other'));
