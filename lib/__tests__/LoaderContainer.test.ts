import { LoaderContainer } from '../LoaderContainer'
import { Loader } from '../Loader'

describe('Loader container tests', () => {
  let loaderContainer: LoaderContainer
  beforeEach(() => {
    loaderContainer = new LoaderContainer()
  })

  it('should have no loaders on creation', () => {
    expect(loaderContainer.getLoaders().length).toEqual(0)
  })
  it('should register a new loader', () => {
    const loader:Loader = loaderContainer.registerLoader('asd', {})
    expect(loader).toBeInstanceOf(Loader)
  })
  it('should remove a loader', () => {
    loaderContainer.registerLoader('asd', {})
    loaderContainer.removeLoader('asd')
    expect(loaderContainer.getLoaders().length).toEqual(0)
  })
  it('should return a loader', () => {
    const registeredLoader = loaderContainer.registerLoader('asd', {})
    const loader = loaderContainer.getLoader('asd')
    expect(loader).toEqual(registeredLoader)
  })
  it('should throw an error when a non-existent loader is requested', () => {
    expect(() => loaderContainer.getLoader('asd')).toThrowError('No such loader')
  })
  it('should throw an error when a non-existent loader is removed', () => {
    expect(() => loaderContainer.removeLoader('asd')).toThrowError('No such loader')
  })
  it('should throw an error when a loader with the same name is registered', () => {
    loaderContainer.registerLoader('asd', {})
    expect(() => loaderContainer.registerLoader('asd', {})).toThrowError('loader already exists')
  })
})
