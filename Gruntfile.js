module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsonlint: {
      sample: {
        src: ['data/featuresets.json','data/tools/*.json']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-jsonlint');

  // Default task(s).
  grunt.registerTask('default', ['jsonlint']);

};
