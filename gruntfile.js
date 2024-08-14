// inicia grunt
module.exports = function(grunt){
    // '======================================

    // importacoes tarefas
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    
    // configuracoes
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dev: {
                files: {
                    './build/dev/css/less/index_less.css': './src/less/**/*.less'
                }
            },
            dist: {
                options: {
                    // comprime less
                    compress: true,
                    sourceMap: true
                },
                files: {
                    './build/dist/css/less/index_less.min.css': './src/less/**/*.less'
                }
            }
        },
        sass: {
            dev: {
                files: {
                    './build/dev/css/sass/index_sass.css': './src/sass/**/*.scss'
                }
            },
            dist: {
                options: {
                    // minifica
                    style: 'compressed'
                },
                files: {
                    './build/dist/css/sass/index_sass.min.css': './src/sass/**/*.scss'
                }
            }
        },
        watch: {
            dev: {
                options: {
                    atBegin: true
                },
                files: ['./src/less/**/*.less', './src/sass/**/*.scss', './src/html/**/*.html'],
                tasks: ['concurrent:dev']
            }
        },
        htmlmin: {
            dist: {
                options: {
                    // comprime
                    collapseWhitespace: true,
                    removeComments: true
                },
                files: [{'./prebuild/index.html': './src/html/index.html'}]
            }
        },
        replace: {
            dist: {
                options: {
                    // necessario criar um atributo com '@@' p/ o grunt achar os padroes
                    patterns: [{
                        match: '" href="../../build/dev/css/sass/index_sass.css"',
                        replacement: '" href="./css/sass/index_sass.min.css"'
                    },
                    {
                        match: '" href="../../build/dev/css/less/index_less.css"',
                        replacement: '" href="./css/less/index_less.min.css"'
                    },
                    {
                       match: '" src="../js/index.js"',
                       replacement: '" src="./js/index.min.js"' 
                    },
                    {
                        match: '" src="../../imagens',
                        replacement: '" src="./imagens'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['./prebuild/**/*.html'],
                    dest: './build/dist'
                }]
            }
        },
        uglify: {
            target: {
                options: {
                    sourceMap: true
                },
                files: [{'./build/dist/js/index.min.js': './src/js/index.js'}]
            }
        },
        clean: ['./prebuild'],
        imagemin:{
            dist: {
                options:{
                    optimizationLevel: 3,
                    svgoPlugins: [{removeViewBox: false}]
                },
                files: [{
                    expand: true,
                    src: ['./imagens/**/*.{png,jpg,gif}'],
                    dest: './build/dist'
                }]
            }
        },
        concurrent: {
            dev: {
                // 'sass:dev'
                target: ['less:dev', 'sass:dev']
            },
            dist: {
                // 'sass:dist'
                target: ['less:dist', 'sass:dist', 'replace:dist', 'uglify', 'imagemin:dist']
            }
        }
    });

    // funcoes
    let compilaDist = function(){
        try {
            // tarefas
            grunt.task.run('htmlmin:dist');
            grunt.task.run('concurrent:dist');
            grunt.task.run('clean');
        } catch (error) {
            console.log(error.message);
        }
    }

    // tarefas: padrao
    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('observa', ['watch:dev']);
    // producao
    grunt.registerTask('compila-prod', compilaDist);
    
    // =================================================
};