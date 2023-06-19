// Основной модуль

import gulp from "gulp";

// Импорт путей

import { path } from "./gulp/config/path.js";

// Импорт общих плагинов

import { plugins } from "./gulp/config/plugins.js";


global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

// Импорт задачи

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js"
import { scss } from "./gulp/tasks/scss.js"
import { js } from "./gulp/tasks/js.js"
import { images } from "./gulp/tasks/images.js"
import { ttftoWoff, fontStyle } from "./gulp/tasks/fonts.js"
import { svgSpriter } from "./gulp/tasks/svgicons.js"


// Наблюдатель

function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// Последовательное подключение шрифтов

export { svgSpriter }

const fonts = gulp.series(ttftoWoff, fontStyle);

console.log(fonts)

// Основные задачи

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images))

// Построение сценариев выполнения задач


const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks)
// const getZip = gulp.series(reset, mainTasks, zip)

// // Экспорт сценариев

export { dev }
export { build }
// export { getZip }

// Выполнение сценария

gulp.task('default', dev);