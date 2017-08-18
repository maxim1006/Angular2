module.exports = {

    // LESS config
    less: {
        src: './src/assets/custom.less',
        dest: './src/assets'
    },

    // Icons config
    icons: {
        src: './src/assets/themes/base/images/icons/*',
        dest: './src/assets/themes/base/styles/common',
        template: './gulp/icons-template',
        concat: 'icons.less'
    },

    svg: {
        src: './src/assets/themes/base/images/svg-icons/*.svg',
        htmlSrc: 'src/index.html'
    },

    // Browser Sync config
    bsync: {
        base: './',
        start: './src/'
    },

    // Watch config
    watch: {
        less: 'src/**/*.less',
        html: 'src/**/*.html',
        ts:   'src/**/*.ts',
        icons: 'src/assets/themes/base/images/icons/*',
        svg: 'src/assets/themes/base/images/svg-icons/*',
        mocks: 'src/**/*.js'
    },

    clean: {
        src: ['./dist', './src/*.js*']
    },

    copyProd: {
        src: [
            'src/index.html',
            'src/*.js',
            'src/mocks/*',
            'src/assets/custom.css',
            'src/assets/themes/base/fonts/**', 'src/assets/themes/base/images/other-images/**'
        ],
        dest: './dist'
    },

    // Plugins config
    plugins: {
        scope: ['dependencies', 'devDependencies', 'peerDependencies'],
        rename: {
            'gulp-sourcemaps': 'sourcemaps',
            'gulp-autoprefixer': 'autoprefixer',
            'gulp-plumber': 'plumber',
            'gulp-less': 'less',
            'gulp-soynode': 'soy',
            'gulp-image-data-uri': 'uri',
            'gulp-concat': 'concat',
            'gulp-ignore': 'ignore',
            'webpack-stream': 'plugins.webpackStream',
            'gulp-clean': 'clean',
            'gulp-svgstore': 'svgstore',
            'gulp-svgmin': 'svgmin',
            'gulp-inject': 'inject',
            'gulp-rename': 'rename',
        }
    }
};