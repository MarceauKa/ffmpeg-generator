let mix = require('laravel-mix');

mix
    .postCss('src/css/app.css', 'dist/', [
        require('tailwindcss'),
    ])
    .js('src/app.js', 'dist/')
