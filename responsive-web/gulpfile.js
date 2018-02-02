var gulp = require('gulp');
var rev = require('gulp-rev');//给文件添加版本号，算出哈希码，文件修改，重新生成哈希码
var revReplace = require('gulp-rev-replace');//将index中的引用替换
var useref = require('gulp-useref');//通过注释写文件，来指导gulp打包构建
var filter = require('gulp-filter');//过滤器，筛选处理再恢复
var uglify = require('gulp-uglify');//压缩js
var csso = require('gulp-csso');//压缩js

gulp.task('default', function () {
    var jsFilter = filter('**/*.js', {
        restore: true
    });
    var cssFilter = filter('**/*.css', {
        restore: true
    });
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], {
        restore: true
    });

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});