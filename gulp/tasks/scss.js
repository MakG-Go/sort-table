import dartSass from 'sass'; // Компилятор SCSS
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие CSS
// import webpcss from 'gulp-webpcss'; // Ввод Web изображений
import autoPrefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

// import * as sass from 'sass'

const sass = gulpSass(dartSass);

// export const scss = () => {
//     return app.gulp.src(app.path.src.scss, { sourcemaps: true })
//         .pipe(app.plugins.plumber(
//             app.plugins.notify.onError({
//                 title: "SCSS",
//                 message: "Error: <%= error.message %>"
//             })
//         ))
//         .pipe(app.plugins.replace(/@img\//g, '../img/'))
//         .pipe(sass({
//             outputStyle: 'expanded'
//         }))
//         .pipe(groupCssMediaQueries())
//         .pipe(webpcss({
//             webpClass: ".webp",
//             noWebpClass: ".no-webp",
//         }))
//         .pipe(autoPrefixer({
//             grid: true,
//             overrideBrowserslist: ['last 8 versions'],
//             browsers: [
//                 'Android >= 4',
//                 'Chrome >= 20',
//                 'Firefox >= 24',
//                 'Explorer >= 11',
//                 'iOS >= 6',
//                 'Opera >= 12',
//                 'Safari >= 6',
//             ],
//             cascade: true
//         }))
//         // Раскоментировать если нужен неминифицированный дубль стилей
//         .pipe(app.gulp.dest(app.path.build.css))
//         .pipe(cleanCss())
//         .pipe(rename({
//             extname: ".min.css"
//         }))
//         .pipe(app.gulp.dest(app.path.build.css))
//         .pipe(app.plugins.browsersync.stream());
// }

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        // .pipe(
        //     app.plugins.if(
        //         app.isBuild,
        //         webpcss({
        //             webpClass: ".webp",
        //             noWebpClass: ".no-webp",
        //         })
        //     )
        // )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoPrefixer({
                    grid: true,
                    overrideBrowserslist: ['last 8 versions'],
                    browsers: [
                        'Android >= 4',
                        'Chrome >= 20',
                        'Firefox >= 24',
                        'Explorer >= 11',
                        'iOS >= 6',
                        'Opera >= 12',
                        'Safari >= 6',
                    ],
                    cascade: true
                })
            )
        )
        // Раскоментировать если нужен неминифицированный дубль стилей
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )

        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}