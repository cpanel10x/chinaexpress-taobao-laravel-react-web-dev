const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .sass("resources/sass/frontend/app.scss", "public/css")
  .sass("resources/sass/backend/app.scss", "css/backend.css")
  .js("resources/js/frontend/frontend.js", "js/frontend.js")
  .js(
    [
      "resources/js/backend/before.js",
      "resources/js/backend/app.js",
      "resources/js/backend/after.js",
    ],
    "js/backend.js"
  )
  .extract(["jquery", "bootstrap", "popper.js", "sweetalert2"])
  .sourceMaps();

if (mix.inProduction()) {
  mix.options({
    // Optimize JS minification process
    terser: {
      cache: true,
      parallel: true,
      sourceMap: true,
    },
  }).version();
} else {
  // Uses inline source-maps on development
  mix.webpackConfig({
    devtool: "inline-source-map",
  });
}
