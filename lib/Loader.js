const generateUUID = require('./UUIDGenerator')

const Loader = function (options = {}) {
  this.workers = {}
  this.active = false
  this.emitActivation = options.onActivation || function () {}
  this.emitTermination = options.onTermination || function () {}
}

const loader = Loader.prototype

loader.onActivation = function (callback) {
  this.emitActivation = callback
}

loader.onTermination = function (callback) {
  this.emitTermination = callback
}

loader._workerCount = function () {
  return Object.keys(this.workers).length
}

loader._checkState = function () {
  const workerCount = this._workerCount()
  if (workerCount === 0 && this.active === true) {
    this.active = false
    this.emitTermination()
  }

  if (workerCount > 0 && this.active === false) {
    this.active = true
    this.emitActivation()
  }
}

loader.work = function () {
  const uuid = generateUUID()
  this.workers[uuid] = true
  this._checkState()
  return uuid
}

loader.terminate = function (uuid) {
  if (!uuid) {
    throw new Error('UUID should be passed')
  }
  delete this.workers[uuid]
  this._checkState()
}

loader.reset = function () {
  this.workers = {}
  this._checkState()
}

module.exports = Loader
