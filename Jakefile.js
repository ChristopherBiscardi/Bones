var spawn = require('child_process').spawn;

desc('This is the default task.');
task('default', [], function () {
  console.log('bones:templates\nbones:build\nbones:minify');
});

namespace('bones', function () {
  desc('Render Regular Webpage Templates');// jake avant:templates
  task('templates', [], function () {
    console.log('compiling handlebars templates');
    var templates    = spawn('handlebars', ['-f', 'public/templates/templ.js', 'public/templates/handlebars/']);
    templates.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    templates.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    templates.on('exit', function (code) {
      console.log('child process exited with code ' + code);
    });

  });

  desc('build project');
  task('build', ['avant:templates'], function () {
    console.log('doing build task');
/*    var building = spawn('sbs/public/javascripts/r.js', ['-o', 'sbs/public/javascripts/app.build.js']);
    building.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    building.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    building.on('exit', function (code) {
      console.log('child process exited with code ' + code);
    });*/
  });

  desc('minify built project');
  task('minify', ['avant:build'], function () {
    console.log('doing minify task');
    console.log(arguments);
  });
});