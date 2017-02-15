module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cacheBust: {
    taskName: {
        options: {
            assets: ['css/*.css']
        },
        src: ['index.html']
    }
}
  });

  // Load the plugin that provides the "grunt-cache-bust" task.
  grunt.loadNpmTasks('grunt-cache-bust');

  // Default task(s).
  grunt.registerTask('default', ['cacheBust']);

};