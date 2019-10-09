const chai = require('chai')
const sinon = require('sinon')
const Loader = require('../lib/Loader')

const expect = chai.expect

describe('Loader tests', () => {
  describe('Loader initial state tests', () => {
    let loader
    before(() => {
      loader = new Loader()
    })
    it('should have zero workers by default', () => {
      expect(loader._workerCount()).to.be.equal(0)
    })
    it('should be inactive', () => {
      expect(loader.active).to.be.false
    })
    it('should have a callable emitActivation function', () => {
      expect(loader.emitActivation).to.be.a('function')
    })
    it('should have a callable emitTermination function', () => {
      expect(loader.emitTermination).to.be.a('function')
    })
    it('should set emitActivation from constructor', () => {
      const onActivation = sinon.spy()
      const loader = new Loader({ onActivation })
      loader.work()
      expect(onActivation.called).to.be.true
    })
    it('should set emitTermination from constructor', () => {
      const onTermination = sinon.spy()
      const loader = new Loader({ onTermination })
      const workId = loader.work()
      loader.terminate(workId)
      expect(onTermination.called).to.be.true
    })
  })

  describe('functionality tests', () => {
    let loader
    beforeEach(() => {
      loader = new Loader()
    })
    it('should set emitactivation', () => {
      const onActivationSpy = sinon.spy()
      loader.onActivation(onActivationSpy)
      loader.work()
      expect(onActivationSpy.called).to.be.true
    })
    it('should set emittermination', () => {
      const onTerminationSpy = sinon.spy()
      loader.onTermination(onTerminationSpy)
      const workId = loader.work()
      loader.terminate(workId)
      expect(onTerminationSpy.called).to.be.true
    })
    it('should reset workers', () => {
      loader.work()
      loader.work()
      expect(loader._workerCount()).to.be.equal(2)
      expect(loader.active).to.be.true
      loader.reset()
      expect(loader._workerCount()).to.be.equal(0)
      expect(loader.active).to.be.false
    })
    it('should change state', () => {
      expect(loader.active).to.be.false
      const workId = loader.work()
      expect(loader.active).to.be.true
      loader.terminate(workId)
      expect(loader.active).to.be.false
    })
    it('terminate should throw error without uuid', () => {
      expect(loader.terminate).to.throw()
    })
  })
})
