#!/usr/bin/env node
var args = require('minimist')(process.argv.splice(2), {
  alias: {n: 'name'}
})
var relativeDate = require('relative-date')
var fs = require('fs')
var path = require('path')
var prompt = require('cli-prompt')
var randomBytes = require('crypto').randomBytes

var autod = require('auto-daemon')
var opts = {
  rpcfile: path.join(__dirname, 'server.js'),
  sockfile: path.join(__dirname, 'datmon.sock'),
  methods: [ 'start', 'stop', 'list', 'link', 'close' ]
}

var cmd = args._[0]

autod(opts, function (err, r, c) {
  if (err) return onerror(err)
  var id
  if (cmd === 'list' || cmd === 'ls') {
    r.list(function (err, dats) {
      if (err) return onerror(err)
      if (dats.length === 0) console.log('No dats shared. Share a new dat with: \n\n   datmon link <folder> \n')
      for (var i = 0; i < dats.length; i++) {
        console.log(prettifyDat(dats[i]))
      }
      c.destroy()
    })
  } else if (cmd === 'link') {
    var location = args._[1]
    id = args.name || args.n || randomBytes(4).toString('hex')
    r.link(id, location, function (err, data) {
      if (err) return onerror(err)
      console.log(prettifyDat(data))
      c.destroy()
    })
  } else if (cmd === 'close') {
    id = args._[1]
    if (!id) {
      r.list(function (err, dats) {
        if (err) return onerror(err)
        if (dats.length === 0) {
          console.log('No dats running.')
          r.close()
          c.destroy()
          process.exit(0)
        }
        prompt('This will stop sharing ' + dats.length + (dats.length > 1 ? ' dats' : ' dat') + '. Are you sure? [y/n] ', function (res) {
          if (res === 'y' || res === 'yes') r.close()
          else c.destroy()
        })
      })
    } else {
      r.stop(id, function (err, data) {
        if (err) return onerror(err)
        c.destroy()
      })
    }
  } else {
    usage()
  }
})

function onerror (err) {
  console.trace(err)
  process.exit(1)
}

function usage () {
  fs.createReadStream(path.join(__dirname, 'usage.txt')).pipe(process.stdout)
  process.exit(1)
}

function prettifyDat (dat) {
  var msg = ''
  msg += dat.key + '\t'
  msg += dat.value.swarm + '\t'
  msg += relativeDate(dat.value.date) + '\t'
  msg += 'dat://' + dat.value.link
  return msg
}
