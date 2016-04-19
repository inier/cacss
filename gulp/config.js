/**
 * Created by mosa on 2016/3/11.
 */
/* gulp命令会由gulpfile.js运行 */

// pngquant:深度压缩png图片的imagemin插件
var pngquant = require('imagemin-pngquant');
var version = '/v0.1.0',  //发布版本号
    src = 'src',   //源文件夹
    dest = 'dest', //目标文件夹
    beta = dest + '/beta',  //开发环境
    release = dest + '/rev' + version,  //发布环境
    srcAssets = src + '/assets',  //源资源文件
    betaAssets = beta + '/assets',  //开发环境资源文件
    releaseAssets = release + '/assets';  //发布环境资源文件

module.exports = {
    product: {
        src: src,
        dest: dest
    },
    browserSync: {
        beta: {
            server: {
                //指定服务器启动根目录
                baseDir: [beta]
            },
            //覆盖主机检测，如果你知道正确的IP使用
            host: "10.17.12.41",
            //port: 9091,
            //更改默认端口weinre
            ui: {
                port: 3001,
                weinre: {
                    port: 3030
                }
            },
            files: [beta + "/**/*.*"],
            //显示了我对过程的其他信息
            logLevel: "debug"
        },
        release: {
            server: {
                //指定服务器启动根目录
                baseDir: [release]
            },
            //port: 9092,
            files: [
                beta + "/**/*.*"
            ]
        }
    },
    del: {
        src: [dest + '/**/*', '!' + betaAssets + '/**/*', '!' + releaseAssets + '/**/*']
    },
    watch: {
        html: src + '/demo/**/*.html',
        css: src + '/**/*.css',
        scss: src + '/**/!(_)*.scss',
        scripts: src + '/js/**/*.js',
        fonts: srcAssets + '/fonts/**/*',
        images: srcAssets + '/img/**/*',
        sprites: srcAssets + '/img/**/*.png',
        svg: srcAssets + '/img/vectors/**/*.svg'
    },
    html: {
        src: [src + "/demo/**/*.html", "!demo/!(_)*"],
        dest: beta + "/demo"
    },
    styles: { //所有scss
        csssrc: [src + '/**/*.css', src + '/**/*.map'], //所有css的源路径
        src: src + '/**/!(_)*.scss',  //所有scss的源路径
        dest: beta + '/css',   //所有css的目标路径
        sourceMapPath: src + "/scss",
        options: {
            noCache: true,
            compass: false,
            bundleExec: true,
            sourcemap: true,
            precss: {},
            mqpacker: {}
        },
        autoprefixer: {
            browsers: [
                'last 2 versions',
                'safari 5',
                'ie 8',
                'ie 9',
                'opera 12.1',
                'ios 6',
                'android 4'
            ],
            cascade: true
        },
        mode: {     //编译scss过程需要的配置，可以为空
            nested: {style: 'nested'}, //nested: 嵌套缩进的css代码，它是默认值；
            expanded: {style: 'expanded', sourcemap: true}, //expanded: 没有缩进的、扩展的css代码；
            compact: {style: 'compact'},//compact: 简洁格式的css代码；
            compressed: {style: 'compressed'}//compressed：压缩后的css代码。
        },
        csslint: {
            src: src + '/**/*.css'
        },
        caCss: {
            src: src + "/scss/caec-mobile.scss",
            dest: beta + "/css"
            //"dest": "D:/workspace/CAEC-APP/CAECApp/www/shared/css"
        },
        demoCss: {
            src: src + "/demo/demo.scss",
            dest: beta + "/css"
            //dest: "D:/workspace/CAEC-APP/CAECApp/www/CAEC-demo"
        }
    },
    scripts: {
        src: src + "/js/**/*.js",
        dest: beta + "/js",
        browserify: {
            // Enable source maps
            debug: true,
            // Additional file extensions to make optional
            extensions: ['.coffee', '.hbs'],
            // A separate bundle will be generated for each
            // bundle config in the list below
            bundleConfigs: [{
                entries: './' + src + '/js/application.js',
                dest: beta + '/js',
                outputName: 'application.js'
            }, {
                entries: './' + src + '/js/head.js',
                dest: beta + '/js',
                outputName: 'head.js'
            }]
        },
        jshint: {
            src: src + '/js/**/*.js'
        }
    },
    images: {
        src: srcAssets + "/img/**/*.*",
        dest: betaAssets + "/img",
        resize: {
            src: srcAssets + "/img/**/*.+(jpeg|jpg|png|tiff|webp)",
            dest: betaAssets + "/img/resize"
        },
        sprites: {
            src: srcAssets + '/img/sprites/**/!(_)*.png',
            dest: {
                css: src + '/scss/demo',
                image: betaAssets + '/img/sprites'
            },
            options: {
                imgName: '_sprites.png',
                cssName: 'sprites.scss',
                padding: 2,
                cssFormat: 'css',
                cssOpts: {
                    cssClass: function (item) {
                        // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
                        if (item.name.indexOf('-hover') !== -1) {
                            return '.icon-' + item.name.replace('-hover', ':hover');
                            // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                        } else {
                            return '.icon-' + item.name;
                        }
                    }
                }
            }
        },
        webp: {
            src: releaseAssets + '/img/**/*.{jpg,jpeg,png}',
            dest: releaseAssets + '/img/webp',
            options: {}
        },
        base64: {
            src: beta + '/css/**/*.css',
            dest: beta + '/css',
            options: {
                baseDir: release,
                extensions: ['png'],
                maxImageSize: 20 * 1024, // bytes
                debug: false
            }
        }
    },
    fonts: {
        beta: {
            src: srcAssets + '/fonts/**/*',
            dest: betaAssets + '/fonts'
        },
        release: {
            src: betaAssets + '/fonts/**/*',
            dest: releaseAssets + '/fonts'
        }
    },
    gzip: {
        src: release + '/**/*.{html,xml,json,css,js}',
        dest: release,
        options: {}
    },
    optimize: {
        css: {
            src: beta + '/css/**/*.css',
            dest: release + '/css',
            options: {
                keepSpecialComments: 0
            }
        },
        js: {
            src: [beta + '/js/**/*.js', '!' + beta + '/js/**/!(.min)*.js'],
            dest: release + '/js/',
            options: {}
        },
        images: {
            src: betaAssets + '/img/**/*.{jpg,jpeg,png,gif,ico}',
            dest: releaseAssets + '/img/',
            options: {
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{removeViewBox: false}] //不要移除svg的viewbox属性
                //use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            }
        },
        html: {
            src: beta + '/**/*.html',
            dest: release,
            options: {
                collapseWhitespace: true
            }
        }
    },
    revision: {
        src: {
            assets: [
                release + '/css/**/*.css',
                release + '/js/**/*.js',
                releaseAssets + '/img/**/*'
            ],
            base: release
        },
        dest: {
            assets: release,
            manifest: {
                name: 'manifest.json',
                path: releaseAssets
            }
        }
    },
    collect: {
        src: [
            releaseAssets + '/manifest.json',
            release + '/**/*.{html,xml,txt,json,css,js}',
            '!' + release + '/feed.xml'
        ],
        dest: release
    }
};