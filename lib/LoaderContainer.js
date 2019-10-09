const Loader = require('./Loader')

let LoaderContainer = function () {
  this.loaders = {}
}

let loaderContainer = LoaderContainer.prototype

loaderContainer.registerLoader = function (loaderName, options) {
  if (this.loaders[loaderName]) {
    throw new Error('loader already exists')
  }
  this.loaders[loaderName] = new Loader(options)
  return this.loaders[loaderName]
}

loaderContainer.getLoader = function (loaderName) {
  const loader = this.loaders[loaderName]
  if (!loader) {
    throw new Error('No such loader')
  }
  return loader
}

loaderContainer.removeLoader = function (loaderName) {
  const loader = this.loaders[loaderName]
  if (!loader) {
    throw new Error('No such loader')
  }
  delete this.loaders[loaderName]
}

module.exports = LoaderContainer

////
// valahol létre kell hozni globáliasn a loader containert
// kell lennie register loader get loader metódusoknak
// nyilván kell tartani a loadereket valami id alapján
//
