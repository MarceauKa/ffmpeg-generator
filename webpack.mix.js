let mix = require('laravel-mix');

mix
    .postCss('src/css/app.css', 'dist/', [
        require('tailwindcss'),
    ])
    .js('src/js/app.js', 'dist/')
