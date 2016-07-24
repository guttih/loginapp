module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
	  jsPublicDir: 'public/js/',
	  jsModels: 'models/',
		jsRoutes: 'routes/',
		jsUtils: 'utils/',
    pkg: grunt.file.readJSON('package.json'),
  jshint: {
    all: ['Gruntfile.js', 
		'./*.js', 
		'<%=jsPublicDir%>*.js',
		'<%=jsModels%>*.js',
		'<%=jsRoutes%>*.js',
		'<%=jsUtils%>*.js',
		'!<%=jsPublicDir%>bootstrap.js',
		 
		'test/**/*.js'],
		options: {
				curly:  true,
				immed:  true,
				newcap: true,
				noarg:  true,
				sub:    true,
				boss:   true,
				eqnull: true,
				node:   true,
				undef:  true,
				esversion:6,
				globals: {
					_:       false,
					jQuery:  false,
					angular: false,
					moment:  false,
					console: false,
					$:       false,
					io:      false,
					window: false,
					
				}
		}
	},
	concurrent: {
        target: {
            tasks: ['watch', 'nodemon'],
            options: {
                logConcurrentOutput: true
            }
        }
},
	nodemon: {
  dev: {
    script: 'app.js'
  }
},
watch: {
				files: ['./*.js',	'<%=jsPublicDir%>*.js', '<%=jsModels%>*.js', 
													'<%=jsRoutes%>*.js', 		'<%=jsUtils%>*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
}
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

grunt.registerTask('default', ['concurrent:target']);

};