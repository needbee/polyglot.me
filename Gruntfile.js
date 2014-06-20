module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jsonlint: {
      sample: {
        src: ['data/featuresets.json','data/tools/*.json']
      }
    },

    watch: {
      json: {
        files: ['data/**/*.json'],
        tasks: ['jsonlint']
      }
    }

  });

  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jsonlint','watch']);

};
