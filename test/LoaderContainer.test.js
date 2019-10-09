const chai = require('chai')

const expect = chai.expect

const LoaderContainer = require('../lib/LoaderContainer')
const Loader = require('../lib/Loader')

describe('Loader container tests', () => {
  let loaderContainer
  beforeEach(() => {
    loaderContainer = new LoaderContainer()
  })

  it('should have no loaders on creation', () => {
    expect(loaderContainer.loaders).to.be.empty
  })
  it('should register a new loader', () => {
    const loader = loaderContainer.registerLoader('asd', {})
    expect(loader).to.be.instanceOf(Loader)
  })
  it('should remove a loader', () => {
    loaderContainer.registerLoader('asd', {})
    loaderContainer.removeLoader('asd')
    expect(loaderContainer.loaders).to.be.empty
  })
  it('should return a loader', () => {
    const registeredLoader = loaderContainer.registerLoader('asd', {})
    const loader = loaderContainer.getLoader('asd')
    expect(loader).to.be.equal(registeredLoader)
  })
  it('should throw an error when a non-existent loader is requested', () => {
    expect(() => loaderContainer.getLoader('asd')).to.throw()
  })
  it('should throw an error when a non-existent loader is removed', () => {
    expect(() => loaderContainer.removeLoader('asd')).to.throw()
  })
  it('should throw an error when a loader with the same name is registered', () => {
    loaderContainer.registerLoader('asd', {})
    expect(() => loaderContainer.registerLoader('asd', {})).to.throw()
  })
})
