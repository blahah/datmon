var Manager = require('dat-manager')
var manager = Manager({start: false})

module.exports = function (server, stream) {
  return {
    start: function (cb) {
      manager = Manager()
      cb()
    },
    list: function (cb) {
      manager.list(cb)
    },
    link: function (id, link, cb) {
      manager.share(id, link, cb)
    },
    stop: function (id, cb) {
      manager.stop(id, cb)
    },
    close: function (cb) {
      manager.close(function () {
        server.close()
        cb()
        stream.destroy()
      })
    }
  }
}
