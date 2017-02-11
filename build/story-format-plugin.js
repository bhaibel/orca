var pkg = require('./../package.json')

function StoryFormatPlugin(options) {

}

StoryFormatPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    sourceFile = compilation.assets['index.html'].source()
    delete compilation.assets['index.html']
    compilation.assets['storyFormat.js'] = {
      source: function() {
        return JSON.stringify({
          description: pkg.description,
          author: pkg.author.replace(/ <.*>/, ''),
          image: 'icon.svg',
          name: pkg.name,
          url: pkg.repository,
          version: pkg.version,
          proofing: false,
          source: sourceFile
        })
      },
      size: function() {
        return null
      }
    }
    callback()
  })
}

module.exports = StoryFormatPlugin