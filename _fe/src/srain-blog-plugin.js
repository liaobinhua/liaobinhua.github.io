var fs = require('fs');
var path = require('path');
var Cube = require('cube-js');
string = require('sprintf-js');

function plugin(options) {
}

plugin.prototype.apply = function(compiler) {

  var full_hash = '';
  var base_hash = '';

  compiler.plugin("emit", function(compilation, callback) {
    full_hash = compilation.fullHash;
    Cube.forEach(compilation.chunks, function(chunk, key) {
      if (chunk['name'] == 'base') {
        base_hash = chunk['hash'];
      }
    });
    callback();
  });

  compiler.plugin('done', function() {
    // 1. automatically update js / css version
    var file = path.dirname(path.dirname(__dirname)) + '/_data/css_js_version.yml';
    var date = new Date();
    var date_time = Cube.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
    var content = "# Generated by SrainBlogPlugin automatically at %s, do not modify the content.\nbase_hash: '%s'\nfull_hash: '%s'";
    content = string.sprintf(content, date_time, base_hash, full_hash);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Automatically update: "  + file);
  });
};

module.exports = plugin;
