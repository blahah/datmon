var Manager = require('dat-manager')
var manager = Manager()
module.exports = function (server, stream) {
  return {
    remove: function (id, cb) { manager.delete(id, cb) },
    start: function (id, cb) { manager.start(id, cb) },
    list: function (cb) { manager.list(cb) },
    link: function (location, cb) { manager.share(location, cb) },
    stop: function (id, cb) { manager.stop(id, cb) },
    close: function (cb) {
      manager.close(function () {
        server.close()
        cb()
        stream.destroy()
      })
    }
  }
}
