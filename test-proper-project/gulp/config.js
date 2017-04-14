module.exports = {

    js: {
        src: [],
        dest: './src/markup'
    },

    // LESS config
    less: {
        src: './src/styles/custom.less',
        dest: './src/markup/styles'
    },

    // Icons config
    icons: {
        src: './src/images/icons/*',
        dest: './src/styles/common',
        template: './gulp/icons-template',
        concat: 'icons.less'
    },

    // Browser Sync config
    bsync: {
        base: './',
        start: './src/markup/'
    },

    // Watch config
    watch: {
        less: 'src/styles/**/*.less',
        html: 'src/**/*.html',
        ts:   'src/**/*.ts',
        icons: 'src/images/icons/*',
        mocks: 'src/**/*.js'
    },

    copyNg: {
        src: 'src/markup/js/*',
        dest: ''
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
            'webpack-stream': 'plugins.webpackStream'
        }
    }
};