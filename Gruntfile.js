'use strict';
module.exports = function(grunt){
    grunt.initConfig({
        jshint: {
            files: ['listen/lib/**/*.js','listen/models/**/*.js']
        },
        htmlhint: {
            templates: {
                options: {
                    'attr-lower-case' : true,
                    'attr-value-not-empty' : true,
                    'tag-pair': true,
                    'id-unique' : true
                },
                src: ['public/*.html', 'public/**/*.html']
            }

        },
        watch: {
            files: ['listen/lib/**/*.js','listen/models/**/*.js',
                    'public/*.html', 'public/**/*.html'
            ],
            tasks: ['jshint', 
                    'htmlhint'
            ]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-htmlhint");
    //Uglifyjs 

    grunt.registerTask("default", ['jshint', 'htmlhint']);

}
