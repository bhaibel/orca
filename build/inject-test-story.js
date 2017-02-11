var fs = require('fs')
var path = require('path')

function InjectTestStory(options) {

}

InjectTestStory.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-html-processing', function(pluginArgs, callback) {
      try {
        var storyData = fs.readFileSync(path.join(__dirname, '/../test-data.html'))
        pluginArgs.html = pluginArgs.html
                          .replace(/\{\{STORY_TITLE\}\}/, 'Test Story Title')
                          .replace(/\{\{STORY_DATA\}\}/, storyData)
        callback(null, pluginArgs)
      } catch (err) {
        callback(err)
      }
    })
  })
}

module.exports = InjectTestStory