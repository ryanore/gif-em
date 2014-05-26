module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var projectConfig = {
        src: 'public',
        build: 'public-built'
    };
 
	grunt.initConfig({
		conf: projectConfig,
		
		compass: {
			dist: {
				options: {
					sassDir: '<%= conf.src %>/styles/sass',
					cssDir: '<%= conf.src %>/styles'
				}
			}
		},
		copy: {
			build: {
				cwd: '<%= conf.src %>',
				src: [ '**', '!**/*.scss', ],
				dest: '<%= conf.build %>',
				expand: true
			},
		},
		
		clean: {
			build: {
				src: [ '<%= conf.build %>' ]
			},
			cleanUp: {
				src: [ 
				'<%= conf.build %>/styles/*', '!<%= conf.build %>/styles/main.css',
				'<%= conf.build %>/scripts/*', '!<%= conf.build %>/scripts/main.js'
				]
			}
		},
		
		requirejs: {
		  compile: {
		    options: {
		      baseUrl: "<%= conf.src %>/scripts",
		      mainConfigFile: "<%= conf.src %>/scripts/appConfig.js",
		      out: "<%= conf.build %>/scripts/main.js",
		      name: "main",
			  include: ['app'],
			  optimize: "uglify2",
		    }
		  }
		},
		
		watch: {
			css: {
				files: '<%= conf.src %>/styles/sass/**/*.scss',
				tasks: ['compass']
			}
		}
	});


	grunt.registerTask(
	  'default', 
	  'By default',
	  [ 'watch' ]
	);
	
	grunt.registerTask(
	  'build', 
	  'Compiles all of the assets and copies the files to the build directory.', 
	  [ 'clean', 'copy', 'requirejs', 'clean:cleanUp' ]
	);
};