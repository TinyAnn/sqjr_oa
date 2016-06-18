//全局配置
var require = {
    paths: {
        'zepto': '/src/static/js/zepto.min',
        'mui': '../js/mui',
        'fastclick': '../js/fastclick',
        'publicjs': '../js/public'
    },
    shim: {
        'zepto': {
            exports: '$'
        }
    }
}