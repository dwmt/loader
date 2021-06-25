import { Loader } from '../Loader'

describe('Loader tests', () => {
  describe('Loader initial state tests', () => {
    let loader: Loader
    beforeEach(() => {
      loader = new Loader()
    })
    it('should have zero workers by default', () => {
      expect(loader._workerCount()).toEqual(0)
    })
    it('should set the callback for activation emitter', () => {
			expect(typeof loader.emitActivation).toEqual('undefined')
			loader.onActivation(() => { let a })
      expect(typeof loader.emitActivation).toEqual('function')
    })
    it('should set the callback for termination emitter', () => {
      expect(typeof loader.emitTermination).toEqual('undefined')
			loader.onTermination(() => { let a })
      expect(typeof loader.emitTermination).toEqual('function')
    })
    it('should be inactive', () => {
      expect(loader.active).toBeFalsy()
    })
    it('should set emitActivation from constructor', () => {
      const onActivation = jest.fn()
      const loader = new Loader({
				onActivation
			})
      loader.work()
      expect(onActivation.mock.calls.length).toBe(1)
    })
    it('should set emitTermination from constructor', () => {
      const onTermination = jest.fn()
      const loader = new Loader({ onTermination })
      const workId = loader.work()
      loader.terminate(workId)
      expect(onTermination.mock.calls.length).toBe(1)
		})
		it('should reset workers', () => {
      loader.work()
      loader.work()
      expect(loader._workerCount()).toEqual(2)
      expect(loader.active).toBeTruthy()
      loader.reset()
      expect(loader._workerCount()).toEqual(0)
      expect(loader.active).toBeFalsy()
    })
    it('should change state', () => {
      expect(loader.active).toBeFalsy()
      const workId = loader.work()
      expect(loader.active).toBeTruthy()
      loader.terminate(workId)
      expect(loader.active).toBeFalsy()
    })
    it('terminate should throw error without uuid', () => {
      expect(loader.terminate).toThrowError('UUID should be passed')
    })
  })
})
