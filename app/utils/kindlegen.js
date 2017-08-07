const spawn = require('child_process').spawn;
const path = require('path');
const temp = require('temp');
const fs = require('fs');



module.exports = function(input, callback){
  temp.track();
  return temp.mkdir('node-kindlegen', function(error, tempDir){
    var inputPath, outputPath;
    if (error) {
      return callback(error);
    }
    inputPath = path.join(tempDir, 'input.html');
    outputPath = path.join(tempDir, 'output.mobi');
    return fs.writeFile(inputPath, input, function(error, written, string){
      var kindlegen;
      if (error) {
        return callback(error);
      }
      try {
        kindlegen = spawn(path.resolve(appRoot, 'bin/kindlegen'), ['input.html', '-c2', '-verbose', '-o', 'output.mobi'], {
          cwd: tempDir,
          env: {}
        });

      }
      catch(err) {
        console.log("err", err)
      }
      return kindlegen.on('close', function(code){
        if (code !== 0 && code !== 1) {
          return callback(new Error("kindlegen returned error " + code));
        }
        return fs.readFile(outputPath, function(error, mobi){
          if (error) {
            return callback(error);
          }
          return callback(null, mobi);
        });
      });
    });
  });
};
