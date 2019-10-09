const chai = require('chai')
const Loader = require('../lib/Loader')

const expect = chai.expect

describe('Loader tests', () => {
	it('should create an instance of Loader with deafult state', () => {
		let loader = new Loader()
		expect(loader._workerCount()).to.be.equal(0)
	})
})
